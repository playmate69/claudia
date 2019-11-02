$(document).ready(function() {

console.log('App loaded');

var view;
$(document).on('scroll',  $(window), function() {
    view = $(window).scrollTop();
    $('.main-content').css('transform', 'translateY(-'+ view +'px)');
});



});
