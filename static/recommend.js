'use strict';

let base_codes = [];
let index = 0;
let select_values = [];

$(document).ready(function () {
    getBaseCode();
});

function getBaseCode() {
    $.ajax({
        type: "GET",
        url: "/base/codes",
        data: {},
        success: function (response) {
            base_codes = response;
        }
    })
}

function selectCode() {
    if()
}