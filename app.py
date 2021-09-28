from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.meals


## HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')


## 추천받기
@app.route('/page1')
def page1():
    return render_template('page1.html')


## 추천하기
@app.route('/page2')
def page2():
    return render_template('page2.html')


##API
@app.route('/Q_1', methods=['POST'])
def q1():
    q1_receive = request.form.getlist('q1_give[]')
    return {'msg': q1_receive}


@app.route('/Q_2', methods=['POST'])
def q2():
    q2_receives = request.form.getlist('q2_give')
    for q2_receive in q2_receives:
        selectcategory = list(db.meals.find({'category': q2_receive}, {'_id': False}))
        print(selectcategory)
    return {'selectcategory': selectcategory}


@app.route('/Q_3', methods=['POST'])
def q3():
    q3_receive = request.form.get('q3_give')
    recommend = list(db.meals.find({q3_receive: True}, {'_id': False}))
    print(recommend)
    return {'recommend': recommend}


# @app.route('/Q_3', methods=['GET'])
# def recommend():
#     lists = list(db.meals.find({},{'_id':False}))
#
#     return jsonify({'all_lists':lists})

@app.route('/recommend', methods=['GET'])
def show_meals():
    meals = list(db.meals.find({}, {'_id': False}))
    # for meal in meals:
    #     meals_list= meal
    return {'all_meals': meals}


#
# @app.route('/recommend', methods=['POST'])
# def save_meals():
#     category_receive = request.form['category_give']
#     name_receive = request.form['name_give']
#     content_receive = request.form['content_give']
#
#     file = request.files["file_give"]
#
#     extension = file.filename.split('.')[-1]
#
#     today = datetime.now()
#     mytime = today.strftime('%Y%m%d_%H-%M-%S')
#     filename = f'file-{mytime}'
#
#     save_to = f'static/{filename}.{extension}'
#     file.save(save_to)
#
#     doc = {
#         'category': category_receive,
#         'name': name_receive,
#         'reccomend_user': content_receive,
#         'file': f'{filename}.{extension}'
#     }
#
#     db.meals.insert_one(doc)
#     return jsonify({'msg': '저장 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
