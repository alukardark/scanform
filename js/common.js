"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const colors = ['#778DA9', '#1B263B', '#2C423F', '#E0E1DD'];
// const colors = ['#6455BF', '#393971', '#4b3f8e', '#8b6dff'];
var colors = ['#a0a3ee', '#393971', '#4b3f8e', '#9598eb'];
var backgroundColor = '#EFEEF3';
var widthCanvas = Math.min(document.body.clientWidth, 2000);
var heightCanvas = Math.min(window.innerHeight, 500);
var totalFrames = 2000;
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
  var yDistance = 35;
  var xDistance = 35;

  for (var y = yStart; y < h; y += yDistance) {
    for (var x = xStart; x < w; x += xDistance) {
      var _x = x;
      var noiseOffset = frameDelta;
      var offsetY = noise(x * 0.01, -noiseOffset + y * 0.01) * 2.5;
      offsetY = Math.pow(offsetY, 6);

      var _y = y - Math.abs(Math.sin(frameDelta) * offsetY);

      var size = Math.abs(Math.sin(frameDelta) * (offsetY / 20));
      size = Math.max(size, 1.5); //
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

var timeline = gsap.timeline(); //
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
    var math = {
      lerp: function lerp(a, b, n) {
        return (1 - n) * a + n * b;
      },
      norm: function norm(value, min, max) {
        return (value - min) / (max - min);
      }
    };
    var config = {
      height: window.innerHeight,
      width: window.innerWidth
    };

    var Smooth = /*#__PURE__*/function () {
      function Smooth() {
        _classCallCheck(this, Smooth);

        this.bindMethods();
        this.data = {
          ease: 0.145,
          current: 0,
          last: 0
        };
        this.dom = {
          el: document.querySelector('[data-scroll]'),
          content: document.querySelector('[data-scroll-content]')
        };
        this.rAF = null;
        this.init();
      }

      _createClass(Smooth, [{
        key: "bindMethods",
        value: function bindMethods() {
          var _this = this;

          ['scroll', 'run', 'resize'].forEach(function (fn) {
            return _this[fn] = _this[fn].bind(_this);
          });
        }
      }, {
        key: "setStyles",
        value: function setStyles() {
          this.dom.el.style.position = 'fixed';
          this.dom.el.style.top = 0;
          this.dom.el.style.left = 0;
          this.dom.el.style.height = '100%';
          this.dom.el.style.width = '100%';
          this.dom.el.style.overflow = 'hidden';
        }
      }, {
        key: "setHeight",
        value: function setHeight() {
          document.body.style.height = "".concat(this.dom.content.offsetHeight, "px");
        }
      }, {
        key: "resize",
        value: function resize() {
          this.setHeight();
        }
      }, {
        key: "scroll",
        value: function scroll() {
          this.data.current = window.scrollY;
        }
      }, {
        key: "run",
        value: function run() {
          this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease);
          this.data.last = Math.floor(this.data.last * 100) / 100;
          var diff = this.data.current - this.data.last;
          var acc = diff / config.width;
          var velo = +acc; //console.log(velo)

          this.dom.content.style.transform = "translate3d(0, -".concat(this.data.last.toFixed(0), "px, 0) "); //call pinned
          // pinned(this.data.last)

          this.requestAnimationFrame();
        }
      }, {
        key: "on",
        value: function on() {
          var requestAnimationFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.setStyles();
          this.setHeight();
          this.addEvents();
          requestAnimationFrame && this.requestAnimationFrame();
        }
      }, {
        key: "off",
        value: function off() {
          var cancelAnimationFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          cancelAnimationFrame && this.cancelAnimationFrame();
          this.removeEvents();
        }
      }, {
        key: "requestAnimationFrame",
        value: function (_requestAnimationFrame) {
          function requestAnimationFrame() {
            return _requestAnimationFrame.apply(this, arguments);
          }

          requestAnimationFrame.toString = function () {
            return _requestAnimationFrame.toString();
          };

          return requestAnimationFrame;
        }(function () {
          this.rAF = requestAnimationFrame(this.run);
        })
      }, {
        key: "cancelAnimationFrame",
        value: function (_cancelAnimationFrame) {
          function cancelAnimationFrame() {
            return _cancelAnimationFrame.apply(this, arguments);
          }

          cancelAnimationFrame.toString = function () {
            return _cancelAnimationFrame.toString();
          };

          return cancelAnimationFrame;
        }(function () {
          cancelAnimationFrame(this.rAF);
        })
      }, {
        key: "destroy",
        value: function destroy() {
          document.body.style.height = '';
          this.data = null;
          this.removeEvents();
          this.cancelAnimationFrame();
        }
      }, {
        key: "addEvents",
        value: function addEvents() {
          window.addEventListener('resize', this.resize, {
            passive: true
          });
          window.addEventListener('scroll', this.scroll, {
            passive: true
          });
        }
      }, {
        key: "removeEvents",
        value: function removeEvents() {
          window.removeEventListener('resize', this.resize, {
            passive: true
          });
          window.removeEventListener('scroll', this.scroll, {
            passive: true
          });
        }
      }, {
        key: "init",
        value: function init() {
          this.on();
        }
      }]);

      return Smooth;
    }();

    var smooth = new Smooth();
  }
}

$(window).on('load', function () {// smoothScroll();
});
timeline.from(".wrapper-content", {
  alpha: 0,
  duration: .5,
  ease: Power0.easeNone
}).from(".wrapper-content", {
  y: 40,
  duration: .5,
  delay: "-.5",
  ease: Power0.easeNone
}).from("#title", {
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
}); // gsap.timeline().to("#title", {
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
}).to(".block:nth-of-type(1)", {
  y: 0,
  duration: 5,
  ease: Power0.easeNone
}).repeat(-1);
gsap.timeline().to(".block:nth-of-type(2)", {
  y: -50,
  duration: 4,
  ease: Power0.easeNone
}).to(".block:nth-of-type(2)", {
  y: 0,
  duration: 4,
  ease: Power0.easeNone
}).repeat(-1);
gsap.timeline().to(".block:nth-of-type(3)", {
  y: -250,
  duration: 4,
  ease: Power0.easeNone
}).to(".block:nth-of-type(3)", {
  y: 0,
  duration: 4,
  ease: Power0.easeNone
}).repeat(-1); // timeline2.to(".block:nth-of-type(1)",
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