function get_posts() {
    $("#cards").empty()
    $.ajax({
        type: "GET",
        url: "/get_posts",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let posts = response["posts"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    console.log(post)
                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                    console.log(class_heart)
                    let count_heart = post['count_heart']
                    console.log(count_heart)
                    let html_temp = `
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="${post["url"]}" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <p class="title is-4">${post["name"]}</p>
                                    </div>
                                    <nav class="level is-mobile">
                                        <div class="level-left">
                                            <a class="level-item" aria-label="heart" onclick="toggle_like('${post['name']}')">
                                                <span class="icon is-small">
                                                    <i class="fa ${class_heart}" id="${post["name"]}" aria-hidden="true"></i>
                                                </span>&nbsp;
                                                <span class="like-num">${count_heart}</span>
                                            </a>
                                        </div>

                                    </nav>
                                </div>
                                </div>`
                    $("#cards").append(html_temp)
                }
            }
        }
    })
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function toggle_like(post_id) {
    console.log(post_id)
    let $a_like = $(`#${post_id} a[aria-label='heart']`)
    console.log($a_like)
    let $i_like = $a_like.find("i")
    console.log(typeof $i_like)
    console.log($i_like)
    if ($i_like.hasClass("fa-heart")) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                action_give: "unlike"
            },
            success: function (response) {
                if (response['result'] === 'fail') {
                    alert(response['msg'])
                } else {
                    console.log("unlike")
                    $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                    $a_like.find("span.like-num").text(num2str(response["count"]))
                }

            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                action_give: "like"
            },
            success: function (response) {
                if (response['result'] === 'fail') {
                    alert(response['msg'])
                } else {
                    console.log("like")
                    console.log($(`#${post_id}`))
                    $(`#${post_id}`).removeClass("fa-heart-o").addClass("fa-heart")
                    $a_like.find("span.like-num").text(num2str(response["count"]))
                }

            }
        })

    }
}