// const colors = ['#778DA9', '#1B263B', '#2C423F', '#E0E1DD'];
// const colors = ['#6455BF', '#393971', '#4b3f8e', '#8b6dff'];


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

function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);

    canvas.parent("id-canvas");

    noiseSeed(50);
    var bg = color(backgroundColor);
    background(bg);
}

function draw() {
    frameCount += 4;

    var frameDelta = 2 * Math.PI * (frameCount % totalFrames) / totalFrames;

    var bg = color(backgroundColor);
    background(bg);

    var xStart = 0;
    var yStart = 0;
    var w = xStart + widthCanvas;
    var h = yStart + heightCanvas;

    var yDistance = 28;
    var xDistance = 32;

    for (var y = yStart; y < h; y += yDistance) {
        for (var x = xStart; x < w; x += xDistance) {
            var _x = x;

            var noiseOffset = frameDelta;
            var offsetY = noise(x * 0.01, -noiseOffset + y * 0.01) * 2.5;
            offsetY = Math.pow(offsetY, 6);

            var _y = y - Math.abs(Math.sin(frameDelta) * offsetY);

            var size = Math.abs(Math.sin(frameDelta) * (offsetY / 20));
            size = Math.max(size, 1.5);
            //
            // size = 1.5;

            var pct = Math.abs(Math.sin(frameDelta) * (offsetY / 50));


            var colorA = color(colors[0]);
            var colorB = color(colors[3]);
            var colorC = color(colors[2]);
            pct = easeInQuint(pct);
            var _color = lerpColor(colorA, colorB, pct);

            var restPCT = Math.abs(Math.sin(frameDelta));
            restPCT = easeOutQuart(restPCT);
            _color = lerpColor(colorC, _color, restPCT);

            strokeWeight(1);
            stroke(_color);
            fill(_color);

            circle(_x, _y, size);
        }
    }
}


var timeline = gsap.timeline();

//
// timeline.to("#xxx",
//     {
//         y: -250,
//         x: -20,
//         ease: "none",
//         duration: 4,
//     })
//     // .to("#xxx2",
//     //     {
//     //         y: -250,
//     //         x: 10,
//     //         ease: "none",
//     //         duration: 4,
//     //         delay: -4,
//     //     })
//     // .to("#xxx3",
//     //     {
//     //         y: 100,
//     //         x: 20,
//     //         rotate: '90deg',
//     //         ease: "none",
//     //         duration: 4,
//     //         delay: -4,
//     //     })
//
// ;


// ScrollTrigger.create({
//     trigger: "#wrapper",
//     animation: timeline,
//     markers: true,
//     toggleClass: "active",
//     scrub: 1,
//     start: "0 bottom",
//     end: "bottom 0",
// });

// gsap.from("#title", {
//     scrollTrigger: {
//         trigger: "#title",
//         endTrigger: "#title",
//         markers: {startColor: "olive", endColor: "black", fontSize: "22px"},
//         toggleClass: "active",
//         scrub : 1.5,
//         start: "20% bottom",
//         end: "bottom 20%",
//     },
//     y: 0,
//     x: 200,
// });


function smoothScroll() {
    if ($(window).width() > 80) {

        const math = {
            lerp: (a, b, n) => {
                return (1 - n) * a + n * b
            },
            norm: (value, min, max) => {
                return (value - min) / (max - min)
            }

        }

        const config = {
            height: window.innerHeight,
            width: window.innerWidth
        }

        class Smooth {
            constructor() {
                this.bindMethods()

                this.data = {
                    ease: 0.145,
                    current: 0,
                    last: 0
                }

                this.dom = {
                    el: document.querySelector('[data-scroll]'),
                    content: document.querySelector('[data-scroll-content]')
                }

                this.rAF = null

                this.init()
            }

            bindMethods() {
                ['scroll', 'run', 'resize']
                    .forEach((fn) => this[fn] = this[fn].bind(this))
            }

            setStyles() {
                this.dom.el.style.position = 'fixed';
                this.dom.el.style.top = 0;
                this.dom.el.style.left = 0;
                this.dom.el.style.height = '100%';
                this.dom.el.style.width = '100%';
                this.dom.el.style.overflow = 'hidden';
            }

            setHeight() {
                document.body.style.height = `${this.dom.content.offsetHeight}px`
            }

            resize() {
                this.setHeight()
                this.scroll()
            }


            scroll() {
                this.data.current = window.scrollY
            }

            run() {
                this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)
                this.data.last = Math.floor(this.data.last * 100) / 100

                const diff = this.data.current - this.data.last
                const acc = diff / config.width
                const velo = +acc

                //console.log(velo)
                this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0) `


                //call pinned
                // pinned(this.data.last)

                this.requestAnimationFrame()
            }


            on(requestAnimationFrame = true) {
                this.setStyles()
                this.setHeight()
                this.addEvents()

                requestAnimationFrame && this.requestAnimationFrame()
            }

            off(cancelAnimationFrame = true) {
                cancelAnimationFrame && this.cancelAnimationFrame()

                this.removeEvents()
            }

            requestAnimationFrame() {
                this.rAF = requestAnimationFrame(this.run)
            }

            cancelAnimationFrame() {
                cancelAnimationFrame(this.rAF)
            }

            destroy() {
                document.body.style.height = ''

                this.data = null

                this.removeEvents()
                this.cancelAnimationFrame()
            }

            resize() {
                this.setHeight()
            }

            addEvents() {
                window.addEventListener('resize', this.resize, {passive: true})
                window.addEventListener('scroll', this.scroll, {passive: true})
            }

            removeEvents() {
                window.removeEventListener('resize', this.resize, {passive: true})
                window.removeEventListener('scroll', this.scroll, {passive: true})
            }

            init() {
                this.on()
            }
        }

        const smooth = new Smooth()
    }
}


$(window).on('load', function () {
    // smoothScroll();
});

timeline.from(".wrapper-content", {
    alpha: 0,
    duration: .5,
    ease: Power0.easeNone
})
    .to(".wrapper", {
        // y: 0,
        paddingTop: 0,
        duration: .5,
        delay: "-.5",
        ease: Power0.easeNone
    })
    .from(".main-banner__title", {
        x: 40,
        duration: .4,
        delay: "-.5",
        ease: Power0.easeNone
    })
    .from(".main-banner__price", {
        y: 0,
        x: 40,
        alpha: 0,
        duration: .4,
        delay: "-.3",
        ease: Power0.easeNone
    })
    .from(".main-banner__desc", {
        y: 0,
        x: 40,
        alpha: 0,
        duration: .4,
        delay: "-.4",
        ease: Power0.easeNone
    })

    .from(".main-banner__buttons", {
        x: 40,
        alpha: 0,
        duration: .4,
        delay: "-.2",
        ease: Power0.easeNone
    })
;


// gsap.timeline().to("#title", {
//     y: -60,
//     duration: 5,
//   ease:Power0.easeNone
// }).to("#title", {
//     y: 0,
//     duration: 5,
//   ease:Power0.easeNone
// }).repeat(-1);


var timeline2 = gsap.timeline();


// gsap.timeline().to(".block:nth-of-type(1)", {
//     y: -150,
//     duration: 5,
//     ease: Power0.easeNone
// })
//     .to(".block:nth-of-type(1)",
//         {
//             y: 0,
//             duration: 5,
//             ease: Power0.easeNone
//         })
//     .repeat(-1);
//
//
// gsap.timeline().to(".block:nth-of-type(2)", {
//     y: -50,
//     duration: 4,
//     ease: Power0.easeNone
// })
//     .to(".block:nth-of-type(2)",
//         {
//             y: 0,
//             duration: 4,
//             ease: Power0.easeNone
//         })
//     .repeat(-1);
//
//
// gsap.timeline().to(".block:nth-of-type(3)", {
//     y: -250,
//     duration: 4,
//     ease: Power0.easeNone
// })
//     .to(".block:nth-of-type(3)",
//         {
//             y: 0,
//             duration: 4,
//             ease: Power0.easeNone
//         })
//     .repeat(-1);


// timeline2.to(".block:nth-of-type(1)",
//     {
//         y: -150,
//         ease: "none",
//         duration: 4,
//     })
//     .to(".block:nth-of-type(2)",
//         {
//             y: -350,
//             ease: "none",
//             duration: 4,
//             delay: -4,
//         })
//     .to(".block:nth-of-type(3)",
//         {
//             y: -50,
//             rotate: '90deg',
//             ease: "none",
//             duration: 4,
//             delay: -4,
//         })
// ;
//
// ScrollTrigger.create({
//     trigger: ".main-banner",
//     animation: timeline2,
//     markers: true,
//     toggleClass: "active",
//     scrub: 1,
//             start: "20% bottom",
//         end: "bottom 20%",
// });


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


//     // $('.footer__up').click(function () {
//     //     $("html, body").stop().animate({scrollTop: 0}, 800);
//     // });
//
//
//     // $('.burger').click(function () {
//     //     $('body').toggleClass('modal-open');
//     //     $('.header__mobile-open').toggleClass('active');
//     // });
//
//
//     // $('.page table').wrap("<div class='scrollbar scrollbar--horizontal'></div>");
//     // document.querySelectorAll('.scrollbar').forEach(el => {
//     //     new SimpleBar(el, {
//     //         autoHide: false
//     //     });
//     // });

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
//
// document.querySelectorAll('[data-scroll]').forEach((el) => {
//     new SimpleBar(el, {
//         autoHide: false
//     });
// });


// if (window.location.pathname == '/') {
//     var animation = bodymovin.loadAnimation({
//         // container: document.getElementById('bm'),
//         container: document.querySelector('.animsition-loading'),
//         renderer: 'svg',
//         loop: true,
//         autoplay: true,
//         // path: directory_uri.stylesheet_directory_uri + '/data.json'
//         path: '/data.json'
//     });
// }

// var logo = document.querySelector('.animsition-loading');
//
// var animation = bodymovin.loadAnimation({
//     container: logo,
//     renderer: "svg",
//     loop: true,
//     autoplay: false,
//     prerender: true,
//     path: "/data.json"
// });

// logo.addEventListener("mouseenter", function () {
//     animation.play();
// });
//
// logo.addEventListener("mouseleave", function () {
//     animation.stop();
// });

var downloadContainer = document.querySelector('.main-about__file');
var curFrame;
var animation = lottie.loadAnimation({
    container: downloadContainer.querySelector('i'),
    // path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
    path: '/data.json',
    renderer: 'svg',
    loop: true,
    autoplay: false,
});

animation.setSpeed(1.5);
//
// downloadContainer.addEventListener('mouseenter', (e) => {
//     animation.goToAndPlay(0);
//
// });
// downloadContainer.addEventListener('mouseleave', (e) => {
//
//     animation.goToAndStop(0);
//
// });


// downloadContainer.addEventListener('mouseenter', fLaunch);
//
// function fLaunch() {
//     downloadContainer.removeEventListener('mouseenter', fLaunch);
//     animation.playSegments([curFrame,27], true);
//     downloadContainer.addEventListener('mouseleave', fReverse);
//     animation.onEnterFrame = fSaveFrame;
// }
//
// function fReverse() {
//     downloadContainer.removeEventListener('mouseleave', fReverse);
//     animation.playSegments([curFrame,0], false);
//     downloadContainer.addEventListener('mouseenter', fLaunch);
//     animation.onEnterFrame = fSaveFrame;
// }
//
// function fSaveFrame() {
//     curFrame = animation.currentFrame;
// }


var loopEnd;

downloadContainer.addEventListener("mouseenter", function () {
    animation.setDirection(1);
    animation.play();
    loopEnd = false;
});
downloadContainer.addEventListener("mouseleave", function () {
    animation.setDirection(-1);
    animation.play();
    loopEnd = true;
});


animation.addEventListener('loopComplete', function () {
    if (loopEnd) {
        animation.goToAndStop(0);
    } else{
        animation.play();

    }
});






