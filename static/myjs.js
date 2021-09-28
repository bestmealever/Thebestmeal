function Q_1() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/Q_1",
        data: {Q1_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
            <h4> Q.2 오늘 땡기는 음식이 있나요? </h4>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck1">한식</label>

            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck2">중식</label>

            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck3">일식</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck4">양식</label>

            <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck5">분식</label>

            <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck6">빵</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck7">야식</label>

            <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck8">패스트푸드</label>

            <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off">
            <label class="btn btn-outline-primary" for="btncheck9">땡기는게 없어요</label>
        </div>
        <div class="btn-group-out">
            <button type="button" class="btn btn-primary" onclick="Q_2()">다음_2</button>
        </div>`
                $('#btn-group').empty()
                $('#btn-group').append(temp_html)
            }
        }
    })
}

function Q_2() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/Q_2",
        data: {Q2_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
        <h4> Q.3 해당 되는 상태를 모두 골라주세요! </h4>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck7">담백한게 땡겨요</label>

        <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck8">잘 모르겠어요...</label>

        <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck9">전 아무거나 상관없어요~</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn btn-primary" onclick="Q_3()">다음_3</button>
    </div>`
                $('#btn-group').empty()
                $('#btn-group').append(temp_html)
            }
        }
    })
}

function Q_3() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/Q_3",
        data: {Q3_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
        <h2>오늘은, <br> ${response['msg']['name']} <br> 어때요?!</h2>
    </div>
        <img src="${response['msg']['photo']}" alt="${response['msg']['name']}">
    <div class="btn-group-out">
        <button type="button" class="btn btn-primary" onclick="">이거 먹을게요!</button>
        <button type="button" class="btn btn-primary" onclick="">마음에 안들어요...</button>
    </div>`
                $('#btn-group').empty()
                $('#btn-group').append(temp_html)
            }
        }
    })
}



