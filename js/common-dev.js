// const colors = ['#778DA9', '#1B263B', '#2C423F', '#E0E1DD'];
// const colors = ['#6455BF', '#393971', '#4b3f8e', '#8b6dff'];

const colors = ['#a0a3ee', '#393971', '#4b3f8e', '#9598eb'];
const backgroundColor = '#EFEEF3';
const widthCanvas = Math.min(document.body.clientWidth, 2000);
const heightCanvas = Math.min(window.innerHeight, 500);
const totalFrames = 2000;
let frameCount = 0;


function easeInQuint(x) {
    return x * x * x;
}

function easeOutQuart(x) {
    return 1 - pow(1 - x, 4);
}

function setup() {
    let canvas = createCanvas(widthCanvas, heightCanvas);

    canvas.parent("id-canvas");

    noiseSeed(50);
    let bg = color(backgroundColor);
    background(bg);
}

function draw() {
    frameCount += 4;

    let frameDelta = 2 * Math.PI * (frameCount % totalFrames) / totalFrames;

    let bg = color(backgroundColor);
    background(bg);

    let xStart = 0;
    let yStart = 0;
    let w = xStart + widthCanvas;
    let h = yStart + heightCanvas;

    let yDistance = 35;
    let xDistance = 35;

    for (let y = yStart; y < h; y += yDistance) {
        for (let x = xStart; x < w; x += xDistance) {
            let _x = x;

            let noiseOffset = frameDelta;
            let offsetY = noise(x * 0.01, -noiseOffset + y * 0.01) * 2.5;
            offsetY = Math.pow(offsetY, 6);

            let _y = y - Math.abs(Math.sin(frameDelta) * offsetY);

            let size = Math.abs(Math.sin(frameDelta) * (offsetY / 20));
            size = Math.max(size, 1.5);
            //
            // size = 1.5;

            let pct = Math.abs(Math.sin(frameDelta) * (offsetY / 50));


            let colorA = color(colors[0]);
            let colorB = color(colors[3]);
            let colorC = color(colors[2]);
            pct = easeInQuint(pct);
            let _color = lerpColor(colorA, colorB, pct);

            let restPCT = Math.abs(Math.sin(frameDelta));
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
    .from(".wrapper-content", {
        y: 40,
        duration: .5,
        delay: "-.5",
        ease: Power0.easeNone
    })
    .from("#title", {
        x: 40,
        duration: .4,
        delay: "-.5",
        ease: Power0.easeNone
    }).from("#desc", {
    y: 0,
    x: 40,
    alpha: 0,
    duration: .4,
    delay: "-.3",
    ease: Power0.easeNone
}).from(".main-banner__buttons", {
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


gsap.timeline().to(".block:nth-of-type(1)", {
    y: -150,
    duration: 5,
    ease: Power0.easeNone
})
    .to(".block:nth-of-type(1)",
        {
            y: 0,
            duration: 5,
            ease: Power0.easeNone
        })
    .repeat(-1);


gsap.timeline().to(".block:nth-of-type(2)", {
    y: -50,
    duration: 4,
    ease: Power0.easeNone
})
    .to(".block:nth-of-type(2)",
        {
            y: 0,
            duration: 4,
            ease: Power0.easeNone
        })
    .repeat(-1);


gsap.timeline().to(".block:nth-of-type(3)", {
    y: -250,
    duration: 4,
    ease: Power0.easeNone
})
    .to(".block:nth-of-type(3)",
        {
            y: 0,
            duration: 4,
            ease: Power0.easeNone
        })
    .repeat(-1);





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


//
// jQuery(document).ready(function ($) {
//
//     // $("input[type='tel']").inputmask({"mask": "+7(999) 999-9999"});
//
//
//     // var certificatesSwiper = new Swiper('.certificates-slider__slider .swiper-container', {
//     //     loop: false,
//     //     slidesPerView: 5,
//     //     spaceBetween: 24,
//     //     speed: 600,
//     //      // autoHeight: true,
//     //     // autoplay: {
//     //     //     delay: 3000
//     //     // },
//     //     navigation: {
//     //         nextEl: '.certificates-slider__slider .certificates-slider__slider-next',
//     //         prevEl: '.certificates-slider__slider .certificates-slider__slider-prev',
//     //     },
//     //       pagination: {
//     //         el: '.main__slider .swiper-pagination',
//     //         type: 'bullets',
//     //         clickable: true,
//     //     },
//     //     breakpoints: {
//     //         1199: {
//     //             spaceBetween: 24,
//     //             slidesPerView: 4,
//     //         },
//     //         989: {
//     //             spaceBetween: 24,
//     //             slidesPerView: 3,
//     //         },
//     //         767: {
//     //             spaceBetween: 24,
//     //             slidesPerView: 2,
//     //         },
//     //         575: {
//     //             spaceBetween: 24,
//     //             slidesPerView: 1,
//     //         }
//     //     },
//     // });
//
//
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
//
//
//
//
//
//
//
//
// });



