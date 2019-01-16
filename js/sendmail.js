/**
 * Created by user on 14/01/2017.
 */
function emailFavList() {
    var email = $('#favListEmail').val();
}

function getFavList() {
    var  formData = "name=ravi&age=31";  //Name value Pair
    or
    var formData = {name:"ravi",age:"31"}; //Array

        $.get("favoriteplaces.html", function(data){
            $(this).children("div:first").html(data);
        });
}

function  sendEmail() {
    var email = $('#favListEmail').val();
    emailjs.send("gmail", "railpara", {"toemail":email})
}

function  sendNewsletter() {
    var email = $('#newsletterEmail').val();
    emailjs.send("gmail", "railparanewsletter", {"newslettertoemail":email});
    $('#emailPopup').popup('close');
}

