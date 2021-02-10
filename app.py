import os
from flask import Flask, send_from_directory, redirect, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from backend.scraper import get_gs, get_se, get_cu

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def say_hello():
    return {"result": "hello world"}

@app.route("/scraper")
def get_prods():

    if not firebase_admin._apps:
        # Firebase database 인증 및 앱 초기화
        key = os.path.join(os.path.dirname(__file__), "myKey.json")
        cred = credentials.Certificate(key)
        firebase_admin.initialize_app(cred, {
            "databaseURL": "https://cvs-early-adopter-default-rtdb.firebaseio.com/"
        })

    gs_prods = get_gs()
    se_prods = get_se()
    cu_prods = get_cu()
    # 스크래핑한 데이터 내림차순 정렬 (오래된 순)
    gs_prods.reverse()
    se_prods.reverse()
    cu_prods.reverse()

    result = update_database(gs_prods, se_prods, cu_prods)
    return jsonify(result)


def update_database(gs_prods, se_prods, cu_prods):
    ref = db.reference()  # 데이터베이스 기본 위치
    fb = ref.get()
    # 데이터베이스에 데이터가 없으면
    if not fb:
        ref.update({"gs": gs_prods})
        ref.update({"se": se_prods})
        ref.update({"cu": cu_prods})
    else:
        gs_is_upload = update_new_prods(gs_prods, "gs")
        se_is_upload = update_new_prods(se_prods, "se")
        cu_is_upload = update_new_prods(cu_prods, "cu")
        return gs_is_upload, se_is_upload, cu_is_upload


def update_new_prods(prods, directory):
    ref = db.reference(directory)
    fb_database = ref.get()
    # 중복검사하여 새로운 상품만 추출
    names = {item["name"] for item in fb_database}
    new_prods = [item for item in prods if item["name"] not in names]
    if not new_prods:
        return f"{directory}의 신제품이 없습니다."
    else:
        length = len(fb_database)  # 데이터베이스의 length 구하기
        for i, v in enumerate(new_prods):
            ref.update({length+i: v})
        return f"{directory}의 신제품 업로드가 완료되었습니다."