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

def put_database():
    ref = db.reference() # 기본 위치 지정
    gs_prods = get_gs()
    ref.update({"gs" : gs_prods})

put_database()