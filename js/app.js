$(document).ready(function() {

console.log('App loaded');

var chat_wrap_h = $('.chat').outerHeight();
var chat_msg_box_h = $('.chat__msg-box').outerHeight();
$('.chat__wrap').css('height', chat_wrap_h - chat_msg_box_h + 'px');

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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

$(document).on('click',  '.chat__btn', function() {
    var msg = $('.chat__input').val();
    var rnd_count = Math.floor(Math.random() * (20.00 - 1.00 + 1.00 ));
    var name = ['Aaltje','Pientje','Christie','Jopie','Achmed','Walter','Cihan','Mijn vader','Freek','Diederick','Wensel','Wesley','Boldewijn','Lodewijck','Wim','Wum','Roos','christien','Okko','Frits']
    if(msg.length > 1) {
        $('.chat__wrap').append('<div class="chat__single a-flex"><span style="color:'+ getRandomColor() +';" class="chat__single__name"><strong>'+ name[rnd_count] +'</strong></span><span class="chat__single__msg">'+ msg +'</span></div>')
        $('.chat__input').val('');
    }
});




});
