$(document).ready(function () {
    AOS.init();

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
});