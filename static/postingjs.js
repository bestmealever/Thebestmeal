function step1() {
    let foodname = $("#foodname").val();
    console.log(foodname);
    if ($("#foodname").val() == '') {
        $("#modal-post").addClass("is-active");
    } else {
        $.ajax({
            type: "POST",
            url: "/step1",
            data: {foodname_give: foodname},
            success: function (response) {
                // 이미 등록된 음식일 경우 경고
                if (response['result'] === 'fail') {
                    $("#modal-post2").addClass("is-active");
                    console.log(response['msg'])
                } else {
                    let temp_html = `<p class="question-style" style="margin-bottom: 10px;"> Q.2 어떤 종류의 음식인가요? </p>
                                         <progress class="progress is-normal" value="25" max="100">25%</progress>
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
                                         <!--다음 버튼-->
                                          <div class="button-group-out">
                                             <button class="button next-stage" onclick="step2()">다음</button>
                                          </div>`
                    let btnGroup = $('#button-group')
                    btnGroup.empty()
                    btnGroup.append(temp_html)
                }
            }
        })
    }
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
            // 선택하지 않았을 경우 경고
            if (response['result'] === 'fail') {
                $("#modal-post3").addClass("is-active");
            } else {
                let temp_html = `<p class="question-style" style="margin-bottom: 10px;"> Q.3 어떨 때 먹으면 좋아요? </p>
                                 <progress class="progress is-normal" value="50" max="100">50%</progress>
                                 <div class="button-group-in">
                                    <input type="checkbox" id="chk1" class="select-category" value="no_time">
                                    <label class="category" for="chk1">시간이 없을 때</label>
                                    <input type="checkbox" id="chk2" class="select-category" value="many_time">
                                    <label class="category" for="chk2">시간이 많을 때</label>
                                    <input type="checkbox" id="chk3" class="select-category" value="perfect">
                                    <label class="category" for="chk3">완벽한 저녁이 필요할 때</label>
                                 </div>
                                 <div class="button-group-in">
                                    <input type="checkbox" id="chk4" class="select-category" value="needsugar">
                                    <label class="category" for="chk4">당 떨어질 때</label>
                                    <input type="checkbox" id="chk5" class="select-category" value="stressed">
                                    <label class="category" for="chk5">스트레스 받을 때</label>
                                    <input type="checkbox" id="chk6" class="select-category" value="fatty">
                                    <label class="category" for="chk6">기름진게 땡길 때</label>
                                 </div>
                                 <!--다음 버튼-->
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
                // 선택하지 않았을 경우 경고
                $("#modal-post3").addClass("is-active");
            } else {
                let temp_html = `<p class="question-style" style="margin-bottom: 10px;"> Q.4 음식 사진과 음식 소개를 부탁드려요! </p>
                                <progress class="progress is-normal" value="75" max="100">75%</progress>
                                <div>
                                <!--파일 업로더-->
                                <div class="form-group">
                                    <div class="file is-small">
                                        <form id="upload-file">
                                            <label class="file-label" for="post-url"  name="file">
                                                <input class="file-input" id="post-url" type="file"  name="file" accept="image/*" onchange="setThumbnail(event);"/>
                                                <span class="file-cta">
                                               <span class="file-icon"><i class="fa fa-upload"></i></span><span class="file-label">음식 사진 내 컴퓨터에서 업로드</span></span>
                                            </label>
                                            <!--이미지 미리보기-->
                                            <div id="image_container"></div>
                                            <!--코멘트-->
                                            <div style="width:450px;  float: left;">
                                                <input class="input is-rounded" style="text-align: center; height:200px; border-radius: 20px;  margin: 10px 0 0 0; word-wrap: break-word;" type="text" id="comment" placeholder="이 음식을 소개해주세요! (최대 45자까지 입력 가능합니다)" maxlength='45'>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <!--다음 버튼-->
                                <div class="button-group-out">
                                    <button type="button" class="button next-stage" onclick="save()">저장</button>
                                </div>`
                let btnGroup = $('#button-group')
                btnGroup.empty()
                btnGroup.append(temp_html)
            }
        }
    })
}

<!--이미지 미리보기 이벤트-->
function setThumbnail(event) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute(
            "src",
            event.target.result);
        document.querySelector("div#image_container").appendChild(img);
    };
    reader.readAsDataURL(event.target.files[0]);
}

function save() {
    let form_data = new FormData($('#upload-file')[0]);
    let comment = $("#comment").val();
    console.log(comment)
    form_data.append("comment_give", comment)

    $.ajax({
        type: 'POST',
        url: '/fileupload',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response['doc2'])
            let foodurl = response['doc2']['url']
            let name = response['doc2']['name']
            let comment = response['doc2']['comment']
            let category = response['doc2']['category']
            let emotion = response['doc2']['emotion']
            console.log(foodurl, name, comment)
            let temp_html = `<p class="question-style" style="margin-bottom: 10px;">END. 음식 추천 완료! </p>
                            <progress class="progress is-normal" value="100" max="100">100%</progress>
                            <div id="posting_result_img" style="background-image:url(${foodurl})"></div>
                            <div class="posting_result">
                                <p class="posting_title">당신의 추천 음식</p>
                                <p class="posting_foodname">${name}</p>
                                <p class="posting_comment">${comment}</p>
                                <p>
                                <span class="tag is-warning posting_tag" style="background-color: #FED7BF;">${name}</span>
                                <span class="tag is-warning posting_tag" style="background-color: #FED7BF;">존맛탱</span>
                                <span class="tag is-warning posting_tag" style="background-color: #FED7BF;">추천감사</span>
                                </p>
                            </div>
                            <div class="button-group-out">
                               <button class="button next-stage" onclick="window.location.href='/'">홈</button>
                            </div>
                            `
            let btnGroup = $('#button-group')
            btnGroup.empty()
            btnGroup.append(temp_html)
        },
    });
}