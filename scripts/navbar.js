var navbar = {

    init: function() {
        navbar.init_element();
        navbar.init_home();
        navbar.init_menu();
    },

    init_element: function() {
        var element = $('.mdc-top-app-bar')[0];
        mdc.topAppBar.MDCTopAppBar.attachTo(element);
        var height = $('.mdc-top-app-bar').css('height');
        if (!window.location.pathname.match(/^\/(home|info)?$/))
            height = (parseInt(height) + 20) + 'px';
        $('.page-content').css('padding-top', height);
    },

    init_home: function() {
        $('#home').on('click', function() {
            window.location.href = '/';
        });
    },

    init_menu: function() {
        if (!window.location.pathname.match(/^\/info$/)) {
            var element = $('.mdc-menu')[0];
            var menu = new mdc.menu.MDCMenu(element);
            $('#menu-icon').on('click', function() {
                menu.open = !menu.open;
            });
            $('#informazioni').on('click', function() {
                window.location.href = '/info';
            });
        }
    },

};


$(document).ready(navbar.init());
