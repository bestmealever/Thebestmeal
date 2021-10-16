function step1() {
    let btn_val = []
    for (let i = 0; i < 9; i++) {
        let btnCheck = $(`input:checkbox[id="chk${i + 1}"]`)
        if (btnCheck.is(":checked") === true) {
            btn_val.push(btnCheck.val())
        }
    }
    console.log(btn_val)
    let foodname = $("#foodname1").val();
    $("#foodname").find("input[type=text]").each(function () {
        if ($(this).val().trim() == '') {
            // alert('음식 이름을 입력해주세요!');
            $("#modal-post").addClass("is-active");
        } else (
            $.ajax({
                type: "POST",
                url: "/step1",
                data: {foodname_give: foodname},
                success: function (response) {
                    if (response['result'] === 'fail') {
                        // alert(response['msg'])
                        $("#modal-post2").addClass("is-active");
                        console.log(response['msg'])
                    } else {
                        let temp_html = `<div class="question-h">
                    <p class="question-style"> Q.1 어떤 종류의 음식인가요? </p>
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
                                             <button class="button next-stage" onclick="step2()">다음</button>
                                            </div>`
                        let btnGroup = $('#button-group')
                        btnGroup.empty()
                        btnGroup.append(temp_html)
                    }
                }
            }))
    })
}

function step2() {
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
        url: "/step2",
        data: {food_cat_give: btn_val},
        success: function (response) {
            if (response['result'] === 'fail') {
                $("#modal-post3").addClass("is-active");
            } else {
                let temp_html = `<div class="question-h">
                                    <p class="question-style"> Q.2 언제 먹으면 좋아요? </p>
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
                                    <button class="button next-stage" onclick="step3()">다음</button>
                                </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)

            }
        }
    })
}

function step3() {
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
        url: "/step3",
        data: {food_feel_give: btn_val},
        success: function (response) {
            if (response['result'] === 'fail') {
                $("#modal-post2").addClass("is-active");
            } else {
                let temp_html = `
        <div>
            <div class="form-group">
                <form id="upload-file">
                    <label for="post-url">이미지 파일</label>
                    <input type="file" name="file"/>
                </form>
            </div>
            <button type="button" class="btn btn-primary" onclick="save()">저장</button>
        </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)
            }
        }
    })
}

function save() {
    let form_data = new FormData($('#upload-file')[0]);
    $.ajax({
        type: 'POST',
        url: '/fileupload',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
            alert("파일이 업로드 되었습니다!!");
        },
    });
}
