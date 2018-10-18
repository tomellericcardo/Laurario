# -*- coding: utf-8 -*-

from flask import Flask, send_from_directory, request
from manager import Manager
from os import environ
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

# Altri files
@app.route('/<cartella>/<nome_file>')
def invia_file(cartella, nome_file):
    return send_from_directory('public/' + cartella + '/', nome_file)


# AVVIO DEL SERVER

if __name__ == '__main__':
    app.run(threaded = True)
