from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.team_project_test

doc = [{'category': ['디저트', '양식'], 'name': '쿠키', 'emo': ['우울', '화남']},
       {'category': ['한식', '분식'], 'name': '아이스크림', 'emo': ['시간없음', '짜증']},
       {'category': ['중식'], 'name': '팥빙수', 'emo': ['귀찮다', '기쁘다']}]


for i in doc:
       db.team_project_test.insert_one(i)



print(db.team_project_test.find_one({'category':'한식', 'emo':'시간없음'}, {'_id': False }))