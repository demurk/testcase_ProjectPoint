import argparse
from os import getenv

from waitress import serve
from pyramid.config import Configurator
from pyramid.events import NewRequest

from database.setup_db import setup_db

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--setup_db", help="setup db tables", action='store_true')

    args, _ = parser.parse_known_args()

    if args.setup_db:
        setup_db()

    with Configurator() as config:
        config.add_subscriber(add_cors_headers_response_callback, NewRequest)
        config.include('routes')
        config.scan('views')
        app = config.make_wsgi_app()

    return app

if __name__ == '__main__':
    app = main()

    serve(
        app,
        host=getenv('WEB_APP_IP'),
        port=getenv('WEB_APP_PORT')
    )