var color = ["blue", "red", "yellow", "green"];
var userEntery = [];
var random = [];
var started = false;
var level = 0;

if (localStorage.getItem("score") == undefined) {
    $("#score").css("display", "none");
} else {
    $("#score").css("display", "block");
    $("#score").text(`Your Highest Score is ${localStorage.getItem('score')}`);
}


function update() {
    if (started) {
        $("h1").html(`Round  <span class="badge badge-primary" style="color:white">${level}</span>`);
        $("h1").attr("class", "text-primary")
    }
    else {
        if (level == 0) { $("h1").html(`Press <span class="badge badge-secondary">S</span> To Start The Game`); }
        $("h1").attr("class", "title")
    }

}
$(document).keypress(function (event) {
    if (!started) {
        if (event.key == "s" || event.key == "S") {
        }
        started = true;
        $("#score").css("display", "none");
        gen();
    }
})

$("#s").click(()=>{
    if (!started) {
        if (event.key == "s" || event.key == "S") {
        }
        started = true;
        $("#score").css("display", "none");
        gen();
    }
})


function gen() {
    userEntery = [];
    let temp = 0;
    level = level + 1;
    update();
    temp = Math.floor(Math.random() * (4 - 0) + 0);
    random.push(color[temp]);
    console.log(`${color[temp]}`)
    $(`#${color[temp]}`).attr("class", `btnk btnsw-${color[temp]}`);
    setTimeout(() => { $(`#${color[temp]}`).attr("class", `btnk btn-${color[temp]}`); }, 600);
}


$(".btnk").click(function () {
    let userInputColor = $(this).attr("id");
    userEntery.push(userInputColor);
    $(this).attr("class", "btnk btn-${userInputColor} pressed");
    setTimeout(() => { $(this).attr("class", `btnk btn-${userInputColor}`); }, 300);
    soundplay(userInputColor);
    checkAnswer(userEntery.length - 1);

})

function checkAnswer(currentlevel) {
    if (userEntery[currentlevel] == random[currentlevel]) {
        if (random.length - 1 == currentlevel) {
            gen();
        }
    } else {
        console.log("end");
        soundplay("wrong");
        $("body").css("background-color", "red");
        setTimeout(function () { $("body").css("background-color", "white"); }, 300);
        recordt();
        random = [];
        level = 0;
        userEntery = [];
        started = false;
        update();
    }
}


function soundplay(userInputColor) {
    var audio = new Audio("sounds/" + userInputColor + ".mp3");
    audio.play();
}

function recordt() {

    let prev = localStorage.getItem("score");
    if (prev == undefined) {

        $("#score").text(`Your Score is ${level}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
        localStorage.setItem("score", level);
    }
    if (level <= prev) {

        $("#score").html(`Your Score is ${level} keep trying<br>Highest Score ${prev}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);

    } else {

        $("#score").text(`Your Score Highest Score is ${level}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
        localStorage.setItem("score", level);
    }

}