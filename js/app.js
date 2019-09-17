$(document).ready(function() {

console.log('App loaded');

let $bodyheight = 0;
const $contentMargin = ($('.hero .banner').outerHeight(true) /100) * 100;// 80 = standaard
function start() {
    $('.main-content .left .js-section').each(function() {
        $bodyheight += $(this).outerHeight(true);
    });
    $("body").css("height", + $bodyheight + $contentMargin + "px");
}

$(window).on('scroll', function() {
    let $view = $(this).scrollTop();
    TweenMax.to('.main-content', 1, {y: -$view, ease: Power3.easeOut});
});

var controller = new ScrollMagic.Controller();

TweenMax.set('.js-section', {yPercent: 30, autoAlpha: 0, ease: Power3.easeOut});

$('.js-section').each(function() {
	// build a scene
	var scene1 = new ScrollMagic.Scene({
		triggerElement: this,
        triggerHook: 0.8,
        duration: '0%'
	})
	.setTween(this, 1, {yPercent: 0, autoAlpha: 1, ease: Power3.easeOut})
	.addTo(controller);
});

var scene2 = new ScrollMagic.Scene({
	triggerElement: '.main-content',
    triggerHook: 0.6,
    duration: '60%'
})
.setTween('.hero', 1, {autoAlpha: 0, ease: Power3.easeOut})
.addTo(controller);

/*startload*/
const countI = document.querySelector('.count .inner');
const loader = document.querySelector('.loader');
const preLoader = document.querySelector('.preloader');
const progBar = document.querySelector('.progress-bar .inner');
var chars = ['A', 'C', 'H', 'O', 'E', 'N', 'D', 'O', 'V'];
var ranch;
let count = 0;
$('body').addClass('scroll-lock');
TweenMax.set(progBar, {
    xPercent: -100
});
TweenMax.set(countI, {
    yPercent: 100
});
if (!(preLoader.classList.contains('done'))) {
    setInterval(function() {
        var x = Math.floor(Math.random() * 8 + 1);
        ranch = chars[x];
        countI.innerHTML = "" + ranch + "";
        const rc = new TimelineMax({});
        rc.to(countI, 1, {
            yPercent: -100,
            ease: Power3.easeOut
        }).to(countI, 0, {
            yPercent: 100,
            autoAlpha: 0,
            ease: Power3.easeOut
        }).to(countI, 0, {
            autoAlpha: 1,
            ease: Power3.easeOut
        })
    }, 1000)
}
var barI = setInterval(bar, 50);

function bar() {
    count += 1;
    var countAmin = -100 + count;
    TweenMax.to(progBar, 1, {
        xPercent: countAmin,
        ease: Power3.easeOut
    });
    if (count == 80) {
        clearInterval(barI)
    }
}
$(window).on('load', function () {
	$(window).ready( function () {
		clearInterval(barI);
		const loadingDone = new TimelineMax({
			onComplete: preload
		});
		loadingDone.to(progBar, .4, {
			xPercent: 0,
			ease: Power3.easeOut
		}).to(loader, 1, {
			opacity: 0,
			ease: Power3.easeOut
		})
	});
});
var char = document.getElementsByClassName('char');
for (var i = 0; i < char.length; i += 1) {
    var charAll = char[i];
    TweenMax.set(charAll, {
        xPercent: -100,
        opacity: 0
    })
}
TweenMax.set('.main-content', {
    yPercent: 100,
	opacity: 0
});
TweenMax.set('.hero', {
    yPercent: 200
});
TweenMax.set('.scroll', {
    autoAlpha: 0,
    yPercent: 20
});
function preload() {
    TweenMax.to('.char', 1, {
        xPercent: 0,
        opacity: 1,
        ease: Power3.easeOut
    });
    setTimeout(function() {
        const preload = new TimelineMax({
            onComplete: function() {
                setTimeout(function() {
                    TweenMax.to('.main-content', 1.4, {
                        yPercent: 0,
						opacity: 1,
                        ease: Power3.easeOut
                    });
                    TweenMax.to('.hero', 1.4, {
                        yPercent: 0,
                        ease: Power3.easeOut
                    });
                    TweenMax.to('.scroll', 1, {
                        autoAlpha: 1,
                        yPercent: 0,
                        ease: Power3.easeOut
                    });
                    start();
                    $('body').removeClass('scroll-lock');
                }, 500)
            }
        });
        preload.staggerTo('.char', 1, {
            webkitFilter: "blur(1px)",
            ease: Power3.easeOut
        }, 0.1, "0").staggerTo('.char', 1, {
            opacity: 0,
            ease: Power3.easeOut,
            onComplete: function() {
                preLoader.classList.add('done')
            }
        }, 0.1, "0.1").set(preLoader, {
            autoAlpha: 0,
            onComplete: function() {
                preLoader.classList.add('done')
            }
        });
    }, 2000)
}

});
