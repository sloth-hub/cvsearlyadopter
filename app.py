from flask import Flask, send_from_directory
from flask_cors import CORS
# from backend import scrapper

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def say_hello():
    return {"result": "hello world"}