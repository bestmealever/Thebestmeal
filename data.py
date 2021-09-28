from pymongo import MongoClient
import pandas as pd

data = pd.read_csv('food.csv', encoding='utf-8-sig', index_col=False)

client = MongoClient('localhost', 27017)
db = client.team_project
#
for i in range(len(data)):
    doc = {}
    doc['name'] = data.iloc[i]['title']
    doc['category'] = data.iloc[i]['emotion'].split(',')
    doc['emotion'] = data.iloc[i]['emotion'].split(',')
    doc['url'] = data.iloc[i]['url']
    db.team_project.insert_one(doc)