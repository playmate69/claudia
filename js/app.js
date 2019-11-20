$(document).ready(function() {

console.log('App loaded');

var view;
$(document).on('scroll',  $(window), function() {
    view = $(window).scrollTop();
    $('.main-content').css('transform', 'translateY(-'+ view +'px)');
});

var mySwiper = new Swiper('.stream-slider', {
    speed: 400,
    initialSlide: 0,
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

mySwiper.on('slideChange', function () {
    document.querySelector('.swiper-button-prev').style.pointerEvents = "none";
    document.querySelector('.swiper-button-next').style.pointerEvents = "none";
    setTimeout(() => {
        document.querySelector('.swiper-button-prev').style.pointerEvents = "auto";
        document.querySelector('.swiper-button-next').style.pointerEvents = "auto";
    }, 400);
});



});
