$(document).ready(function () {
    $("#loader").hide();

    $(".sent").click(function (e) {
        e.preventDefault();
        $("#loader").show();

        let id = $(this).attr('data-id');

        $.post("/orders/replied", { id: id },
            function (data, textStatus, jqXHR) {
                $("body").html(data);
                $("#loader").hide();
            },
        )
    });

    
    $(".delivred").click(function (e) {
        e.preventDefault();
        $("#loader").show();

        let id = $(this).attr('data-id');

        $.post("/orders/delivred", { id: id },
            function (data, textStatus, jqXHR) {
                $("body").html(data);
                $("#loader").hide();
            },
        )
        
    });

});