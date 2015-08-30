// Slype handler for slide transitions

function goToNextSlide () {
    var $previousSlide = $('.previous-slide'),
        $currentSlide = $('.current-slide'),
        $nextSlide = $('.next-slide'),
        $nextNextSlide = $nextSlide.next('.slide');
    
    if ( $nextSlide.length > 0 ) {
        console.log( 'Moving forward one slide.' );
        $previousSlide.removeClass('previous-slide');
        $currentSlide.addClass('previous-slide');
        $currentSlide.removeClass('current-slide');
        $nextSlide.removeClass('next-slide');
        $nextSlide.addClass('current-slide');
        $nextNextSlide.addClass('next-slide');
        var slideNo = $('.current-slide').index() + 1;
        //window.history.pushState(null, null, slideNo);
        console.log('Currently on slide ' + slideNo);
        dataHandler($nextSlide);
        $currentSlide.find('svg.slype-graph').remove();
        return( $nextSlide )
    } else {
        console.log( 'Already on the last slide.' );
        return( $currentSlide )
    }
}

function goToPreviousSlide () {
    var $previousSlide = $('.previous-slide'),
        $currentSlide = $('.current-slide'),
        $nextSlide = $('.next-slide'),
        $previousPreviousSlide = $previousSlide.prev('.slide');
    
    if ( $previousSlide.length > 0 ) {
        console.log( 'Moving back one slide.' );
        $nextSlide.removeClass('next-slide');
        $currentSlide.addClass('next-slide');
        $currentSlide.removeClass('current-slide');
        $previousSlide.removeClass('previous-slide');
        $previousSlide.addClass('current-slide');
        $previousPreviousSlide.addClass('previous-slide');
        var slideNo = $('.current-slide').index() + 1;
        //window.history.pushState(null, null, slideNo);
        console.log('Currently on slide ' + slideNo);
        dataHandler($previousSlide);
        $currentSlide.find('svg.slype-graph').remove();
        return( $previousSlide )
    } else {
        console.log( 'Already on the first slide.' );
        return( $currentSlide )
    }
}

function toggleDark () {
    var $slides = $('.slide'),
        $body = $('body');
    
    $slides.toggle();
    $body.toggleClass('black-out');
};

function slideTransition () {
    // Listen for keyboard and act apprpriately
    var $body = $('body'),
        $window = $(window);
    
    $body.keyup(function ( event ) {
        var keyPressed = String.fromCharCode( event.which );
        console.log( 'User pressed ' + keyPressed );
        
        switch (keyPressed) {
            case ' ':
                goToNextSlide();
                break;
            case '&':  // up arrow
                goToPreviousSlide();
                break;
            case '(':  // down arrow
                goToNextSlide();
                break;
            case '%':  // left arrow
                goToPreviousSlide();
                break;
            case '\'':  // right arrow
                goToNextSlide();
                break;
            case 'B':  // right arrow
                toggleDark();
                break;
            default:
                console.log( 'Key pressed, but not taking any transition action' );
       }
    });
    
    $body.click(function ( event ) {
        goToNextSlide();
    });
    
    $window.on('swipeleft', goToNextSlide);
    $window.on('tap', goToNextSlide);
    $window.on('swiperight', goToPreviousSlide);
}