import os
import json
import mimetypes
from beaker.middleware import SessionMiddleware

session_opts = {
    'session.type': 'file',
    'session.cookie_expires': True,
    'session.data_dir': '/tmp/sessions',
    'session.auto': True
}

def wsgi_app(environ, start_response):
    session = environ.get('beaker.session')
    path = environ.get('PATH_INFO', '').lstrip('/')
    
    if path == 'get-config':
        lang = session.get('lang', 'ES')
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(BASE_DIR, 'conf', f'config{lang}.json')
        
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config_data = json.load(f)
            status = '200 OK'
            headers = [('Content-Type', 'application/json')]
            start_response(status, headers)
            return [json.dumps(config_data).encode('utf-8')]
        except Exception:
            status = '404 Not Found'
            start_response(status, [('Content-Type', 'text/plain')])
            return [b'Configuracion no encontrada']

    session.save()

    path = environ.get('PATH_INFO', '').lstrip('/')
    
    if path == '' or path == 'index.py':
        path = 'index.html'

    base_dir = os.path.dirname(__file__)
    file_path = os.path.join(base_dir, path)

    if os.path.isfile(file_path):
        content_type, _ = mimetypes.guess_type(file_path)
        if content_type is None:
            content_type = 'application/octet-stream'

        status = '200 OK'
        headers = [('Content-Type', f'{content_type}; charset=utf-8')]
        start_response(status, headers)

        try:
            with open(file_path, 'rb') as f:
                return [f.read()]
        except Exception as e:
            start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
            return [f"Error interno al leer el archivo: {str(e)}".encode('utf-8')]
    else:
        status = '404 Not Found'
        headers = [('Content-Type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        return [b"404 - Archivo no encontrado"]

application = SessionMiddleware(wsgi_app, session_opts)