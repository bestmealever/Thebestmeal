# -*- coding: utf-8 -*-
from pymongo import MongoClient
import jwt
import datetime
import hashlib
from flask import Flask, render_template, jsonify, request, url_for
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
from flask_cors import CORS
import boto3
import random
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'bestmealever'

# 배포서버
# client = MongoClient('mongodb://test:test@15.164.212.139:27017')

# 로컬서버
client = MongoClient("mongodb://localhost:27017/")
db = client.bestmealever

class WhatYouWantForMeal:
    def __init__(self):
        self.for_reverse = ['korean', 'chinese', 'japanese', 'western', 'snack', 'bread', 'supper', 'fastfood', 'salad']
        self.retry_num = 0
        self.recommend = ''
        self.address = ''
        self.want = list()
        self.feel = list()
        self.chosen = list()
        self.choice_num = list()

    def want_receive(self, want_give):
        self.want = want_give

    def yesterday(self, yesterday_give):
        yesterday_give_receive_reverse = []
        for i in self.for_reverse:
            if i not in yesterday_give:
                yesterday_give_receive_reverse.append(i)
            else:
                pass
        self.want = yesterday_give_receive_reverse

    def yesterday_no(self):
        self.want = ['korean', 'chinese', 'japanese', 'western', 'snack', 'bread', 'supper', 'fastfood', 'salad']

    def feeling(self, feel):
        self.chosen = []
        self.feel = feel

        for i in self.want:
            for j in self.feel:
                self.chosen.append(
                    db.food_info.find_one({'category': i, 'emotion': j}, {'_id': False, 'name': True, 'url': True}))

        if self.chosen == [None]:
            self.chosen = [{'name': '추천 할게 없어요 ㅠㅠ',
                            'url': 'https://blog.kakaocdn.net/dn/cCSIPC/btqKdFDO51a/vuyWbKS5CqBtWnDgyl3pv0/img.jpg'}]
        else:
            self.choice_num = [i for i in range(len(self.chosen))]
            random.shuffle(self.choice_num)

    def retry(self):
        self.retry_num += 1


what_you_want = WhatYouWantForMeal()

@app.route('/')
def home():
    global what_you_want
    token_receive = request.cookies.get('mytoken')

    if token_receive == None:
        what_you_want = WhatYouWantForMeal()
        return render_template('index.html')

    else:
        print(token_receive)
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user_info.find_one({"id": payload["id"]})
        what_you_want = WhatYouWantForMeal()
        return render_template('index-logged-in.html', user_info=user_info)


@app.route('/recommend')
def recommend():
    return render_template('recommend.html')

@app.route('/kakao')
def kakao():
    return render_template('kakao.html')

#회원가입 및 로그인

@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.user_info.find_one({'id': username_receive, 'pw': pw_hash})
    print(result)

    if result is not None:
        payload = {
            'id': username_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token, 'id': result['id']})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.user_info.find_one({"id": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})



@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

    user_info_count = db.user_info.count()

    if user_info_count == 0:
        max_value = 1
    else:
        max_value = db.user_info.find_one(sort=[("idx", -1)])['idx'] + 1

    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

#idx 와 created at 해결 필요.
    doc = {
        "idx": max_value,
        "id": username_receive,
        "pw": password_hash,
        "profile": "",
        "profile_pic": "",
        "created_at": created_at,
        "updated_at": ""
    }

    db.user_info.insert_one(doc)

    return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

#추천 알고리즘

@app.route('/want', methods=['POST'])
def want():
    want_give_receive = request.form.getlist('want_give[]')
    if want_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        what_you_want.want_receive(want_give_receive)
        print(what_you_want.want)
        return jsonify({'result': 'success'})


@app.route('/want_no', methods=['POST'])
def want_no():
    return {'msg': '먹고 싶은게 없다니...'}


@app.route('/yesterday', methods=['POST'])
def yesterday():
    yesterday_give_receive = request.form.getlist('yesterday_give[]')
    if yesterday_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        what_you_want.yesterday(yesterday_give_receive)
        print(what_you_want.want)
        return jsonify({'result': 'success'})


@app.route('/yesterday_no', methods=['POST'])
def yesterday_no():
    what_you_want.yesterday_no()
    print(what_you_want.want)
    return {'msg': '어제 먹은게 기억이 안나요??'}


@app.route('/feeling', methods=['POST'])
def feeling():
    feeling_give_receive = request.form.getlist('feeling_give[]')
    if feeling_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        what_you_want.feeling(feeling_give_receive)
        if len(what_you_want.chosen) == 1:
            return jsonify({'result': 'success', 'msg1': '', 'chosen': what_you_want.chosen[0], 'msg2': ''})
        else:
            num = what_you_want.retry_num
            return jsonify(
                {'result': 'success', 'msg1': '오늘은,', 'chosen': what_you_want.chosen[what_you_want.choice_num[num]],
                 'msg2': '어때요?!'})


@app.route('/feeling_no', methods=['POST'])
def feeling_no():
    return {'msg': '하나 이상 선택해줘야 추천을 하지...!!!'}


@app.route('/retry', methods=['POST'])
def retry():
    what_you_want.retry()
    num = what_you_want.retry_num
    if what_you_want.retry_num >= len(what_you_want.choice_num):
        return jsonify({'result': 'success', 'msg1': '', 'chosen': {'name': '더 이상 추천 할게 없어요 ㅠㅠ',
                                                                    'url': 'https://blog.kakaocdn.net/dn/cCSIPC/btqKdFDO51a/vuyWbKS5CqBtWnDgyl3pv0/img.jpg'},
                        'msg2': ''})
    else:
        return jsonify(
            {'result': 'success', 'msg1': '그러면~', 'chosen': what_you_want.chosen[what_you_want.choice_num[num]],
             'msg2': '어때요?!'})


@app.route('/to_kakao', methods=['POST'])
def to_kakao():
    what_you_want.address = request.form['address_give']
    what_you_want.recommend = request.form['recommend_give']
    return render_template('kakao.html')


@app.route('/get_keyword', methods=['POST'])
def get_keyword():
    print('여기까진 ok')
    search = f'{what_you_want.address} {what_you_want.recommend}'
    print(search)
    return {'search': search}

@app.route('/posting')
def posting():
    return render_template('posting.html')

@app.route('/step1', methods=['POST'])
def step1():
    foodname_receive = request.form['foodname_give']
    exists = bool(db.food_info.find_one({'name': foodname_receive}))
    if exists == False :
        global posting_food
        posting_food = foodname_receive
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
        global posting_category
        posting_category = cat_give_receive
        return {"result": "success"}

@app.route('/step3', methods=['POST'])
def step3():
    feel_give_receive = request.form.getlist('food_feel_give[]')
    exists = bool(feel_give_receive)
    if exists == False:
        print('값을 선택해라')
        return jsonify({'result': 'fail', 'msg': '1개 이상 선택해주세요!'})
    else:
        global posting_emotion
        posting_emotion = feel_give_receive
        return {"result": "success"}

@app.route('/fileupload', methods=['POST'])
def file_upload():
    # token_receive = request.cookies.get('mytoken')
    # try:
    #     payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    #     user_id = db.user_info.fine_one({'id': payload['id']})
    file = request.files['file']
    comment = request.form['comment_give']
    s3 = boto3.client('s3',
                      aws_access_key_id="---",
                      aws_secret_access_key="---"
                      )
    s3.put_object(
        ACL="public-read",
        Bucket="---",
        Body=file,
        Key=file.filename,
        ContentType=file.content_type)
    global posting_url
    posting_url = 'https://버킷네임.s3.ap-northeast-2.amazonaws.com/'+file.filename
    doc = {'name': posting_food,
           'category': posting_category,
           'emotion': posting_emotion,
           'url': posting_url}
    db.food_info.insert_one(doc)
    print(doc)
    doc2 = {'name': posting_food,
           'category': posting_category,
           'emotion': posting_emotion,
           'url': posting_url,
           # 'user_id' : user_id,
           'comment' : comment}
    db.posting.insert_one(doc2)
    print(doc2)
    doc2 = db.posting.find_one({'name': posting_food}, {'_id': False})
    return jsonify({'doc2':doc2})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
