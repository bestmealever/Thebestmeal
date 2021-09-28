# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request

import random

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.team_project

choices = []
for_reverse = ['korean', 'chinese', 'japanese', 'western', 'snack', 'bread', 'supper', 'fastfood', 'salad']

# want_food = True
# yesterday_food = True
# feeling_emo = True

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


## API 역할을 하는 부분
@app.route('/want', methods=['POST'])
def want():
    want_give_receive = request.form.getlist('want_give[]')
    print(want_give_receive)
    if want_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        choices.append(want_give_receive)
        return jsonify({'result': 'success'})

@app.route('/want_no', methods=['POST'])
def want_no():
    # global want_food
    # want_food = False
    return {'msg': '먹고 싶은게 없다니...'}


@app.route('/yesterday', methods=['POST'])
def yesterday():
    yesterday_give_receive = request.form.getlist('yesterday_give[]')
    if yesterday_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        yesterday_give_receive_reverse = []
        for i in for_reverse:
            if i not in yesterday_give_receive:
                yesterday_give_receive_reverse.append(i)
            else:
                pass
        choices.append(yesterday_give_receive_reverse)
        return jsonify({'result': 'success'})

@app.route('/yesterday_no', methods=['POST'])
def yesterday_no():
    # global yesterday_food
    # yesterday_food = False

    return {'msg': '어제 먹은게 기억이 안나요??'}


@app.route('/feeling', methods=['POST'])
def feeling():
    choosen = []
    feeling_give_receive = request.form.getlist('feeling_give[]')
    choices.append(feeling_give_receive)
    print(choices)
    if feeling_give_receive == []:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:

        for i in choices[0]:
            for j in choices[1]:
                choosen.append(db.team_project.find_one({'category': i, 'emotion': j}, {'_id': False, 'name': True, 'url': True}))
        print(choosen)
        choices.clear()
        return jsonify({'result': 'success', 'choosen': choosen})


@app.route('/feeling_no', methods=['POST'])
def feeling_no():
    # global feeling_emo
    # feeling_emo = False
    return {'msg': '기분을 모르겠다니 ㅠㅠ'}


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
