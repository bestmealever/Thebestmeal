# -*- coding: utf-8 -*-
import re

from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
import boto3
import random
import os
from datetime import datetime

app = Flask(__name__)

# 배포서버
# client = MongoClient(os.environ.get("MONGO_DB_PATH"))

# 로컬서버
client = MongoClient("mongodb://localhost:27017/")
db = client.team_project

@app.route('/recommend')
def recommend():
    return render_template('recommend.html')

@app.route('/step1', methods=['POST'])
def step1():
    foodname_receive = request.form['foodname_give']
    exists = bool(db.team_project.find_one({'name': foodname_receive}))
    if exists == False :
        global recoFoodName
        recoFoodName = foodname_receive
        print('없으니 등록')
        return jsonify({'result': 'success'})
    else:
        print('있으니 거절')
        return jsonify({'result': 'fail', 'msg': '이미 있는 음식이예요!'})

@app.route('/step2', methods=['POST'])
def step2():
    cat_give_receive = request.form.getlist('food_cat_give[]')
    exists = bool(cat_give_receive)
    if exists == False :
        print('값을 선택해라')
        return jsonify({'result': 'fail', 'msg': '1개 이상 선택해주세요!'})
    else:
        print('성공')
        global recoFoodCate
        recoFoodCate = cat_give_receive
        return {"result": "success"}

@app.route('/step3', methods=['POST'])
def step3():
    feel_give_receive = request.form.getlist('food_feel_give[]')
    exists = bool(feel_give_receive)
    if exists == False:
        print('값을 선택해라')
        return jsonify({'result': 'fail', 'msg': '1개 이상 선택해주세요!'})
    else:
        global recoFoodFeel
        recoFoodFeel = feel_give_receive
        return {"result": "success"}

@app.route('/fileupload', methods=['POST'])
def file_upload():
    file = request.files['file']
    s3 = boto3.client('s3',
                      aws_access_key_id="AKIAZBAKZL3E5QUOL3GH",
                      aws_secret_access_key="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"
                      )
    s3.put_object(
        ACL="public-read",
        Bucket="jproject3",
        Body=file,
        Key=file.filename,
        ContentType=file.content_type)
    global recoFoodUrl
    recoFoodUrl = 'https://jproject3.s3.ap-northeast-2.amazonaws.com/'+file.filename
    doc = {'name': recoFoodName,
           'category': recoFoodCate,
           'emotion': recoFoodFeel,
           'url': recoFoodUrl}
    db.team_project.insert_one(doc)
    return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
