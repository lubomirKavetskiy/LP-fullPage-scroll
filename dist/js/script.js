"use strict";

function animatingReloader() {
    setTimeout(function () {
        $(".preloader__logo-box>span").addClass("move")
    }, 500);

    setInterval(function () {
        var r = Math.floor(Math.random() * 255) + 1,
            g = Math.floor(Math.random() * 255) + 1,
            b = Math.floor(Math.random() * 255) + 1;

        $(".preloader__logo-box>span").css({"background-color": "rgba(" + r + "," + g + "," + b + ",1)"})
    }, 500);
}

// ================================ //

function wowStart() {
    new WOW().init();
}

// ================================ //
function handlePreloader(timeIterPreloader) {
    if ($('.preloader').length) {
        $('.preloader__logo-box').delay(timeIterPreloader-400).fadeOut(600);
        $('.preloader').delay(timeIterPreloader).fadeOut(700);

        // WOW.js (Animate on scroll library) https://github.com/matthieua/WOW
        setTimeout(function() {wowStart()}, timeIterPreloader);

        setTimeout(function() {fullpageStart();}, timeIterPreloader);
    }
}
// ================================ //


// ====== fixed navigation ======= //
function fixedNavigation(valueScroll) {
    if($(".header").length) {

        var tempScrollTop,
            currentScrollTop = 0;

        $(window).scroll(function () {

            currentScrollTop = $(this).scrollTop();

            if ((tempScrollTop < currentScrollTop) && (currentScrollTop > valueScroll) && ($(window).width() < 768)) {
                $(".header").slideUp(300, function() {
                    $(".header").stop(true, true);
                });
            }
            else if (tempScrollTop > currentScrollTop) {
                $(".header").slideDown(300);
            }
            tempScrollTop = currentScrollTop;
        });
    }
}
// ================================ //

// ====== toggle navigation ======= //
function toggleNavigation() {
    $(".navigation__hamburger").click(function () {
        const $this = $(this);

        $this.toggleClass('active');
        $('.navigation__list').toggleClass('fadeIn-flex');
        $('.header').toggleClass('backgroundHeader-fadeIn');
        $('.navigation__item a').css({'color': '#FFF'});

        $(".navigation__hamburger").hasClass("active") ?
            $('body, html').each(function () {
                this.style.setProperty('overflow', 'hidden', 'important');
            })
            :
            $('body, html').each(function () {
                this.style.setProperty('overflow', 'visible', 'important');
            })
    });

    $(".navigation__list a, .logo").click(function () {
        if ($(".navigation__hamburger").hasClass("active")) {
            $(".navigation__hamburger").trigger('click');
        }
    });
}
// ================================ //


// ====== delete ScrollBar ======= //
function deleteScrollBar() {
    $('body, html').each(function () {
        this.style.setProperty('overflow', 'hidden', 'important');
    });
}
// ================================ //


// ====== add ScrollBar ======= //
function addScrollBar() {
    $('body, html').each(function () {
        this.style.setProperty('overflow', 'visible', 'important');
    });
}
// ================================ //

// fullPage.js (Full screen pages library) https://github.com/alvarotrigo/fullPage.js
function fullpageStart() {
    console.log('start');
    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],

        //Scrolling
        css3: true,
        scrollingSpeed: 300,
        easingcss3: 'ease-in',
        sectionsColor: ['transparent', '#212121', 'transparent', '#FFF'],
        responsiveWidth: 768,
        scrollBar: true,

        //Events
        onLeave: function (index, nextIndex, direction) {
                var leavingSection = $(this);

                if (nextIndex == 2) {
                    $('.second-page__img').addClass('fadeIn');
                    setTimeout(function () {
                        $('.second-page__img').addClass('slide-top');
                    }, 1000);

                    $('.second-page__text').addClass('fadeIn');
                }

                else if (nextIndex == 3) {
                    $('.third-page .section__container').addClass('fadeInDown');
                }

                else if (nextIndex == 4) {
                    $('.header').addClass('backgroundTransparent');
                    $('.logo').css({"background-position": "bottom center"});

                    if($('.fourth-page__second-half').hasClass('slide-left-from-side')) {
                        $('.navigation__item a').css({'color': '#FFF'});
                    } else {
                        $('.navigation__item a').css({'color': '#666'});
                    }

                    $('.fourth-page__first-half').addClass('fadeIn-flex');
                    setTimeout(function() {
                        $('.fourth-page__first-half').addClass('slide-left-from-center');
                    }, 1000);

                    $('.fourth-page__second-half').addClass('slide-left-from-side', function() {
                        setTimeout(function() {$('.navigation__item a').css({'color': '#FFF'});}, 2000);
                    });
                    setTimeout(function() {
                        $('.contact-form').addClass('fadeIn-flex');
                    }, 3100);
                }
        },

        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);

            if (index == 1 || index == 2 || index == 3) {
                $('.header').removeClass('backgroundTransparent');
                $('.logo').css({"background-position": "top center"});
                $('.navigation__item a').css({'color': '#FFF'});
            }
        },

        afterResponsive: function(isResponsive){
            if(isResponsive) {
                fixedNavigation(100);
            }

            if(isResponsive) {
                if($(".navigation__hamburger").hasClass("active")) {
                   deleteScrollBar();
                }
                else {
                    addScrollBar();
                }
            }
        }
    });
}
// ================================ //


// === DOCUMENT READY === //
$(document).ready(function () {

    $(".preloader__logo-box>img").fadeIn(2000);

    animatingReloader();

    toggleNavigation();
});
// ================================ //


// ===  WINDOW LOAD === //
$(window).on("load", function () {
    handlePreloader(5500);
});
// ================================ //



















// function fullpageStart() {
//
//     $('#fullpage').fullpage({
//         //Navigation
//         menu: '#menu',
//         anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
//         scrollOverflow: true,
//
//         //Scrolling
//         css3: true,
//         scrollingSpeed: 200,
//         easingcss3: 'ease-in',
//         sectionsColor: ['transparent', '#212121', 'transparent', '#FFF'],
//
//         onLeave: function (index, nextIndex, direction) {
//
//                 var leavingSection = $(this);
//                 if (nextIndex == 2) {
//                     $.fn.fullpage.reBuild();
//                     setTimeout(function () {
//                         $('.second-page__img').addClass('fadeIn');
//                         $('.second-page__text').delay(800).slideDown(600, function () {
//                             $('.second-page__text').css({'opacity': '1'});
//                         });
//                     }, 1000);
//                 } else if (nextIndex == 3) {
//                     setTimeout(function () {
//                         $('.third-page .section__container').addClass('fadeInDown');
//                     }, 1000);
//                 } else if (nextIndex == 4) {
//                     if ($('.contact-form').hasClass('fadeIn')) {
//                         $('.logo').css({"background-position": "bottom center"});
//                         $('.navigation__item a').css({'color': '#FFF'});
//                         $('.header').toggleClass('backgroundNone').toggleClass('backgroundHeader');
//                     } else {
//                         $('.logo').css({"background-position": "bottom center"});
//                         $('.navigation__item a').css({'color': '#666'});
//                         $('.header').addClass('backgroundNone');
//                         setTimeout(function () {
//                             $('.fourth-page__container').addClass('fadeIn');
//                             setTimeout(function () {
//                                 if (windowWidth > 767) {
//                                     $('.fourth-page__first-half').addClass('halfFirstWidth');
//                                     $('.fourth-page__second-half').addClass('halfSecondWidth');
//                                     $('.navigation__item a').css({'color': '#FFF'});
//                                     setTimeout(function () {
//                                         $('.contact-form').addClass('fadeIn');
//                                     }, 1200);
//                                 } else {
//                                     $('.fourth-page__first-half').addClass('halfFirstHeight');
//                                     $('.fourth-page__second-half').addClass('halfSecondHeight');
//                                     $('.navigation__item a').css({'color': '#666'});
//                                     setTimeout(function () {
//                                         $('.contact-form').addClass('fadeIn');
//                                     }, 1200);
//                                 }
//                             }, 1000);
//                         }, 1000);
//                     }
//
//                 }
//                 if (index == 4 && direction == 'up') {
//                     $('.logo').css({"background-position": "top center"});
//                     $('.navigation__item a').css({'color': '#FFF'});
//                     $('.header').removeClass('backgroundNone').addClass('backgroundHeader');
//                 } else if (index == 2) {
//                     // $('.second-page').removeClass('moreOpacity');
//                 }
//             // }
//         }
//
//     });
// }

// $(window).resize(function() {
//     var windowWidth = $(window).width();
//     if(windowWidth < 767) {
//         $('.navigation__item a').css({'color': '#666'});
//     }
//     if($('.fourth-page__first-half').hasClass('halfFirstHeight') && windowWidth > 767){
//         $('.fourth-page__first-half, .fourth-page__second-half').toggleClass('height100');
//         // $('.fourth-page__container fadeIn').css('min-height', '100vh');
//
//     }else if($('.fourth-page__first-half').hasClass('halfFirstWidth') && windowWidth < 767){
//         $('.fourth-page__first-half, .fourth-page__second-half').addClass('width100');
//         $('.fourth-page__first-half').addClass('height30');
//         $('.fourth-page__second-half').addClass('height70');
//     }
// });
















