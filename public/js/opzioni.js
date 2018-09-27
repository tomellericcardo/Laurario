var opzioni = {

    init: function() {
        opzioni.init_navbar();
        opzioni.init_ripple();
        opzioni.init_textfield();
        opzioni.init_select();
    },

    init_navbar: function() {
        var element = $('.mdc-top-app-bar')[0];
        mdc.topAppBar.MDCTopAppBar.attachTo(element);
        var height = $('.mdc-top-app-bar').css('height');
        $('.page-content').css('padding-top', height);
    },

    init_ripple: function() {
        var elements = $('.mdc-line-ripple');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_select: function() {
        var element = $('.mdc-select')[0];
        mdc.select.MDCSelect.attachTo(element);
    },

    init_textfield: function() {
        var element = $('.mdc-text-field')[0];
        mdc.textField.MDCTextField.attachTo(element);
    }

};


$(document).ready(opzioni.init());
