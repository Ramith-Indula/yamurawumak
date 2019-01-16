/**
 * Created by Dasuni Dissanayake on 11/01/2017.
 */
$(document).on('pageinit', function() {
    $('.return-trip').hide();
    $('#return-trip').on ('click', function (e) {
        $(this).prop('checked')===true?$('.return-trip').stop().fadeIn():$('.return-trip').stop().fadeOut();
    })
});


