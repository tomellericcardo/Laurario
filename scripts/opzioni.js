var ORARIO = 'https://logistica.univr.it/PortaleStudentiUnivr/index.php?view=easycourse&form-type=corso&include=corso&visualizzazione_orario=cal&periodo_didattico=&list=0&week_grid_type=-1&ar_codes_=&ar_select_=&empty_box=0&only_grid=0&faculty_group=0';

var opzioni = {

    init: function() {
        opzioni.init_ripple();
        opzioni.init_corso();
        opzioni.init_data();
        opzioni.init_select();
        opzioni.init_snackbar();
        opzioni.init_vai();
    },

    init_ripple: function() {
        var elements = $('.mdc-line-ripple, .mdc-fab');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_corso: function() {
        opzioni.corso = localStorage.getItem('corso');
        opzioni.anno = localStorage.getItem('anno');
        if (!opzioni.corso || !opzioni.anno) window.location.href = '/';
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
                var data = new Date();
                var anno = data.getFullYear();
                url = ORARIO + '&anno=' + anno;
                url += '&corso=' + opzioni.corso;
                url += '&anno2%5B%5D=' + opzioni.anno;
                url += '&date=' + settimana;
                url += '&col_cells=' + colore;
                window.location.href = url;
            } else opzioni.snackbar.show({message: 'Completa tutti i campi'});
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
