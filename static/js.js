let category_val = [];

window.onload = function () {
    let temp_html = `        <div class="textBox">
        <p><span class="question">첫번째 질문</span>
            <br>지금 땡기는 음식이 있을까요?<br></p>
    </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" name="category" value="한식">한식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" name="category" value="중식">중식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" name="category" value="일식">일식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" name="category" value="양식">양식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" name="category" value="분식">분식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" name="category" value="디저트">빵
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off" name="category" value="야식">야식
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off" name="category" value="패스트푸드">패스트푸드
            </label>
        </div>
        <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary">
                <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off" name="category" value="">아무거나 괜찮아!
            </label>
        </div>
    <div class="next"><button type="button" onclick="q1()" class="btnNext">다음!</button></div>`
    $('#btnWrap').append(temp_html)

}


function q1() {
    let btn_val = [];
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    console.log(btn_val)
    $.ajax({
        type: "POST",
        url: "/Q_1",
        data: {Q_1_give: btn_val},
        success: function (response) {
            // let selectcategory = response['selectcategory']
            // for (let i = 0; i < selectcategory.length; i++) {
            //     let categoryName = selectcategory[i]['category']
                console.log(response)

//                 let temp_html = `        <div class="textBox">
//                                 <p><span class="question">질문 2</span>
//                                     <br>지금 기분은 어떠신가요?<br>
//                                     당신의 상태에 맞춰 추천해드릴게요!</p>
//                             </div>
// <!--                                <div class="btn-group-toggle" data-toggle="buttons">-->
//                                     <label class="btn btn-secondary active">
//                                         <input type="radio" class="btn-check" id="btnradio1"  checked name="condition" value="fatigued" >너무 피곤해!
//                                     </label>
//                                     <label class="btn btn-secondary active">
//                                         <input type="radio" class="btn-check" id="btnradio2"  checked name="condition" value="busy">시간이 없어!
//                                     </label>
//                                     <label class="btn btn-secondary active">
//                                         <input type="radio" class="btn-check" id="btnradio3"  checked name="condition" value="stressed">스트레스 받아!
//                                     </label>
//                                     <label class="btn btn-secondary active">
//                                         <input type="radio" class="btn-check" id="btnradio4"  checked name="condition" value="laidback">시간 많아!
//                                     </label>
//                                     <label class="btn btn-secondary active">
//                                     <input type="radio" class="btn-check" id="btnradio5"  checked name="condition" value="sweet">당땡기네...
//                                     </label>
//                                     <label class="btn btn-secondary active">
//                                         <input type="radio" class="btn-check" id="btnradio6"  checked name="condition" value="fatty">기름지고 싶네...
//                                     </label>
//                         <!--        </div>-->
//                         <div class="next"><button type="button" onclick="q3()" class="btnNext">결과 보기</button></div>`
//                 $('#btnWrap *').remove()
//                 $('#btnWrap').append(temp_html)
//             }
        }
    })
}




function q3() {
    let condition_length = document.getElementsByName("condition").length;
    for (let i = 0; i < condition_length; i++) {
        if (document.getElementsByName("condition")[i].checked == true) {
            let btn_radio_val = document.getElementsByName("condition")[i].value;
            $.ajax({
                type: "POST",
                url: "/Q_3",
                data: {
                    q3_give: btn_radio_val
                },
                success: function (response) {
                    let selectcategory = response['selectcategory']
                    // let categoryName = selectcategory[0]['category']
                    console.log(selectcategory)
                    let temp_html = `        <div class="textBox">
        <p><span class="question">질문 2</span>
            <br>지금 기분은 어떠신가요?<br>
            당신의 상태에 맞춰 추천해드릴게요!</p>
    </div>
<!--        <div class="btn-group-toggle" data-toggle="buttons">-->
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio1"  checked name="condition" value="fatigued" >너무 피곤해!
            </label>
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio2"  checked name="condition" value="busy">시간이 없어!
            </label>
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio3"  checked name="condition" value="stressed">스트레스 받아!
            </label>
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio4"  checked name="condition" value="laidback">시간 많아!
            </label>
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio5"  checked name="condition" value="sweet">당땡기네...
            </label>
            <label class="btn btn-secondary active">
                <input type="radio" class="btn-check" id="btnradio6"  checked name="condition" value="fatty">기름지고 싶네...
            </label>
<!--        </div>-->
<div class="next"><button type="button" onclick="q3()" class="btnNext">결과 보기</button></div>`
                    $('#btnWrap *').remove()
                    $('#btnWrap').append(temp_html)
                }
            })

            $.ajax({
                type: "POST",
                url: "/Q_3",
                data: {q3_give: btn_radio_val, g3_give_category: category_val},
                success: function (response) {

                    let condition = response['recommend']
                    for (let i = 0; i < condition.length; i++) {
                        let name = condition[i]['name']
                        console.log(name)
                        let temp_html2 = `<div class="recommendbox">오늘 당신에게 추천드릴 음식은<br><span class="recommendMeal">${name}</span> 입니다!</div>
                                <div class="meal_img"></div>
                                <div class="restart" onclick="location.href='/page1'"><button type="button" onclick="q3()" class="btnNext">다시 하기</button></div>`
                        $('#btnWrap *').remove()
                        $('#btnWrap').append(temp_html2)


                    }
                }

            })

        }
    }

}