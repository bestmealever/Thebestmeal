function want() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        if ($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked") == true) {
            btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).val())
        }
    }
    console.log(btn_val)
    $.ajax({
        type: "POST",
        url: "/want",
        data: {want_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                temp_html = `<div class="question-h">
        <p class="questionStyle"> Q.2 오늘 기분은 어때요? </p>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="no_time">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="many_time">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="perfect">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="needsugar">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="stressed">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="fatty">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
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
            <p class="questionStyle"> Q.2 그럼 어제는 뭐 먹었어요? </p>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="korean">
            <label class="btn btn-outline-primary choice" for="btncheck1">한식</label>

            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="chinese">
            <label class="btn btn-outline-primary choice" for="btncheck2">중식</label>

            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="japanese">
            <label class="btn btn-outline-primary choice" for="btncheck3">일식</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="western">
            <label class="btn btn-outline-primary choice" for="btncheck4">양식</label>

            <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="snack">
            <label class="btn btn-outline-primary choice" for="btncheck5">분식</label>

            <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="bread">
            <label class="btn btn-outline-primary choice" for="btncheck6">빵</label>
        </div>
        <div class="btn-group-in">
            <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off" value="supper">
            <label class="btn btn-outline-primary choice" for="btncheck7">야식</label>

            <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off" value="fastfood">
            <label class="btn btn-outline-primary choice" for="btncheck8">패스트푸드</label>

            <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off" value="salad">
            <label class="btn btn-outline-primary choice" for="btncheck9">샐러드</label>
        </div>
        <div class="btn-group-out">
            <button type="button" class="btn selectbutton btn-primary next" onclick="yesterday()">다음</button>
            <button type="button" class="btn selectbutton btn-primary next" onclick="yesterday_no()">잘 모르겠어요</button>
        </div>`
            $('#btn-group').empty()
            $('#btn-group').append(temp_html)

        }
    })
}


function yesterday() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        if ($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked") == true) {
            btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).val())
        }
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
        <p class="questionStyle"> Q.3 오늘 기분은 어때요? </p>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="no_time">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="many_time">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="perfect">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="needsugar">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="stressed">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="fatty">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
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
        <p class="questionStyle"> Q.3 오늘 기분은 어때요? </p>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="no_time">
        <label class="btn btn-outline-primary choice" for="btncheck1">시간이 없어요</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="many_time">
        <label class="btn btn-outline-primary choice" for="btncheck2">시간 많아요!</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="perfect">
        <label class="btn btn-outline-primary choice" for="btncheck3">완벽한 저녁이 필요해요!</label>
    </div>
    <div class="btn-group-in">
        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="needsugar">
        <label class="btn btn-outline-primary choice" for="btncheck4">당 떨어져요 ㅠ</label>

        <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="stressed">
        <label class="btn btn-outline-primary choice" for="btncheck5">스트레스 받았어요</label>

        <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="fatty">
        <label class="btn btn-outline-primary choice" for="btncheck6">기름진게 땡기네요!</label>
    </div>
    <div class="btn-group-out">
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling()">다음</button>
        <button type="button" class="btn selectbutton btn-primary next" onclick="feeling_no()">잘 모르겠어요</button>
    </div>`
            $('#btn-group').empty()
            $('#btn-group').append(temp_html)
        }
    })
}

function feeling() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        if ($(`input:checkbox[id="btncheck${i + 1}"]`).is(":checked") == true) {
            btn_val.push($(`input:checkbox[id="btncheck${i + 1}"]`).val())
        }
    }
    $.ajax({
        type: "POST",
        url: "/feeling",
        data: {feeling_give: btn_val},
        success: function (response) {
            if (response['result'] == 'fail') {
                alert(response['msg'])
            } else {
                console.log(response['chosen'])
                temp_html = `<div class="question-h">
        <p class="todays">${response['msg1']} <span class="recommend">${response['chosen']['name']}</span> ${response['msg2']}</p>
    </div>
        <div class="mealimg" style="background-image: url('${response['chosen']['url']}" alt="${response['chosen']['name']}";"></div>
    <div class="btn-group-out">
        <button type="button" class="btn selectbutton btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">이거 먹을게요!</button>
        <button type="button" class="btn selectbutton btn-primary" onclick="retry()">마음에 안들어요...</button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">식당을 추천받기 위해 주소를 입력해 주세요.</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" id="address" placeholder="주소">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="to_kakao()">추천!</button>
                </div>
            </div>
        </div>
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
            //         temp_html = `<div class="question-h">
            //     <p class="todays">오늘은 <span class="recommend">${response['msg']['name']}</span> 어때요?!</p>
            // </div>
            //     <img src="${response['msg']['url']}" alt="${response['msg']['name']}">
            // <div class="btn-group-out">
            //     <button type="button" class="btn selectbutton btn-primary" onclick="">이거 먹을게요!</button>
            //     <button type="button" class="btn selectbutton btn-primary" onclick="retry()">마음에 안들어요...</button>
            // </div>`
            //         $('#btn-group').empty()
            //         $('#btn-group').append(temp_html)
        }
    })
}

function retry() {
    $.ajax({
        type: "POST",
        url: "/retry",
        data: {},
        success: function (response) {
            temp_html = `<div class="question-h">
        <p class="todays">${response['msg1']} <span class="recommend">${response['chosen']['name']}</span> ${response['msg2']}</p>
    </div>
        <div class="mealimg" style="background-image: url('${response['chosen']['url']}" alt="${response['chosen']['name']}";"></div>
    <div class="btn-group-out">
        <button type="button" class="btn selectbutton btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">이거 먹을게요!</button>
        <button type="button" class="btn selectbutton btn-primary" onclick="retry()">마음에 안들어요...</button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">식당을 추천받기 위해 주소를 입력해 주세요.</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" id="address" placeholder="주소">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="to_kakao()">추천!</button>
                </div>
            </div>
        </div>
    </div>`
            $('#btn-group').empty()
            $('#btn-group').append(temp_html)
        }
    })
}

function to_kakao() {
    let address = $('#address').val()
    console.log(address)
    $.ajax({
        type: "POST",
        url: "/to_kakao",
        data: {address_give: address},
        success: function (response) {
            window.location.href = '/kakao'
        }
    })
}


