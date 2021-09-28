from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.team_project

meals = [
 {'category': '디저트', 'name': '쿠키', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '디저트', 'name': '아이스크림', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '디저트', 'name': '팥빙수', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '디저트', 'name': '케이크', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '디저트', 'name': '도너츠', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '디저트', 'name': '크로플', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '김치볶음밥', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '우동', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '쫄면', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '만두', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '김밥', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '분식', 'name': '떡볶이', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '보쌈', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '족발', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '곱창', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '닭발', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '국밥', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '야식', 'name': '육회', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '샐러드', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '스테이크', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '타코', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '리조또', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '케밥', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '양식', 'name': '바비큐', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '사케동', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '소바', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '카츠', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '라멘', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '초밥', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '일식', 'name': '카츠동', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '짜장면', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '짬뽕', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '탕수육', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '양장피', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '마라탕', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '중식', 'name': '마라샹궈', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '샌드위치', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '피자', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '버거', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '치킨', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '타코', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '패스트푸드', 'name': '핫도그', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '파전', 'fatigued': True, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '보쌈', 'fatigued': False, 'busy': True, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '냉면', 'fatigued': False, 'busy': False, 'stressed': True, 'laidback': False, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '비빔밥', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': True, 'sweet': False, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '순두부', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': True, 'fatty': False, 'photo': False, 'recommend_user': False, 'like': False},
 {'category': '한식', 'name': '김치찌개', 'fatigued': False, 'busy': False, 'stressed': False, 'laidback': False, 'sweet': False, 'fatty': True, 'photo': False, 'recommend_user': False, 'like': False}
 ]

for i in meals:
    db.team_project.insert_one(i)