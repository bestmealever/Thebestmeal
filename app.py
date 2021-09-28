from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
import requests

app = Flask(__name__)

client = MongoClient('13.209.17.66', 27017, username="test", password="test")
db = client.dbMeal

# 메인페이지
@app.route('/')
def main():
    return render_template("index.html")

#Q1카테고리리스팅
@app.route('/q1', methods=['GET'])
def q1category():
    category = list(db.category.find({},{'_id': False}))
    return jsonify({'categories': category})

#Q2카테고리리스팅
@app.route('/q2', methods=['GET'])
def q2category():
    category = list(db.category.find({},{'_id': False}))
    return jsonify({'categories': category})

#Q1페이지-recommendation.html
@app.route('/recommendation')
def recommendation():
    category = list(db.category.find({},{'_id': False}))
    return render_template("recommendation.html", category=category)

#Q2페이지
@app.route('/recommendation2')
def recommendation2():
    category = list(db.category.find({}, {'_id': False}))
    return render_template("recommendation2.html", category=category)

#Q1페이지-유저응답기록
@app.route('/choose1', methods=['POST'])
def choose_1():
    menu_receive = request.form['menu_give']
    doc = {'yesterday':menu_receive}
    db.users.insert_one(doc)
    return jsonify({'msg': '선택 완료!'})

#Q2페이지-유저응답기록
@app.route('/choose2', methods=['POST'])
def choose_2():
    menu_receive = request.form['menu_give']
    doc = {'today':menu_receive}
    db.users.insert_one(doc)
    return jsonify({'msg': '선택 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)


#block 이 아닌곳을 전역이라 함. 함수 def 하나하나를 블럭이라 한다.
#지역변수로 메모리가 따로 관리가 됨.
q1_give_receive 를 블록 밖에서 선언해주기. 다
if __name__ == '__main__':
    빈값으로
    그냥 선언: 지역 변수.
    global:

