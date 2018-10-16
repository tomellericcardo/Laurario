# -*- coding: utf-8 -*-

from flask import Flask, g, send_from_directory, request
from os import environ
from json import dumps


app = Flask(__name__)
db_url = environ['DATABASE_URL']
manager = Manager(g, db_url)


# OPERAZIONI DI SESSIONE

@app.before_request
def apri_connessione():
    manager.apri_connessione()

@app.teardown_request
def chiudi_connessione(exception):
    manager.chiudi_connessione()


# INVIO DI FILES

# Homepage
@app.route('/')
def home():
    return send_from_directory('public/html/', 'home.html')

# Pagine
@app.route('/<pagina>')
def invia_pagina(pagina):
    return send_from_directory('public/html/', pagina + '.html')

# Altri files
@app.route('/<cartella>/<nome_file>')
def invia_file(cartella, nome_file):
    return send_from_directory('public/' + cartella + '/', nome_file)


# CONTESTI

# Leggi note
@app.route('/leggi_note', methods = ['POST'])
def leggi_note():
    note = manager.leggi_righe('SELECT * FROM nota')
    return dumps({'note': note})

# Aggiungi nota
@app.route('/aggiungi_nota', methods = ['POST'])
def aggiungi_nota():
    richiesta = request.get_json(force = True)
    titolo = richiesta['titolo']
    testo = richiesta['testo']
    manager.scrivi('''
        INSERT INTO nota (titolo, testo)
        VALUES (%s, %s)
    ''', (titolo, testo))
    return dumps({'success': True})

# Elimina nota
@app.route('/elimina_nota', methods = ['POST'])
def elimina_nota():
    richiesta = request.get_json(force = True)
    id = richiesta['id']
    manager.scrivi('''
        DELETE FROM nota
        WHERE id = %s
    ''', (id,))
    return dumps({'success': True})


# AVVIO DEL SERVER

if __name__ == '__main__':
    app.run(threaded = True)
