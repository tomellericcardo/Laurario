var note = {

    init: function() {
        note.init_ripple();
        note.init_dialog();
        note.init_fields();
        note.init_snackbar();
        note.init_aggiungi();
        note.leggi_note();
    },

    init_ripple: function() {
        var elements = $('.mdc-line-ripple, .mdc-button, .mdc-fab');
        for (var i = 0; i < elements.length; i++)
            mdc.ripple.MDCRipple.attachTo(elements[i]);
    },

    init_dialog: function() {
        var element = $('.mdc-dialog')[0];
        note.dialog = mdc.dialog.MDCDialog.attachTo(element);
        $('#nuova_nota').on('click', function() {
            note.dialog.open();
        });
    },

    init_fields: function() {
        var elements = $('.mdc-text-field');
        for (var i = 0; i < elements.length; i++)
            mdc.textField.MDCTextField.attachTo(elements[i]);
    },

    init_snackbar: function() {
        var element = $('.mdc-snackbar')[0];
        note.snackbar = mdc.snackbar.MDCSnackbar.attachTo(element);
    },

    init_aggiungi: function() {
        $('#aggiungi').on('click', function() {
            var titolo = $('#titolo').val();
            var testo = $('#testo').val();
            if (titolo.length > 0 && testo.length > 0)
                note.aggiungi(titolo, testo);
            else
                note.snackbar.show({message: 'Completa tutti i campi'});
        });
    },

    get_note: function() {
        var stringa_note = localStorage.getItem('note')
        var lista_note = JSON.parse(stringa_note);
        return lista_note;
    },

    set_note: function(lista_note) {
        var stringa_note = JSON.stringify(lista_note)
        localStorage.setItem('note', stringa_note);
    },

    aggiungi: function(titolo, testo) {
        var nuova_nota = {
            titolo: titolo,
            testo: testo.replace(/\n/gi, '<br>')
        };
        var lista_note = note.get_note();
        if (lista_note) {
            nuova_nota.id = lista_note.length;
            lista_note.push(nuova_nota);
        } else {
            nuova_nota.id = 0;
            lista_note = [nuova_nota];
        }
        note.set_note(lista_note);
        note.leggi_note();
        note.dialog.close();
        $('#titolo, #testo').val('');
        note.snackbar.show({message: 'Nota aggiunta'});
    },

    leggi_note: function() {
        var lista_note = note.get_note();
        $.get('/html/templates.html', function(contenuto) {
            var template = $(contenuto).filter('#note').html();
            $('#note').html(Mustache.render(template, {note: lista_note}));
        }).then(function() {
            var elements = $('.mdc-card__primary-action, .mdc-card__action-buttons .mdc-button');
            for (var i = 0; i < elements.length; i++)
                mdc.ripple.MDCRipple.attachTo(elements[i]);
        });
    },

    elimina_nota: function(id) {
        var lista_note = note.get_note();
        var nuova_lista = [];
        var nota_corrente;
        for (var i = 0; i < lista_note.length; i++) {
            nota_corrente = lista_note[i];
            if (nota_corrente.id != id) {
                nota_corrente.id = nuova_lista.length;
                nuova_lista.push(nota_corrente);
            }
        }
        note.set_note(nuova_lista);
        note.leggi_note();
        note.snackbar.show({message: 'Nota eliminata'});
    }

};


$(document).ready(note.init());
