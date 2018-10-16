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
        for (element in elements)
            mdc.ripple.MDCRipple.attachTo(element);
    },

    init_dialog: function() {
        var element = $('.mdc-dialog')[0];
        note.dialog = mdc.dialog.MDCDialog.attachTo(element);
        $('#nuova_nota').on('click', function() {
            note.dialog.open();
        });
        $('#annulla').on('click', function() {
            note.dialog.close();
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
        var titolo = $('#titolo').val();
        var testo = $('#testo').val();
        if (titolo.length > 0 && testo.length > 0) {
            $.ajax({
                type: 'POST',
                url: 'aggiungi_nota',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    titolo: titolo,
                    testo: testo
                }),
                success: function(risultato) {
                    note.dialog.close();
                },
                error: function() {
                    note.snackbar.show({message: 'Impossibile aggiungere la nota!'});
                }
            });
        }
    },

    leggi_note: function() {
        $.ajax({
            type: 'POST',
            url: 'leggi_note',
            contentType: 'application/json',
            dataType: 'json',
            success: function(risultato) {
                $('#note').html(risultato.note.toString());
            },
            error: function() {
                note.snackbar.show({message: 'Impossibile leggere le note!'});
            }
        });
    }

};


$(document).ready(note.init());
