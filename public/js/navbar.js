var navbar = {

    init: function() {
        navbar.init_element();
        navbar.init_home();
    },

    init_element: function() {
        var element = $('.mdc-top-app-bar')[0];
        mdc.topAppBar.MDCTopAppBar.attachTo(element);
        var height = $('.mdc-top-app-bar').css('height');
        if (window.location.pathname != 'home')
            height = (parseInt(height) + 20) + 'px';
        $('.page-content').css('padding-top', height);
    },

    init_home: function() {
        $('#home').on('click', function() {
            window.location.href = '/home';
        });
    }

};


$(document).ready(navbar.init());
