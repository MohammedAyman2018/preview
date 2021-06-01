$(document).ready(function () {
    AOS.init();
    $("#loader").hide();

    $("#CloseFilters").click(function (e) {
        e.preventDefault();
        $('.filters').hide();
    })

    $("#openFilters").click(function (e) {
        e.preventDefault();
        $('.filters').show();
    });

    /** create slider on filters */
    $('.slider button').click(function (e) {
        $(this).next('ul').slideToggle()
    });

    let filter = {
        brand: [], // نوع
        color: [], // اللون
        screen: [], // حجم الشاشة
        cpu: [], // عائلة المعالج
        hard_Desk: [], // سعة القرص الصلب
        GPU: [], // ذاكرة كرت الشاشة
        ram: [], // حجم الذاكرة
        price_from: null,
        price_to: null
    };

    
    /** 
     * Search when any option choosed
     * Search by price search button 
    */
    $("#price_search, input:checkbox").click(function (e) { choose(e) });

    function get_products(filter) {
        $("#loader").show();
        $.ajax({
            type: "POST",
            url: "/ajaxdemo",

            data: filter,
            success: function (data) {
                console.log(data);
                $("#loader").hide();
                if (data.length == 0) {

                    return $('#content').html('<p class="text-center py-2"> لا يوجد أجهزة تحت هذه الفئة</p>');
                }

                $('#content').html('');

                data.forEach(lap => {
                    let template = `
                            <!-- Start Product Card -->
                            <div class="col-md-6 col-lg-4 mt-3" data-aos="fade-up"> 
                                <div class="product-card ">
                                    <a href="/laps/${lap.title.split(' ').join('-')}">
                                        <div class="product-card-tags d-flex mb-2">
                                            ${
                        (function fun() {
                            string = ""
                            lap.tags.forEach(tag => {
                                string += `<span class="badge badge-primary ml-1">${tag}</span>`
                            })
                            return string
                        }
                        )()
                        }
                                        </div>
                                        <div class="product-card-image">
                                            <img class="img-fluid" src='${lap.more_images[0]}' alt='${lap.title}'/>
                                        </div>
                                        <div class="product-card-details">
                                            <p class="product-card-title">${lap.title}</p>
                                        </div>
                                    </a>
                                    <div class="d-flex justify-content-between pl-5">
                                        <span class="product-card-price color">${lap.price}
                                            <sub>جنيه</sub>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- End Product Card -->
                        `;

                    $('#content').append(template);
                });
                $("#loader").hide();

            },
            error: function (jqXHR, textStatus, err) {
                //show error message
                alert('text status ' + textStatus + ', err ' + err)
            }
        });

    };

    function get_values() {
        /** Get all checked inputs */
        $('input:checkbox:checked, input[type="number"]').each(function () {
            /**  Get input name */
            let filter_name = $(this).attr('name');

            if (filter_name == "price_from") filter.price_from = this.value
            else if (filter_name == "price_to") filter.price_to = this.value
            else
                /** Push choosed filters */
                filter[filter_name].push(this.value);
        })
    }
    function choose(e) {

        get_values();
        get_products(filter);
        /** Reset */
        filter = {
            brand: [], // نوع
            color: [], // اللون
            screen: [], // حجم الشاشة
            cpu: [], // عائلة المعالج
            hard_Desk: [], // سعة القرص الصلب
            GPU: [], // ذاكرة كرت الشاشة
            ram: [], // حجم الذاكرة
            price: []
        }
    }

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    
    function processAjaxData(response, urlPath) {
        document.getElementById("content").innerHTML = response.html;
        document.title = response.pageTitle;
        window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", urlPath);
    }
}); 