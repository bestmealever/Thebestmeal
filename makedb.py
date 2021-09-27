from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")


db = client.dbtodaymeal

#선택코드
codes = [
    {"group": "yestermeal", "codes": "ymeal-1", "name": "한식"},
    {"group": "yestermeal", "codes": "ymeal-2", "name": "중식"},
    {"group": "yestermeal", "codes": "ymeal-3", "name": "일식"},
    {"group": "yestermeal", "codes": "ymeal-4", "name": "양식"},
    {"group": "yestermeal", "codes": "ymeal-5", "name": "분식"},
    {"group": "yestermeal", "codes": "ymeal-6", "name": "빵"},
    {"group": "yestermeal", "codes": "ymeal-7", "name": "야식"},
    {"group": "yestermeal", "codes": "ymeal-8", "name": "패스트푸드"},
    {"group": "yestermeal", "codes": "ymeal-9", "name": "상관없음"},
    {"group": "todaymeal", "codes": "tmeal-1", "name": "한식"},
    {"group": "todaymeal", "codes": "tmeal-2", "name": "중식"},
    {"group": "todaymeal", "codes": "tmeal-3", "name": "일식"},
    {"group": "todaymeal", "codes": "tmeal-4", "name": "양식"},
    {"group": "todaymeal", "codes": "tmeal-5", "name": "분식"},
    {"group": "todaymeal", "codes": "tmeal-6", "name": "빵"},
    {"group": "todaymeal", "codes": "tmeal-7", "name": "야식"},
    {"group": "todaymeal", "codes": "tmeal-8", "name": "패스트푸드"},
    {"group": "todaymeal", "codes": "tmeal-9", "name": "상관없음"},
    {"group": "feeling", "codes": "feel-1", "name": "힘이 없다"},
    {"group": "feeling", "codes": "feel-2", "name": "시간이 많다"},
    {"group": "feeling", "codes": "feel-3", "name": "스트레스 받는다"},
    {"group": "feeling", "codes": "feel-4", "name": "시간이 없다"},
    {"group": "feeling", "codes": "feel-5", "name": "당 떨어진다.."},
    {"group": "feeling", "codes": "feel-6", "name": "기름지고 싶다"},
    {"group": "feeling", "codes": "feel-7", "name": "짜증난다"},
    {"group": "feeling", "codes": "feel-8", "name": "졸리다"},
    {"group": "feeling", "codes": "feel-9", "name": "행복하다"},
]
db.codes.drop()
db.codes.insert_many(codes)
#추천코드