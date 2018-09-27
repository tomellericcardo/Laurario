var home = {

    init: function() {
        home.init_navbar();
        home.init_ripple();
        home.init_orario();
    },

    init_navbar: function() {
        var element = $('.mdc-top-app-bar')[0];
        mdc.topAppBar.MDCTopAppBar.attachTo(element);
        var height = $('.mdc-top-app-bar').css('height');
        $('.page-content').css('padding-top', height);
    },

    init_ripple: function() {
        var elements = $('.mdc-list-item');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_orario: function() {
        $('#questa_settimana').on('click', function () {
            home.questa_settimana();
        });
        $('#prossima_settimana').on('click', function () {
            home.prossima_settimana();
        });
    },

    questa_settimana: function() {
        var url = 'https://logistica.univr.it/aule/Orario/?list=0&anno=2018&corso=338&anno2=779%7C1&visualizzazione_orario=cal&view=easycourse&include=corso&_lang=it&col_cells=0&date=';
        url +=  home.crea_data(false);
        window.location.href = url;
    },

    prossima_settimana: function() {
        var url = 'https://logistica.univr.it/aule/Orario/?list=0&anno=2018&corso=338&anno2=779%7C1&visualizzazione_orario=cal&view=easycourse&include=corso&_lang=it&col_cells=0&date=';
        url +=  home.crea_data(true);
        window.location.href = url;
    },

    crea_data: function(settimana) {
        var data = new Date();
        if (settimana) {
            var giorno = data.getDay();
            if (giorno == 0)
                giorno = 7
            data.setDate(data.getDate() + (8 - giorno));
        }
        var dd = data.getDate();
        var mm = data.getMonth() + 1;
        var yyyy = data.getFullYear();
        if(dd < 10)
            dd = '0' + dd;
        if(mm < 10)
            mm = '0' + mm;
        var oggi = dd + '-' + mm + '-' + yyyy;
        return oggi;
    }

};


$(document).ready(home.init());
