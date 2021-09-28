# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request

import random

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.team_project
choices = []
want_food = True
yesterday_food = True
feeling_emo = True

random_foods = ['쿠키','아이스크림','팥빙수','케이크','도너츠','크로플','김치볶음밥','우동','쫄면','만두','김밥','떡볶이','보쌈','족발','곱창','닭발','국밥','육회','샐러드','스테이크','타코','리조또','케밥','바비큐','사케동','소바','카츠','라멘','초밥','카츠동','짜장면','짬뽕','탕수육','양장피','마라탕','마라샹궈','샌드위치','피자','버거','치킨','타코','핫도그','파전','보쌈','냉면','비빔밥','순두부','김치찌개']
doc = {
    'category': {
        'han': False,
        'joog': False,
        'il': False,
        'yang': False,
        'boon': False,
        'bbang': False,
        'ya': False,
        'fast': False
    },
    'feeling': {'busy': False,
                'fatigued': False,
                'stressed': False,
                'laidback': False,
                'sweet': False,
                'fatty': False,
                'photo': False,
                'recommend_user': False,
                'like': False
                }
}

# def choice_algo(choices):
#     if 'true' in choices[1]:
#         if 'true' in choices[2][:7]:
#             doc['category']


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


## API 역할을 하는 부분
@app.route('/want', methods=['POST'])
def want():
    want_give_receive = request.form.getlist('want_give[]')
    print(want_give_receive)
    choices.append(want_give_receive)
    if 'true' not in want_give_receive:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        return jsonify({'result': 'success'})

@app.route('/want_no', methods=['POST'])
def want_no():
    global want_food
    want_food = False
    return {'msg': '먹고 싶은게 없다니...'}


@app.route('/yesterday', methods=['POST'])
def yesterday():
    yesterday_give_receive = request.form.getlist('yesterday_give[]')
    print(yesterday_give_receive)
    choices.append(yesterday_give_receive)
    if 'true' not in yesterday_give_receive:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:
        return jsonify({'result': 'success'})

@app.route('/yesterday_no', methods=['POST'])
def yesterday_no():
    global yesterday_food
    yesterday_food = False

    return {'msg': '어제 먹은게 기억이 안나요??'}


@app.route('/feeling', methods=['POST'])
def feeling():
    feeling_give_receive = request.form.getlist('feeling_give[]')
    choices.append(feeling_give_receive)
    print(choices)

    if 'true' not in feeling_give_receive:
        return jsonify({'result': 'fail', 'msg': '하나 이상 선택해 주세요!'})
    else:

        test = db.team_project.find_one({'name': random_foods[random.randint(0,48)]}, {'_id': False, 'name': True, 'photo': True})

        print(test)
        return jsonify({'result': 'success', 'msg': test})


@app.route('/feeling_no', methods=['POST'])
def feeling_no():
    global feeling_emo
    feeling_emo = False
    return {'msg': '기분을 모르겠다니 ㅠㅠ'}


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
