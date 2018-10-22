# -*- coding: utf-8 -*-

from flask import Flask, send_from_directory
from json import dumps


app = Flask(__name__)


# INVIO DI FILES

# Homepage
@app.route('/')
def home():
    return send_from_directory('public/html/', 'home.html')

# Pagine
@app.route('/<pagina>')
def invia_pagina(pagina):
    return send_from_directory('public/html/', pagina + '.html')

# Service worker
@app.route('/service-worker.js')
def service_worker():
    return send_from_directory('public/js/service-worker.js')

# Altri files
@app.route('/<cartella>/<nome_file>')
def invia_file(cartella, nome_file):
    return send_from_directory('public/' + cartella + '/', nome_file)


# AVVIO DEL SERVER

if __name__ == '__main__':
    app.run(threaded = True)
