from pymongo import MongoClient
import pandas as pd

data = pd.read_csv('food_final.csv', encoding='utf-8-sig', index_col=False)

# 배포서버
MONGO_HOST = "13.209.11.221"
MONGO_PORT = "27017"
MONGO_DB = "team_project"
MONGO_USER = "test"
MONGO_PASS = "test"

uri = "mongodb://{}:{}@{}:{}/{}?authSource=admin".format(MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB)
client = MongoClient(uri)

# 로컬서버
# client = MongoClient('localhost', 27017)
db = client.team_project

for i in range(len(data)):
    doc = {'name': data.iloc[i]['title'], 'category': data.iloc[i]['category'].split(','),
           'emotion': data.iloc[i]['emotion'].split(','), 'url': data.iloc[i]['url']}
    db.team_project.insert_one(doc)
