/**
 * Created by Dasuni Dissanayake on 28/12/2016.
 */
$(document).on('pageinit', function() {
    $(".owl-carousel").owlCarousel({
        responsive : true ,
        slideSpeed : 200,
        paginationSpeed : 400,
        singleItem: true,
        rewindSpeed: 500,
        loop:true,
        autoPlay:true,
        dots : true
    });
});

