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

def update_database():
    gs_prods = get_gs()
    gs_prods.reverse() # 스크래핑한 데이터 내림차순 정렬 (오래된 순)
    ref = db.reference() # 데이터베이스 기본 위치
    fb = ref.get()
    # 데이터베이스에 데이터가 없으면
    if not fb:
        ref.update({"gs": gs_prods})
    else:
        ref = db.reference("gs")
        gs_from_fb = ref.get()
        # 중복검사하여 새로운 상품만 추출
        names = {item["name"] for item in gs_from_fb}
        new_prods = [item for item in gs_prods if item["name"] not in names]
        if not new_prods:
            return print("새로운 아이템이 없습니다.")
        else:
            length = len(gs_from_fb) # 데이터베이스의 length 구하기
            for i, v in enumerate(new_prods):
                ref.update({length+i : v})
            

update_database()