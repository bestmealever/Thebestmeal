function want() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        let btnCheck = $(`input:checkbox[id="chk${i + 1}"]`)
        if (btnCheck.is(":checked") === true) {
            btn_val.push(btnCheck.val())
        }
    }
    console.log(btn_val)
    $.ajax({
        type: "POST",
        url: "/want",
        data: {want_give: btn_val},
        success: function (response) {
            if (response['result'] === 'fail') {
                $("#modal-post").addClass("is-active");
                console.log('want');
            } else {
                let temp_html = `<div class="question-h">
                                    <p class="question-style"> Q.2 오늘 기분은 어때요? </p>
                                </div>
                                <div class="button-group-in">
                                    <input type="checkbox" id="chk1" class="select-category" value="no_time">
                                    <label class="category" for="chk1">시간이 없어요</label>
                        
                                    <input type="checkbox" id="chk2" class="select-category" value="many_time">
                                    <label class="category" for="chk2">시간 많아요!</label>
                        
                                    <input type="checkbox" id="chk3" class="select-category" value="perfect">
                                    <label class="category" for="chk3">완벽한 저녁이 필요해요!</label>
                                </div>
                                <div class="button-group-in">
                                    <input type="checkbox" id="chk4" class="select-category" value="needsugar">
                                    <label class="category" for="chk4">당 떨어져요 ㅠ</label>
                        
                                    <input type="checkbox" id="chk5" class="select-category" value="stressed">
                                    <label class="category" for="chk5">스트레스 받았어요</label>
                        
                                    <input type="checkbox" id="chk6" class="select-category" value="fatty">
                                    <label class="category" for="chk6">기름진게 땡기네요!</label>
                                </div>
                                <div class="button-group-out">
                                    <button class="button next-stage" onclick="feeling()">다음</button>
                                    <button class="button next-stage" onclick="feeling_no()">땡기는게 없어요</button>
                                </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)

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
            $("#modal-post2").addClass("is-active");
            console.log('want_no');
            let temp_html = `        <div class="question-h">
                                        <p class="question-style"> Q.2 그럼 어제는 뭐 먹었어요? </p>
                                    </div>
                                    <div class="button-group-in">
                                        <input type="checkbox" id="chk1" class="select-category" value="korean">
                                        <label class="category" for="chk1">한식</label>
                            
                                        <input type="checkbox" id="chk2" class="select-category" value="chinese">
                                        <label class="category" for="chk2">중식</label>
                            
                                        <input type="checkbox" id="chk3" class="select-category" value="japanese">
                                        <label class="category" for="chk3">일식</label>
                                    </div>
                                    <div class="button-group-in">
                                        <input type="checkbox" id="chk4" class="select-category" value="western">
                                        <label class="category" for="chk4">양식</label>
                            
                                        <input type="checkbox" id="chk5" class="select-category" value="snack">
                                        <label class="category" for="chk5">분식</label>
                            
                                        <input type="checkbox" id="chk6" class="select-category" value="bread">
                                        <label class="category" for="chk6">빵</label>
                                    </div>
                                    <div class="button-group-in">
                                        <input type="checkbox" id="chk7" class="select-category" value="supper">
                                        <label class="category" for="chk7">야식</label>
                            
                                        <input type="checkbox" id="chk8" class="select-category" value="fastfood">
                                        <label class="category" for="chk8">패스트푸드</label>
                            
                                        <input type="checkbox" id="chk9" class="select-category" value="salad">
                                        <label class="category" for="chk9">샐러드</label>
                                    </div>
                                    <div class="button-group-out">
                                        <button class="button next-stage" onclick="yesterday()">다음</button>
                                        <button class="button next-stage" onclick="yesterday_no()">잘 모르겠어요</button>
                                    </div>`
            let btnGroup = $('#button-group')
            btnGroup.empty()
            btnGroup.append(temp_html)

        }
    })
}


function yesterday() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        let btnCheck = $(`input:checkbox[id="chk${i + 1}"]`)
        if (btnCheck.is(":checked") === true) {
            btn_val.push(btnCheck.val())
        }
    }
    $.ajax({
        type: "POST",
        url: "/yesterday",
        data: {yesterday_give: btn_val},
        success: function (response) {
            if (response['result'] === 'fail') {
                $("#modal-post").addClass("is-active");
                console.log('yesterday');
            } else {
                let temp_html = `<div class="question-h">
                                    <p class="question-style"> Q.3 오늘 기분은 어때요? </p>
                                </div>
                                <div class="button-group-in">
                                    <input type="checkbox" id="chk1" class="select-category" value="no_time">
                                    <label class="category" for="chk1">시간이 없어요</label>
                        
                                    <input type="checkbox" id="chk2" class="select-category" value="many_time">
                                    <label class="category" for="chk2">시간 많아요!</label>
                        
                                    <input type="checkbox" id="chk3" class="select-category" value="perfect">
                                    <label class="category" for="chk3">완벽한 저녁이 필요해요!</label>
                                </div>
                                <div class="button-group-in">
                                    <input type="checkbox" id="chk4" class="select-category" value="needsugar">
                                    <label class="category" for="chk4">당 떨어져요 ㅠ</label>
                        
                                    <input type="checkbox" id="chk5" class="select-category" value="stressed">
                                    <label class="category" for="chk5">스트레스 받았어요</label>
                        
                                    <input type="checkbox" id="chk6" class="select-category" value="fatty">
                                    <label class="category" for="chk6">기름진게 땡기네요!</label>
                                </div>
                                <div class="button-group-out">
                                    <button class="button next-stage" onclick="feeling()">다음</button>
                                    <button class="button next-stage" onclick="feeling_no()">잘 모르겠어요</button>
                                </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)
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
            $("#modal-post3").addClass("is-active");
            console.log('yesterday_no');
            let temp_html = `<div class="question-h">
                                <p class="question-style"> Q.3 오늘 기분은 어때요? </p>
                            </div>
                            <div class="button-group-in">
                                    <input type="checkbox" id="chk1" class="select-category" value="no_time">
                                    <label class="category" for="chk1">시간이 없어요</label>
                        
                                    <input type="checkbox" id="chk2" class="select-category" value="many_time">
                                    <label class="category" for="chk2">시간 많아요!</label>
                        
                                    <input type="checkbox" id="chk3" class="select-category" value="perfect">
                                    <label class="category" for="chk3">완벽한 저녁이 필요해요!</label>
                                </div>
                                <div class="button-group-in">
                                    <input type="checkbox" id="chk4" class="select-category" value="needsugar">
                                    <label class="category" for="chk4">당 떨어져요 ㅠ</label>
                        
                                    <input type="checkbox" id="chk5" class="select-category" value="stressed">
                                    <label class="category" for="chk5">스트레스 받았어요</label>
                        
                                    <input type="checkbox" id="chk6" class="select-category" value="fatty">
                                    <label class="category" for="chk6">기름진게 땡기네요!</label>
                                </div>
                                <div class="button-group-out">
                                    <button class="button next-stage" onclick="feeling()">다음</button>
                                    <button class="button next-stage" onclick="feeling_no()">잘 모르겠어요</button>
                                </div>`
            let btnGroup = $('#button-group')
            btnGroup.empty()
            btnGroup.append(temp_html)
        }
    })
}

function feeling() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        let btnCheck = $(`input:checkbox[id="chk${i + 1}"]`)
        if (btnCheck.is(":checked") === true) {
            btn_val.push(btnCheck.val())
        }
    }
    $.ajax({
        type: "POST",
        url: "/feeling",
        data: {feeling_give: btn_val},
        success: function (response) {
            if (response['result'] === 'fail') {
                $("#modal-post").addClass("is-active");
                console.log('feeling');
            } else {
                console.log(response['chosen'])
                let temp_html = `<div class="question-h">
                                    <p class="todays">${response['msg1']} <span id="recommend">${response['chosen']['name']}</span> ${response['msg2']}</p>
                                </div>
                                    <div class="mealimg" style="background-image: url('${response['chosen']['url']}" alt="${response['chosen']['name']}"></div>
                                <div class="button-group-out">
                                    <button class="button next-stage" onclick='$("#modal-post").addClass("is-active")'>이거 먹을게요!</button>
                                    <button class="button next-stage" onclick="retry()">마음에 안들어요...</button>
                                </div>
                                <!--이거 먹을게요 모닲-->
                                <div class="modal" id="modal-post">
                                    <div class="modal-background" onclick='$("#modal-post").removeClass("is-active")'></div>
                                    <div class="modal-content">
                                        <div class="box">
                                            <div class="modal-card">
                                                <header class="modal-card-head">
                                                  <h5 class="modal-card-title" id="modal-label">식당을 추천받기 위해 주소를 입력해주세요.</h5>
                                                  <button class="button modal-close" data-bs-dismiss="modal" aria-label="close"></button>
                                                </header>
                                                <section class="modal-card-body">
                                                  <input type="text" class="form-control" id="address" placeholder="주소">
                                                </section>
                                                <footer class="modal-card-foot">
                                                  <button class="button" onclick="to_kakao()">추천!</button>
                                                </footer>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)
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
            $("#modal-post4").addClass("is-active");
            console.log('feeling');
        }
    })
}

function retry() {
    $.ajax({
        type: "POST",
        url: "/retry",
        data: {},
        success: function (response) {
            let temp_html = `<div class="question-h">
                                <p class="todays">${response['msg1']} <span id="recommend">${response['chosen']['name']}</span> ${response['msg2']}</p>
                            </div>
                                <div class="mealimg" style="background-image: url('${response['chosen']['url']}" alt="${response['chosen']['name']}"></div>
                            <div class="button-group-out">
                                <button class="button next-stage" onclick='$("#modal-post").addClass("is-active")'>이거 먹을게요!</button>
                                <button class="button next-stage" onclick="retry()">마음에 안들어요...</button>
                            </div>
                            <!--이거 먹을게요 모닲-->
                                <div class="modal" id="modal-post5">
                                    <div class="modal-background" onclick='$("#modal-post5").removeClass("is-active")'></div>
                                    <div class="modal-content" style="width: 800px;">
                                        <header class="modal-card-head">
                                          <h5 class="modal-card-title" id="modal-label">식당을 추천받기 위해 주소를 입력해주세요.</h5>
                                          <button class="button modal-close" data-bs-dismiss="modal" aria-label="close"></button>
                                        </header>
                                        <section class="modal-card-body">
                                          <input class="input is-rounded posting_q1_input" type="text" class="form-control" id="address" placeholder="주소">
                                          <div class="button-group-out">
                                                <button class="button next-stage" onclick="to_kakao()">추천!</button>
                                            </div>
                                        </section>
                                    </div>
                                </div>`
            let btnGroup = $('#button-group')
            btnGroup.empty()
            btnGroup.append(temp_html)
        }
    })
}

function to_kakao() {
    let address = $('#address').val()
    let recommend = $('#recommend').text()
    console.log(address)
    console.log(recommend)
    $.ajax({
        type: "POST",
        url: "/to_kakao",
        data: {address_give: address, recommend_give: recommend},
        success: function () {
            window.location.href = '/kakao'
        }
    })
}

