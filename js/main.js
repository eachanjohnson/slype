// Slype main JavaScript file
function main () {
    var $slides = $('.slide');
    
    $slides.first().addClass('current-slide');
    $slides.first().next('.slide').addClass('next-slide');
    
    slideTransition();
    dataHandler($('.current-slide'));
} 

$(document).ready(function () {
    main();
});