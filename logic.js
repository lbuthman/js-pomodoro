$(document).ready(function() {

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
                }
                break;
            case "pom-minus":
                value = parseInt($(pomNum).text()) - 1;
                if (value >= 1) {
                    $(pomNum).text(value);
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
});
