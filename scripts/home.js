var ORARIO = 'https://logistica.univr.it/PortaleStudentiUnivr/index.php?view=easycourse&form-type=corso&include=corso&visualizzazione_orario=cal&periodo_didattico=&list=0&week_grid_type=-1&ar_codes_=&ar_select_=&col_cells=0&empty_box=0&only_grid=0&faculty_group=0';
var INSEGNAMENTO = 'https://logistica.univr.it/PortaleStudentiUnivr/index.php?view=easycourse&include=attivita&_lang=it&empty_box=0';

var home = {

    init: function() {
        home.install_sw();
        home.init_ripple();
        home.init_dialog();
        home.init_select();
        home.init_snackbar();
        home.init_imposta();
        home.init_reimposta();
        home.init_corso();
        home.init_orario();
    },

    install_sw: function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
    },

    init_ripple: function() {
        var elements = $('.mdc-list-item, .mdc-line-ripple, .mdc-button, .mdc-fab');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_dialog: function() {
        var element = $('.mdc-dialog')[0];
        home.dialog = mdc.dialog.MDCDialog.attachTo(element);
    },

    init_select: function() {
        var elements = $('.mdc-select');
        for (var i = 0; i < elements.length; i++)
            mdc.select.MDCSelect.attachTo(elements[i]);
        $('#corso').on('change', function() {
            var opzioni = '#anno .corso_' + $('#corso').val();
            $('#anno .anno').css('display', 'none');
            $(opzioni).css('display', 'initial');
        });
    },

    init_snackbar: function() {
        var element = $('.mdc-snackbar')[0];
        home.snackbar = mdc.snackbar.MDCSnackbar.attachTo(element);
    },

    init_imposta: function() {
        $('#imposta').on('click', function() {
            var corso = $('#corso').val();
            var anno = $('#anno').val();
            if (corso && anno) {
                home.dialog.close();
                home.snackbar.show({message: 'Corso di studi impostato'});
                home.corso = corso;
                home.anno = anno;
                localStorage.setItem('corso', corso);
                localStorage.setItem('anno', anno);
            } else
                home.snackbar.show({message: 'Completa tutti i campi'});
        });
    },

    init_reimposta: function() {
        $('#reimposta').on('click', function() {
            $('#corso, #anno').val('');
            $('#anno .anno').css('display', 'none');
            home.dialog.open();
        });
    },

    init_corso: function() {
        home.corso = localStorage.getItem('corso');
        home.anno = localStorage.getItem('anno');
        if (!home.corso || !home.anno) home.dialog.open();
    },

    init_orario: function() {
        $('#questa_settimana, #orario_veloce').on('click', function () {
            home.orario();
        });
        $('#prossima_settimana').on('click', function () {
            home.orario(settimana = true);
        });
        $('#insegnamento').on('click', function () {
            window.location.href = INSEGNAMENTO;
        });
        $('#opzioni').on('click', function () {
            if (!home.corso || !home.anno) home.dialog.open();
            else window.location.href = '/opzioni';
        });
    },

    orario: function(settimana = false) {
        if (!home.corso || !home.anno) home.dialog.open();
        else {
            var data = new Date();
            var anno = data.getFullYear();
            var url = ORARIO + '&anno=' + anno;
            url += '&corso=' + home.corso;
            url += '&anno2%5B%5D=' + home.anno;
            url += '&date=' + home.crea_data(settimana);
            window.location.href = url;
        }
    },

    crea_data: function(settimana) {
        var data = new Date();
        var giorno = data.getDay();
        if (giorno == 0) {
            data.setDate(data.getDate() + 1);
            giorno = 1;
        }
        if (settimana) data.setDate(data.getDate() + (8 - giorno));
        var dd = data.getDate();
        var mm = data.getMonth() + 1;
        var yyyy = data.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var oggi = dd + '-' + mm + '-' + yyyy;
        return oggi;
    }

};


$(document).ready(home.init());
