function validateUsername() {
    var msg1;
    var username = $('#username').val();
    if (username == '') {
        // msg1 = "Username Cannot be empty";
        // return false;
        $("#footer").hide();
        $("#message").html("Username Cannot be empty");
        $("#message").show();
        $("#username").css("border", "1px #FF0000 solid");
        setTimeout(function () {
            $("#message").hide();
            $("#footer").show();
            $("#username").css("border", "none");

        }, 3000);
    }
    else {
        return true;
    }
}
function validateEmailAdd() {

    var email = $('#email').val();
    if (email == '') {

        $("#footer").hide();
        $("#message").html("Email address Cannot be empty");
        $("#message").show();
        $("#email").css("border", "1px #FF0000 solid");
        setTimeout(function () {
            $("#message").hide();
            $("#footer").show();
            $("#email").css("border", "none");

        }, 3000);
    }
    else {
        if (isMail(email) == false) {
            
            $("#footer").hide();
            $("#message").html("Email address isn't valid!");
            $("#message").show();
            $("#email").css("border", "1px #FF0000 solid");
            setTimeout(function () {
                $("#message").hide();
                $("#footer").show();
                $("#email").css("border", "none");
                $("#email").val("");

            }, 3000);
        }
    }
    // else {
    //     return true;
    // }
}
function isMail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
function validatePassword() {
    var password = $('#signuppwrd').val();
    if (password == '') {

        $("#footer").hide();
        $("#message").show();
        $("#password").css("border", "1px #FF0000 solid");
        setTimeout(function () {
            $("#message").hide();
            $("#footer").show();
            $("#password").css("border", "none");

        }, 3000);
    }
    else {
        return true;
    }
}

function validateConfirmPassword() {

    var password = $('#signuppwrd').val();
    var confirmpassword = $('#confirmPwd').val();
    if (password != '' || confirmpassword != '') {
        if (confirmpassword != password) {
            $("#footer").hide();
            $("#message").html("Passwords doesn't match!");
            $("#message").show();
            $("#confirmpwd").css("border", "1px #FF0000 solid");
            setTimeout(function () {
                $("#message").hide();
                $("#footer").show();
                $("#confirmpwd").css("border", "none");
                $("#confirmpwd").val("");
                $("#password").val("");


            }, 3000);
        }
    }
    else {
        return true;
    }
}

$(document).ready(function () {

    $("#username").focusout(function () {
        validateUsername();
    })

    $("#email").focusout(function () {
        validateEmailAdd();
    })
    $("#signuppwrd").focusout(function () {
        validatePassword();
    })
    $("#confirmPwd").focusout(function () {
        validateConfirmPassword();
    })
})

