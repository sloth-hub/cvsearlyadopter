from flask import Flask, send_from_directory, redirect, jsonify
from flask_cors import CORS
from backend.scrapper import get_cu, get_gs, get_se

app = Flask(__name__)
CORS(app)

db = {}

@app.route("/hello")
def say_hello():
    return {"result": "hello world"}

@app.route("/scrapper")
def scrapper():
    # fromDb = db.get("cu")
    # if fromDb: 
    #     # db에 cu가 있으면
    #     new_prod = fromDb
    # else: 
    #     new_prod = get_cu() # db가 없으면
    #     db["cu"] = new_prod
    # return jsonify(new_prod)
    return