jQuery(document).ready(function ($) {

    $("input[type='tel']").inputmask({"mask": "+7(999) 999-9999"});

    new Swiper('.main-result .swiper-container', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 2,
        speed: 600,
        // autoHeight: true,
        // autoplay: {
        //     delay: 3000
        // },
        navigation: {
            nextEl: '.main-result .main-result__next',
            prevEl: '.main-result .main-result__prev',
        },

        breakpoints: {
            989: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
        },
    });

    new Swiper('.main-clients .swiper-container', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 600,
        // autoHeight: true,
        // autoplay: {
        //     delay: 3000
        // },
        navigation: {
            nextEl: '.main-clients .main-clients__next',
            prevEl: '.main-clients .main-clients__prev',
        },

        breakpoints: {
            989: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 1,
            },
        },
    });



    $(".main-clients__img[data-fancybox]").fancybox({
        afterShow: function( instance, slide ) {

            new Swiper('.fancy-modal__review .swiper-container', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                loopFillGroupWithBlank: true,
                speed: 800,
                pagination: {
                    el: '.fancy-modal__review .swiper-nav-info',
                    type: "fraction",
                },
                navigation: {
                    nextEl: '.fancy-modal__next',
                    prevEl: '.fancy-modal__prev',
                },
            });

        }
    });



    document.querySelectorAll('.scrollbar').forEach(el => {
        new SimpleBar(el, {
            autoHide: false
        });
    });

    var width = $(window).width();

    $('.burger').click(function () {
        $('.burger').toggleClass('active');
        $('body').toggleClass('overflow-hide');
        $('.header').toggleClass('active');

        width = $(window).width();
    });


    $(window).resize(function () {
        if (window.matchMedia('(max-width: 989px)').matches) {
            if ($(window).width() == width) return;
            width = $(window).width();

            var mobileMenu = $('.header');
            if (mobileMenu.hasClass('active')) {
                $('.burger').removeClass('active');
                $('body').removeClass('overflow-hide');
                $('.header').removeClass('active');
            }
        }
    });


    $('input[type=radio]').parent('span').addClass('radio-wrap');
    $('input[value=zoom], input[value=Zoom]').parent('span').addClass('zoom-ico');
    $('input[value=skype], input[value=Skype]').parent('span').addClass('skype-ico');

    $('input[type=radio]').click(function(){
        $(this).parents('form').find('span').removeClass('active');
        $(this).parent('span').addClass('active');
    });



});


if (document.querySelector('.js-choice') !== null) {
    const choices = new Choices('.js-choice', {
        itemSelectText: '',
        loadingText: 'Загрузка...',
        searchEnabled: false,
        shouldSort: false
    });

    document.querySelectorAll('.js-choice').forEach((el) => {
        el.addEventListener(
            'showDropdown',
            function (event) {
                new SimpleBar(el.parentNode.nextSibling.querySelector('.choices__list--dropdown .choices__list'), {
                    autoHide: false
                });
            },
            false,
        );
    });
}


var downloadContainer = document.querySelectorAll('.main-about__file');
var loopEnd = false;
var animation = '';
var i = 1;

downloadContainer.forEach(el => {
    if (i == 1) {
        animation = lottie.loadAnimation({
            container: el.querySelector('i'),
            path: '/data.json',
            renderer: 'svg',
            loop: true,
            autoplay: false,
        });

        animation.setSpeed(1.5);

        el.addEventListener("mouseenter", function () {
            animation.play();
            loopEnd = false;
        });
        el.addEventListener("mouseleave", function () {
            loopEnd = true;
        });

        animation.addEventListener('loopComplete', function () {
            if (loopEnd) {
                animation.goToAndStop(0);
            } else {
                animation.play();
            }
        });
    }else{
        animation2 = lottie.loadAnimation({
            container: el.querySelector('i'),
            path: '/data.json',
            renderer: 'svg',
            loop: true,
            autoplay: false,
        });

        animation2.setSpeed(1.5);

        el.addEventListener("mouseenter", function () {
            animation2.play();
            loopEnd = false;
        });
        el.addEventListener("mouseleave", function () {
            loopEnd = true;
        });

        animation2.addEventListener('loopComplete', function () {
            if (loopEnd) {
                animation2.goToAndStop(0);
            } else {
                animation2.play();
            }
        });
    }
    i++;
});










