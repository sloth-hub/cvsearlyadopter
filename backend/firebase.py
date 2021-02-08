import os
import firebase_admin 
from firebase_admin import credentials
from firebase_admin import db
from scrapper import get_cu, get_gs, get_se

# Firebase database 인증 및 앱 초기화
key = os.path.join(os.path.dirname(__file__), "myKey.json")
cred = credentials.Certificate(key)
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://cvs-early-adopter-default-rtdb.firebaseio.com/"
})

def get_prods():
    gs_prods = get_gs()
    se_prods = get_se()
    cu_prods = get_cu()
    # 스크래핑한 데이터 내림차순 정렬 (오래된 순)
    gs_prods.reverse()
    se_prods.reverse()
    cu_prods.reverse()

    update_database(gs_prods, se_prods, cu_prods)

def update_database(gs_prods, se_prods, cu_prods):
    ref = db.reference() # 데이터베이스 기본 위치
    fb = ref.get()
    # 데이터베이스에 데이터가 없으면
    if not fb:
        ref.update({"gs": gs_prods})
        ref.update({"se": se_prods})
        ref.update({"cu": cu_prods})
    else:
        update_new_prods(gs_prods, "gs")
        update_new_prods(se_prods, "se")
        update_new_prods(cu_prods, "cu")

def update_new_prods(prods, directory):
    ref = db.reference(directory)
    fb_database = ref.get()
    # 중복검사하여 새로운 상품만 추출
    names = {item["name"] for item in fb_database}
    new_prods = [item for item in prods if item["name"] not in names]
    if not new_prods:
        return print("새로운 아이템이 없습니다.")
    else:
        length = len(fb_database) # 데이터베이스의 length 구하기
        for i, v in enumerate(new_prods):
            ref.update({length+i : v})

get_prods()