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
Barba.Pjax.start();


var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

});
