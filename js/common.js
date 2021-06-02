const colors = ['#9ea2ec', '#9ea2ec', '#9ea2ec', '#9ea2ec'];
const backgroundColor = '#EFEEF3';
const widthCanvas = Math.min(document.body.clientWidth, 2000);
const heightCanvas = Math.min(window.innerHeight, 435);
const totalFrames = 2000;
var frameCount = 0;


function easeInQuint(x) {
    return x * x * x;
}

function easeOutQuart(x) {
    return 1 - pow(1 - x, 4);
}

// function setup() {
//     var canvas = createCanvas(widthCanvas, heightCanvas);
//
//     canvas.parent("id-canvas");
//
//     noiseSeed(50);
//     var bg = color(backgroundColor);
//     background(bg);
// }
//
// function draw() {
//     frameCount += 4;
//
//     var frameDelta = 2 * Math.PI * (frameCount % totalFrames) / totalFrames;
//
//     var bg = color(backgroundColor);
//     background(bg);
//
//     var xStart = 0;
//     var yStart = 0;
//     var w = xStart + widthCanvas;
//     var h = yStart + heightCanvas;
//
//     var yDistance = 28;
//     var xDistance = 32;
//
//     for (var y = yStart; y < h; y += yDistance) {
//         for (var x = xStart; x < w; x += xDistance) {
//             var _x = x;
//
//             var noiseOffset = frameDelta;
//             var offsetY = noise(x * 0.01, -noiseOffset + y * 0.01) * 2.5;
//             offsetY = Math.pow(offsetY, 6);
//
//             var _y = y - Math.abs(Math.sin(frameDelta) * offsetY);
//
//             var size = Math.abs(Math.sin(frameDelta) * (offsetY / 20));
//             size = Math.max(size, 1.5);
//             //
//             // size = 1.5;
//
//             var pct = Math.abs(Math.sin(frameDelta) * (offsetY / 50));
//
//
//             var colorA = color(colors[0]);
//             var colorB = color(colors[3]);
//             var colorC = color(colors[2]);
//             pct = easeInQuint(pct);
//             var _color = lerpColor(colorA, colorB, pct);
//
//             var restPCT = Math.abs(Math.sin(frameDelta));
//             restPCT = easeOutQuart(restPCT);
//             _color = lerpColor(colorC, _color, restPCT);
//
//             strokeWeight(1);
//             stroke(_color);
//             fill(_color);
//
//             circle(_x, _y, size);
//         }
//     }
// }






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

        // breakpoints: {
        //     1199: {
        //
        //     },
        // },
    });

    document.querySelectorAll('.scrollbar').forEach(el => {
        new SimpleBar(el, {
            autoHide: false
        });
    });


    var width = $(window).width();

    $('.burger').click(function(){
        $('.burger').toggleClass('active');
        $('body').toggleClass('overflow-hide');
        $('.header').toggleClass('active');
        width = $(window).width();
    });



    $( window ).resize(function() {
        if(window.matchMedia('(max-width: 989px)').matches){
            if ($(window).width()==width) return;
            width = $(window).width();

            var mobileMenu = $('.header');
            if(mobileMenu.hasClass('active')){
                $('.burger').removeClass('active');
                $('body').removeClass('overflow-hide');
                $('.header').removeClass('active');
            }
        }
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


var downloadContainer = document.querySelector('.main-about__file');
var loopEnd = false;
var animation = lottie.loadAnimation({
    container: downloadContainer.querySelector('i'),
    path: '/data.json',
    renderer: 'svg',
    loop: true,
    autoplay: false,
});

animation.setSpeed(1.5);

downloadContainer.addEventListener("mouseenter", function () {
    // animation.setDirection(1);
    animation.play();
    loopEnd = false;
});
downloadContainer.addEventListener("mouseleave", function () {
    // animation.setDirection(-1);
    // animation.play();
    loopEnd = true;
});

// animation.addEventListener('enterFrame', function (e) {
//     if(e.currentTime >= e.totalTime-1 && loopEnd){
//         animation.goToAndStop(0);
//     }
// });

animation.addEventListener('loopComplete', function () {
    if (loopEnd) {
        animation.goToAndStop(0);
    }else{
        animation.play();
    }
});






