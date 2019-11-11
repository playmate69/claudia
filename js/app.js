$(document).ready(function() {

console.log('App loaded');

var view;
$(document).on('scroll',  $(window), function() {
    view = $(window).scrollTop();
    $('.main-content').css('transform', 'translateY(-'+ view +'px)');
});

var mySwiper = new Swiper('.stream-slider', {
    speed: 400,
    initialSlide: 2,
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

mySwiper.on('slideChange', function () {
    $.each([$('.swiper-button-next'), $('.swiper-button-prev')], function(i, v) {
        console.log(i + ' : ' + v.attr('id'));
    });
});



});
