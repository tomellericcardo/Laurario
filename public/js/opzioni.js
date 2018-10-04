var opzioni = {

    init: function() {
        opzioni.init_navbar();
        opzioni.init_ripple();
        opzioni.init_home();
        opzioni.init_data();
        opzioni.init_select();
        var snackbar = opzioni.init_snackbar();
        opzioni.init_vai(snackbar);
    },

    init_navbar: function() {
        var element = $('.mdc-top-app-bar')[0];
        mdc.topAppBar.MDCTopAppBar.attachTo(element);
        var height = $('.mdc-top-app-bar').css('height');
        height = (parseInt(height) + 20) + 'px';
        $('.page-content').css('padding-top', height);
    },

    init_ripple: function() {
        var elements = $('.mdc-line-ripple, .mdc-button');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_home: function() {
        $('#home').on('click', function() {
            window.location.href = '/home';
        });
    },

    init_data: function() {
        var data = new Date();
        var giorno = data.getDay();
        if (giorno == 0)
            data.setDate(data.getDate() + 1);
        var dd = data.getDate();
        var mm = data.getMonth() + 1;
        var yyyy = data.getFullYear();
        if(dd < 10)
            dd = '0' + dd;
        if(mm < 10)
            mm = '0' + mm;
        var oggi = yyyy + '-' + mm + '-' + dd;
        $('#date_input').val(oggi);
    },

    init_select: function() {
        var element = $('.mdc-select')[1];
        mdc.select.MDCSelect.attachTo(element);
    },

    init_snackbar: function() {
        var element = $('.mdc-snackbar')[0];
        var snackbar = mdc.snackbar.MDCSnackbar.attachTo(element);
        return snackbar;
    },

    init_vai: function(snackbar) {
        $('#vai').on('click', function() {
            var settimana = $('#date_input').val();
            var colore = $('#select_colore').val();
            if (settimana.length > 0 && colore) {
                settimana = opzioni.converti_data(settimana);
                var url = 'https://logistica.univr.it/aule/Orario/?list=0&anno=2018&corso=338&anno2=779%7C1&visualizzazione_orario=cal&view=easycourse&include=corso&_lang=it';
                url += '&col_cells=' + colore;
                url += '&date=' + settimana;
                window.location.href = url;
            } else
                snackbar.show({message: 'Completa tutti i campi'});
        });
    },

    converti_data: function(settimana) {
        var data = settimana.split('-');
        return data[2] + '-' + data[1] + '-' + data[0];
    }

};


$(document).ready(opzioni.init());
