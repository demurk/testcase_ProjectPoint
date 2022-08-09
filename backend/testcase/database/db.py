from os import getenv

import psycopg2
from psycopg2.extras import Json
from psycopg2.extensions import register_adapter

register_adapter(dict, Json)     

class Database:
    def __init__(self):
        self.conn = None
        self.cursor = None

    def connect_to_db(self, auto_commit=False):
        self.conn = psycopg2.connect(                                                  
            user = getenv("DATABASE_USERNAME"),                                      
            password = getenv("DATABASE_PASSWORD"),                                  
            host = getenv("DATABASE_IP"),                                            
            port = getenv("DATABASE_PORT"),                  
            database = getenv("DATABASE_NAME")                                       
        )

        self.conn.autocommit = auto_commit

    def execute(self, query, params=None, close_cursor=False, fetchall=False, fetchone=False):
        self.get_cursor()

        if params and type(params) is not tuple:
            params = (params, )

        self.cursor.execute(query, params)

        data = None
        if fetchall:
            data = self.fetchall()
        elif fetchone:
            data = self.fetchone()

        if close_cursor:
            self.cursor.close()

        return data

    def fetchall(self):
        if self.cursor and not self.cursor.closed:
            return self.cursor.fetchall()
        else:
            return None

    def fetchone(self):
        if self.cursor and not self.cursor.closed:
            return self.cursor.fetchone()
        else:
            return None

    def commit(self):
        self.conn.commit()

    def close_connection(self):
        self.conn.close()

    def get_cursor(self):
        if not self.cursor or self.cursor.closed:
            self.cursor = self.conn.cursor()
