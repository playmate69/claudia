$(document).ready(function() {

console.log('App loaded');

$(document).on('click', '.step-btn', function() {
    process($(this));
})

function process(el) {
            var activeStep = $('.step-unit.active');
    if(el.hasClass('prev')) {
        activeStep.prev().addClass('active');
        activeStep.removeClass('active');
    } else {
        activeStep.next().addClass('active');
        activeStep.removeClass('active');
    }
}

});
