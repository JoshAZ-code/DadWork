#!/usr/bin/env python3
"""
DadWork App - Local Server
Serves the web application on port 8080.
Run with: python3 server.py
"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DadWorkHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), DadWorkHTTPHandler) as httpd:
        print("=" * 60)
        print(f"  👨‍👦 DadWork App is running!")
        print(f"  🌐 Open in browser: http://localhost:{PORT}")
        print(f"  📁 Serving from: {DIRECTORY}")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down DadWork server...")
            sys.exit(0)

if __name__ == "__main__":
    main()
