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
        var elements = $('.mdc-button, .mdc-fab');
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
                note.snackbar.show({message: 'Completa i campi!'});
        });
    },

    aggiungi: function(titolo, testo) {
        $.ajax({
            type: 'POST',
            url: 'aggiungi_nota',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                titolo: titolo,
                testo: testo
            }),
            success: function(risposta) {
                note.leggi_note();
                note.dialog.close();
                $('#titolo, #testo').val('');
                note.snackbar.show({message: 'Nota aggiunta!'});
            },
            error: function() {
                note.snackbar.show({message: 'Impossibile aggiungere la nota!'});
            }
        });
    },

    leggi_note: function() {
        $.ajax({
            type: 'POST',
            url: 'leggi_note',
            contentType: 'application/json',
            dataType: 'json',
            success: function(risposta) {
                risposta = note.formatta_note(risposta);
                $.get('/html/templates.html', function(contenuto) {
                    var template = $(contenuto).filter('#note').html();
                    $('#note').html(Mustache.render(template, risposta));
                }).then(function() {
                    var elements = $('.mdc-card__primary-action, .mdc-card__action-buttons .mdc-button');
                    for (var i = 0; i < elements.length; i++)
                        mdc.ripple.MDCRipple.attachTo(elements[i]);
                });
            },
            error: function() {
                note.snackbar.show({message: 'Impossibile leggere le note!'});
            }
        });
    },

    formatta_note: function(risposta) {
        for (var i = 0; i < risposta.note.length; i++) {
            risposta.note[i] = {
                id: risposta.note[i][0],
                titolo: risposta.note[i][1],
                testo: risposta.note[i][2].replace('\n', '<br>')
            };
        }
        return risposta;
    },

    elimina_nota: function(id) {
        $.ajax({
            type: 'POST',
            url: 'elimina_nota',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                id: id
            }),
            success: function(risposta) {
                note.leggi_note();
                note.snackbar.show({message: 'Nota eliminata!'});
            },
            error: function() {
                note.snackbar.show({message: 'Impossibile eliminare la nota!'});
            }
        });
    }

};


$(document).ready(note.init());
