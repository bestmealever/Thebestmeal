from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.meals

meals = list(db.meals.find({'category':'디저트'}))
for meal in meals:
    print(meal['name'])
print('--피곤할때 추천--')
fatigueds = list(db.meals.find({'fatigued': True}))
for fatigued in fatigueds:
    print(fatigued['name'])
print('--피곤할때,바쁠때 추천--')
fbs = list(db.meals.find({'fatigued': True, 'busy':False}))
for fb in fbs:
    print(fb['name'])
print('--왜안되노--')
meals = list(db.meals.find({}, {'_id': False}))
for meal in meals :
        meals_list = meal
        print(meals_list)