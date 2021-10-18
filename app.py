# -*- coding: utf-8 -*-
from pymongo import MongoClient
import jwt
import datetime
import hashlib
from flask import Flask, render_template, jsonify, request, url_for
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
from flask_cors import CORS
import random
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'bestmealever'

# DB 서버
client = MongoClient('mongodb://test:test@15.164.212.139:27017')

# 로컬서버
# client = MongoClient('localhost', 27017)
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


# HTML을 주는 부분
@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    global what_you_want
    what_you_want = WhatYouWantForMeal()
    print('객체 새로 만듬')
    return render_template('index.html')

@app.route('/recommend')
def recommend():
    return render_template('recommend.html')

@app.route('/kakao')
def kakao():
    return render_template('kakao.html')

@app.route('/mypage')
def mypage():
    return render_template('mypage.html')

#회원가입 및 로그인

@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.user_info.find_one({'id': username_receive, 'pw': pw_hash})

    if result is not None:
        payload = {
            'id': username_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
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


##내 프로필 내에서만 수정버튼이 보일 수 있게 만든 api
@app.route('/mypage/<username>')
def user(username):
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        status = (username == payload["id"])

        user_info = db.user_info.find_one({"username": username}, {'_id': False})
        return render_template('mypage.html', user_info=user_info, status=status)
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for('index.html'))


##회원정보 업데이트 api
@app.route('/update_profile', methods=['POST'])
def saving_update():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload['id']
        about_receive = request.form['about_give']
        new_doc = {
            "profile": about_receive
        }
        if 'file_give' in request.files:
            file = request.files['file.give']
            filename = secure_filename(file.filename)
            extension = filename.split(".")[-1]
            file.path = f"profile_pics/{username}.{extension}"
            file.save("./static/"+file_path)  # S3로 저장해야함!
            new_doc['profile_pic'] = filename # S3 url을 가져올 것!
            new_doc['profile_pic_real'] = file_path
        db.user_info.update_one({'username': payload['id']}, {'$set':new_doc})
        return jsonify({"result": "success", 'msg': '프로필을 업데이트했습니다.'})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for('/'))

## 마이페이지에 내가 포스팅한 게시물만 보여주는 api
# @app.route('/get_posts', methods=['GET'])
# def get_posts():
#     token_receive = request.cookies.get('mytoken')
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         posts = list(db.user_info.find_one({}).sort("date", -1))
#         if username_receive == "":
#             posts = list(db.user_info.find({}).sort('date', -1))
#         else:
#             posts = list(db.user_info.find({"username": username_receive}).sort('date', -1))
#         for post in posts:
#             post['_id'] = str(post['_id'])
#             post['count_heart'] = db.liked_food.count_documents({'post_id'})
#             post['heart_by_me'] = bool(db.liked_food.find_one({'post_id': post['_id'], 'type': 'heart'}))
#         return jsonify({'result': 'success', 'msg': '포스팅을 가져왔습니다.', 'posts': posts})
#     except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
#         return redirect(url_for('/'))


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
