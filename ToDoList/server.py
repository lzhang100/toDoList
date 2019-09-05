import http.server
import socketserver
import socket

from http.server import BaseHTTPRequestHandler, HTTPServer
PORT = 8080
from os import curdir, sep

#Replace myHandler with Handler for testing purposes only
#Handler = http.server.SimpleHTTPRequestHandler

class myHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		print(self.path)

		try:
			if self.path=="/":
				self.path="/index.html"

			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True
			if self.path.endswith(".ico"):
				mimetype='image/x-icon'
				sendReply = True

			if sendReply == True:
				self.send_response(200)
				self.send_header("Content-type", mimetype)
				self.end_headers()
				f1 = open(curdir + sep + self.path) 
				self.wfile.write(bytes(f1.read(), "utf-8"))
				f1.close();
			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

try:
	socketserver.TCPServer.allow_reuse_address = True
	httpd = socketserver.TCPServer(("", PORT), myHandler)
	print("Server is listening on port number: ", PORT)
	httpd.serve_forever()


except KeyboardInterrupt:
	print("Closing down the server with KeyboardInterrupt")
	httpd.socket.close()
	
