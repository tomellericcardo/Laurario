var info = {

    init: function() {
        info.init_ripple();
    },

    init_ripple: function() {
        var elements = $('.mdc-button');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    }

};


$(document).ready(info.init());
