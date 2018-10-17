var home = {

    init: function() {
        home.init_ripple();
        home.init_dialog();
        home.init_select();
        home.init_imposta();
        home.init_corso();
        home.init_imposta();
        home.init_orario();
    },

    init_ripple: function() {
        var elements = $('.mdc-list-item, .mdc-button');
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
            $('#anno option').css('display', 'none');
            $(opzioni).css('display', 'initial');
        });
    },

    init_imposta: function() {
        $('#imposta').on('click', function() {
            var corso = $('#corso').val();
            var anno = $('#anno').val();
            if (corso && anno) {
                home.corso = corso;
                home.anno = anno;
                localStorage.setItem('corso', corso);
                localStorage.setItem('anno', anno);
            }
        });
    },

    init_corso: function() {
        home.corso = localStorage.getItem('corso');
        home.anno = localStorage.getItem('anno');
        if (!home.corso || !home.anno)
            home.dialog.open();
    },

    init_orario: function() {
        $('#questa_settimana').on('click', function () {
            home.orario();
        });
        $('#prossima_settimana').on('click', function () {
            home.orario(settimana = true);
        });
        $('#insegnamento').on('click', function () {
            window.location.href = 'https://logistica.univr.it/aule/Orario/?view=easycourse&include=attivita&_lang=it';
        });
    },

    orario: function(settimana = false) {
        if (!home.corso || !home.anno)
            home.dialog.open();
        else {
            var url = 'https://logistica.univr.it/aule/Orario/?list=0&anno=2018&visualizzazione_orario=cal&view=easycourse&include=corso&_lang=it&col_cells=0';
            url += '&corso=' + home.corso;
            url += '&anno2=' + home.anno;
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
        if (settimana)
            data.setDate(data.getDate() + (8 - giorno));
        var dd = data.getDate();
        var mm = data.getMonth() + 1;
        var yyyy = data.getFullYear();
        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        var oggi = dd + '-' + mm + '-' + yyyy;
        return oggi;
    }

};


$(document).ready(home.init());
