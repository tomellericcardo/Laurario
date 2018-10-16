var opzioni = {

    init: function() {
        opzioni.init_ripple();
        opzioni.init_data();
        opzioni.init_select();
        opzioni.init_snackbar();
        opzioni.init_vai();
    },

    init_ripple: function() {
        var elements = $('.mdc-line-ripple, .mdc-button');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_data: function() {
        var data = new Date();
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
        opzioni.snackbar = mdc.snackbar.MDCSnackbar.attachTo(element);
    },

    init_vai: function() {
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
                opzioni.snackbar.show({message: 'Completa tutti i campi'});
        });
    },

    converti_data: function(settimana) {
        var data = new Date(settimana);
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
        return dd + '-' + mm + '-' + yyyy;
    }

};


$(document).ready(opzioni.init());
