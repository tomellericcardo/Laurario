var home = {

    init: function() {
        home.init_ripple();
        note.init_dialog();
        note.init_select();
        note.init_imposta();
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
        var url = 'https://logistica.univr.it/aule/Orario/index.php?view=easycourse&include=corso&_lang=it'
        $.get(url, function(contenuto) {
            var corsi = $(contenuto).filter('#cdl_co').html();
            $('#corso').html(corsi);
        });
        $('#corso').on('change', function() {
            $.get(url + '&corso=' + $('#corso').val(), function(contenuto) {
                var anni = $(contenuto).filter('#cdl_a2').html();
                $('#anno').html(anni);
            });
        });
    },

    init_imposta: function() {
        $('#imposta').on('click', function() {
            var corso = $('#corso').val();
            var anno = $('#anno').val();
            if (corso && anno)
                localStorage.setItem('corso', {
                    corso: corso,
                    anno: anno
                });
        });
    },

    init_corso: function() {
        home.corso = localStorage.getItem('corso');
        if (!home.corso)
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
        if (!home.corso)
            home.dialog.open();
        else {
            var url = 'https://logistica.univr.it/aule/Orario/?list=0&anno=2018&visualizzazione_orario=cal&view=easycourse&include=corso&_lang=it&col_cells=0';
            url += '&corso=' + home.corso.corso;
            url += '&anno2=' + home.corso.anno;
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
