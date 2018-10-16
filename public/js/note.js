var note = {

    init: function() {
        note.init_snackbar();
        note.leggi_note();
    },

    init_snackbar: function() {
        var element = $('.mdc-snackbar')[0];
        note.snackbar = mdc.snackbar.MDCSnackbar.attachTo(element);
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
