$(document).on("pagecreate", "div[data-role=page]", function () {

    var icon = document.getElementById('menubutton');
    var open = false;

    $(document).on('pageinit', function(){
        var width = $(window).width();
        if(width > 768){
            $("#menu").panel("open"); /* nav-panel is the id of the panel div*/
            if (open) {
                icon.className = 'menu-icon';
            } else {
                icon.className = 'menu-icon open';
            }
            open = !open;
        }
    });

    $("#menubuttonblock").on("tap", function () {
        if (open) {
            icon.className = 'menu-icon';
        } else {
            icon.className = 'menu-icon open';
        }
        open = !open;
    });

    $("#menu").on("panelbeforeclose", function () {
        if (open) {
            icon.className = 'menu-icon';
        } else {
            icon.className = 'menu-icon open';
        }
        open = !open;
    });

    $(window).resize(function () {
        if (window.innerWidth > 768) {
            $("#menu").panel("open");
            open = true;
        }
        if (window.innerWidth < 768) {
            $("#menu").panel("close");
            open = false;
            icon.className = 'menu-icon';
        }

    });

});


