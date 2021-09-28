function want() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/want",
        data: {want_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
        <h4> Q.2 오늘 기분은 어때요? </h4>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
    </div>`
                $('#btn-group').empty()
                $('#btn-group').append(temp_html)

            }
        }
    })
}

function want_no() {
    $.ajax({
        type: "POST",
        url: "/want_no",
        data: {},
        success: function (response) {
            alert(response['msg'])
            temp_html = `        <div class="question-h">
            <h4> Q.2 그럼 어제는 뭐 먹었어요? </h4>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck1">한식</label>

            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck2">중식</label>

            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck3">일식</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck4">양식</label>

            <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck5">분식</label>

            <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck6">빵</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck7">야식</label>

            <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck8">패스트푸드</label>

            <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off">
            <label class="btn btn-outline-primary choice" for="btncheck9">샐러드</label>
        </div>
        <div class="btn-group-out">
            <button type="button" class="btn btn-primary next" onclick="yesterday()">다음</button>
            <button type="button" class="btn btn-primary next" onclick="yesterday_no()">잘 모르겠어요</button>
        </div>`
            $('#btn-group').empty()
            $('#btn-group').append(temp_html)

        }
    })
}


function yesterday() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/yesterday",
        data: {yesterday_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
        <h4> Q.3 오늘 기분은 어때요? </h4>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
    </div>`
                $('#btn-group').empty()
                $('#btn-group').append(temp_html)
            }
        }
    })
}

function yesterday_no() {
    $.ajax({
        type: "POST",
        url: "/yesterday_no",
        data: {},
        success: function (response) {
            alert(response['msg'])
            temp_html = `<div class="question-h">
        <h4> Q.3 오늘 기분은 어때요? </h4>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
    </div>`
            $('#btn-group').empty()
            $('#btn-group').append(temp_html)
        }
    })
}

function feeling() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked"))
    }
    $.ajax({
        type: "POST",
        url: "/feeling",
        data: {feeling_give: btn_val},
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


function feeling_no() {
    $.ajax({
        type: "POST",
        url: "/feeling_no",
        data: {},
        success: function (response) {
            alert(response['msg'])
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
    })
}
