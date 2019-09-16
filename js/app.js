$(document).ready(function() {

console.log('App loaded');
    
let $bodyheight = 0;
function start() {
    $('.main-content .left .js-section').each(function() {
        $bodyheight += $(this).outerHeight(true);
    });
    $("body").css("height", +$bodyheight + ($(window).height() /50 * 100) + "px");
}
    
start();
    
$(window).on('scroll', function() {
    let $view = $(this).scrollTop();
    
    TweenMax.to('.main-content', 1, {y: -$view, ease: Power3.easeOut});
    
    
});
    
var controller = new ScrollMagic.Controller();

TweenMax.set('.js-section', {yPercent: 10, opacity: 0, ease: Power3.easeOut});
    
$('.js-section').each(function() {
	// build a scene
	var scene1 = new ScrollMagic.Scene({
		triggerElement: this,
        triggerHook: 0.8,
        duration: '0%'
	})
	.setTween(this, 1, {yPercent: 0, opacity: 1, ease: Power3.easeOut}) 
	.addTo(controller);
});

});
