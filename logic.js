//default values
var defaultPoms = 3;
var timerMinute = 25;
var timerSeconds = 0;
var startTime = timerMinute;
var timerInterval;

//selectors
var timerSelector = "#timer";

$(document).ready(function() {
    renderPomodoro(defaultPoms);
});

/*handle start button click event*/
$("#start").click(function() {
    timerInterval = setInterval(function(){
        if (timerMinute === 0 && timerSeconds === 0) {
            clearInterval(timerInterval);
            return;
        }

        if (timerSeconds === 0) {
            timerSeconds = 59;
            timerMinute -= 1;
        } else {
            timerSeconds -= 1;
        }

        if (timerSeconds < 10) {
            $(timerSelector).text(timerMinute + ":" + "0" + timerSeconds);

        } else {
            $(timerSelector).text(timerMinute + ":" + timerSeconds);
        }
    }, 1000);
});

/*handle pause button click event*/
$("#pause").click(function() {
    clearInterval(timerInterval);
});

/*handle refresh button click event*/
$("#restart").click(function() {
    clearInterval(timerInterval);
    timerMinute = startTime;
    timerSeconds = 0;
    $(timerSelector).text(timerMinute + ":" + "0" + timerSeconds);
});

/*handle pomodoro settings button clicks*/
$("button").click(function() {
    var value;
    var pomNum = "#pom-num";
    var workNum = "#work-num";
    var breakNum = "#break-num";
    var type = $(this).attr("id");
    switch (type) {
        case "pom-plus":
            value = parseInt($(pomNum).text()) + 1;
            if (value <= 5) {
                $(pomNum).text(value);
                renderPomodoro(value);
            }
            break;
        case "pom-minus":
            value = parseInt($(pomNum).text()) - 1;
            if (value >= 1) {
                $(pomNum).text(value);
                renderPomodoro(value);
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
            value = parseInt($(breakNum).text()) + 1;
            if (value <= 20) {
                $(breakNum).text(value);
            }
            break;
        case "break-minus":
            value = parseInt($(breakNum).text()) - 1;
            if (value >= 1) {
                $(breakNum).text(value);
            }
            break;
        default:
    }
});

function renderPomodoro(value) {
    var pomImage = "http://www.myiconfinder.com/uploads/iconsets/871cc5a8a5f00c21047fd7342403b4d3-tomato.png";
    var crushedImage = "https://cdn1.iconfinder.com/data/icons/Hooligans_Icons/250/Tomato.png";
    var pomId = "#pom-holder";

    //reset div
    $(pomId).html("");

    for (var i=0; i<value; i++) {
        $(pomId).append("<image class='pomodoro' id='pom-" + (value + 1) + "'" + "src='" + pomImage + "' alt='Pomodoro Tomato'>");
    }
}