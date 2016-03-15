import os
import sys

def startServer():
	os.chdir(os.getcwd() + '/../app')
	command = 'node index.js'
	os.system(command)

if len(sys.argv) == 1:
	print 'call android.py start to start server'

else:
	argument = str(sys.argv[1])
	if argument == 'start':
		startServer()