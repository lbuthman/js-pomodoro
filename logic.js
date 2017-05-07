//default values
var timerMinute = 25;
var timerSeconds = 0;
var startTime = timerMinute;
var timerInterval;
var restMinutes = 25;
var restSeconds = 0;
var startRest = restMinutes;
var restInterval;
var RESTING = false;
var totalPoms = 3;
var crushedPoms = 0;
var WHOLE_IMAGE = "http://www.myiconfinder.com/uploads/iconsets/871cc5a8a5f00c21047fd7342403b4d3-tomato.png";
var CRUSHED_IMAGE = "https://cdn1.iconfinder.com/data/icons/Hooligans_Icons/250/Tomato.png";
var ON_COLOR = "#E83F6F"; //Paradise Pink
var REST_COLOR = "#1B998B"; //Jungle Green
var RESET_COLOR = "#313E50"; //Charcoal

//selectors
var timerSelector = "#timer";

$(document).ready(function() {
    renderPomodoro(totalPoms);
});

/*handle start button click event*/
$("#start").click(function() {

    if (RESTING) {
        restTimer();
    } else {
        workTimer();
    }

});

/*handle pause button click event*/
$("#pause").click(function() {
    clearInterval(timerInterval);
    clearInterval(restInterval);
});

/*handle refresh button click event*/
$("#restart").click(function() {
    resetTimer();
});

/*handle pomodoro settings button clicks*/
$("button").click(function() {
    var pomNum = "#pom-num";
    var workNum = "#work-num";
    var breakNum = "#break-num";
    var type = $(this).attr("id");
    switch (type) {
        case "pom-plus":
            totalPoms = parseInt($(pomNum).text()) + 1;
            if (totalPoms <= 5) {
                $(pomNum).text(totalPoms);
                renderPomodoro(totalPoms);
            }
            break;
        case "pom-minus":
            totalPoms = parseInt($(pomNum).text()) - 1;
            if (totalPoms >= 1) {
                $(pomNum).text(totalPoms);
                renderPomodoro(totalPoms);
            }
            break;
        case "work-plus":
            startTime = parseInt($(workNum).text()) + 5;
            timerMinute = startTime;
            if (startTime <= 90) {
                $(workNum).text(timerMinute);
                $(timerSelector).text(timerMinute + ":00");
            }
            break;
        case "work-minus":
            startTime = parseInt($(workNum).text()) - 5;
            timerMinute = startTime;
            if (startTime >= 5) {
                $(workNum).text(timerMinute);
                $(timer).text(timerMinute + ":00");
            }
            break;
        case "break-plus":
            startRest = parseInt($(breakNum).text()) + 1;
            restMinutes = startRest;
            if (restMinutes <= 20) {
                $(breakNum).text(restMinutes);
            }
            break;
        case "break-minus":
            startRest = parseInt($(breakNum).text()) - 1;
            restMinutes = startRest;
            if (restMinutes >= 1) {
                $(breakNum).text(restMinutes);
            }
            break;
        default:
    }
});

function workTimer() {

    if (totalPoms === crushedPoms) {
        finished();
        return;
    }

    $("#timer").css("background-color", ON_COLOR);
    updateWorkTimerText();

    timerInterval = setInterval(function(){
        if (timerMinute === 0 && timerSeconds === 0) {
            clearInterval(timerInterval);
            crushedPoms += 1;
            renderPomodoro(totalPoms);
            RESTING = true;
            restMinutes = startRest;
            restTimer();
        } else {
            if (timerSeconds === 0) {
                timerSeconds = 59;
                timerMinute -= 1;
            } else {
                timerSeconds -= 1;
            }

            updateWorkTimerText();
        }

    }, 1000);
}

function updateWorkTimerText() {
    if (timerSeconds < 10) {
        $(timerSelector).text(timerMinute + ":" + "0" + timerSeconds);
    } else {
        $(timerSelector).text(timerMinute + ":" + timerSeconds);
    }
}

function restTimer() {

    $("#timer").css("background-color", REST_COLOR);
    updateRestTimerText();

    restInterval = setInterval(function(){
        if (restMinutes === 0 && restSeconds === 0) {
            clearInterval(restInterval);
            RESTING = false;
            timerMinute = startTime;
            workTimer();
        } else {
            if (restSeconds === 0) {
                restSeconds = 59;
                restMinutes -= 1;
            } else {
                restSeconds -= 1;
            }

            updateRestTimerText();
        }

    }, 1000);
}

function updateRestTimerText() {
    if (restSeconds < 10) {
        $(timerSelector).text(restMinutes + ":" + "0" + restSeconds);
    } else {
        $(timerSelector).text(restMinutes + ":" + restSeconds);
    }
}

function resetTimer() {
    $("#timer").css("background-color", RESET_COLOR);
    clearInterval(timerInterval);
    clearInterval(restInterval);
    timerMinute = startTime;
    timerSeconds = 0;
    restMinutes = startRest;
    restSeconds = 0;
    $(timerSelector).text(timerMinute + ":" + "0" + timerSeconds);
}

function finished() {
    resetTimer();
    $(timerSelector).text("DONE!");
}

function renderPomodoro(value) {

    var pomId = "#pom-holder";
    var pomImage;
    var p = crushedPoms;

    //reset div
    $(pomId).html("");

    for (var i=0; i<value; i++) {
        if (p > 0) {
            pomImage = CRUSHED_IMAGE;
            p -= 1;
        } else {
            pomImage = WHOLE_IMAGE;
        }
        $(pomId).append("<image class='pomodoro' id='pom-" + (value + 1) + "'" + "src='" + pomImage + "' alt='Pomodoro Tomato'>");
    }
}