$(document).ready(function() {

    var DEFAULT_POMS = 3;
    renderPomodoro(DEFAULT_POMS);

});

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
            value = parseInt($(workNum).text()) + 5;
            if (value <= 90) {
                $(workNum).text(value);
            }
            break;
        case "work-minus":
            value = parseInt($(workNum).text()) - 5;
            if (value >= 5) {
                $(workNum).text(value);
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
    var pom = "http://www.myiconfinder.com/uploads/iconsets/871cc5a8a5f00c21047fd7342403b4d3-tomato.png";
    var pomId = "#pom-holder";

    //reset div
    $(pomId).html("");

    for (var i=0; i<value; i++) {
        $(pomId).append("<image class='pomodoro' id='pom-" + (value + 1) + "'" + "src='" + pom + "' alt='Pomodoro Tomato'>");
    }
}