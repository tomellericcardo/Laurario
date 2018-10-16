# -*- coding: utf-8 -*-

from psycopg2 import connect


class Manager:

    # Inizializzazione database
    def __init__(self, g, db_url):
        self.g = g
        self.db_url = db_url
        self.init_db()

    def init_db(self):
        db = connect(self.db_url)
        cursore = db.cursor()
        cursore.execute('''
            CREATE TABLE IF NOT EXISTS nota (
                id serial PRIMARY KEY,
                titolo TEXT NOT NULL,
                testo TEXT NOT NULL
            )
        ''')
        db.commit()
        cursore.close()
        cursore.close()

    # Gestione connessioni
    def apri_connessione(self):
        self.g.db = connect(self.db_url)

    def chiudi_connessione(self):
        db = getattr(self.g, 'db', None)
        if db is not None:
            db.close()

    # Metodi lettura
    def leggi_righe(self, query, parametri = ()):
        cursore = self.g.db.cursor()
        cursore.execute(query, parametri)
        risultato = cursore.fetchall()
        cursore.close()
        return risultato

    def leggi_riga(self, query, parametri = ()):
        cursore = self.g.db.cursor()
        cursore.execute(query, parametri)
        risultato = cursore.fetchone()
        cursore.close()
        return risultato

    def leggi_dato(self, query, parametri = ()):
        return self.leggi_riga(query, parametri)[0]

    def leggi_presenza(self, query, parametri = ()):
        return len(self.leggi_righe(query, parametri)) > 0

    # Metodo scrittura
    def scrivi(self, query, parametri = ()):
        cursore = self.g.db.cursor()
        cursore.execute(query, parametri)
        self.g.db.commit()
        cursore.close()
