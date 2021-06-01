$(document).ready(function () {
    let p = $('#more_info');
    p.html(p.attr('data-info'));
        
    AOS.init();

    $('.slider-for').slick({
        slidesToShow: 1,
        infinite: false,
        rtl: true,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-nav',
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        rtl: true,
        arrows: false,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
    });

    $('.carousel').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        rtl: true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                }
            }

        ]
    })

    $("#make_order").click(function (e) {
        e.preventDefault();       
            $.post('/orders/add', { lapTitle: $("#laptitle").text() }, 
                function(res){
                    $("#made_success").show();
                    $("#make_order").hide();
            }).fail(function(){
                console.log("error");
            });
    });

    
    $("#number").keyup(function (e) { 
        e.preventDefault();
        let value = $("#number").val();
        if(value.length < 11) {
            $("#phoneError").removeClass('d-none');
            $("#add_phone").addClass('disabled');
        } else {
            $("#phoneError").addClass('d-none');
            $("#add_phone").removeClass('disabled');
        }
    });

    $("#add_phone").click(function (e) {
        e.preventDefault();
    
        $.post('/users/phone', { 
            lapTitle: $("#laptitle").text(),
            phone: $("#number").val()
        }, 
        function(res){
            location.reload();
        }).fail(function(){
            console.log("error");
        });
    })
});