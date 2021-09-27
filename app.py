from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
import requests

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbrecommend


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/base/codes', methods=['GET'])
def get_base_codes():
    codes = list(db.codes.find({}).distinct("group"))
    return jsonify(codes)

@app.route('/codes', methods=['GET'])
def get_codes():
    group = request.args.get('group')
    codes = list(db.codes.find({'group': group}, {'_id': False}))
    return jsonify(codes)

@app.route('/results', methods=['POST'])
def view_meal():
    info = request.json
    meal = list(db.meals.find(info, {'_id':False}))
    db.result.insert_one(info)
    return jsonify(meal)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)