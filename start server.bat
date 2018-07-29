@echo off

WHERE npm
IF %ERRORLEVEL% NEQ 0 (
	ECHO NPM wasn't found 
	ECHO INSTALL NPM FROM SERVER AND TRY AGAIN
	START "" "https://nodejs.org/dist/v8.11.3/node-v8.11.3-x64.msi"
	goto :end
)else goto :start

WHERE http-server
IF %ERRORLEVEL% NEQ 0 (
	ECHO http-server wasn't found 
	ECHO begin installing Http-server	
	npm install http-server -g
	echo end installing http-server
)else goto :start
IF %ERRORLEVEL% NEQ 0 (
	ECHO FATAL ERROR  
	ECHO WE CANNOT INSTALL Http-server ;INSTALL IT MANUALY OR CONTACT ACHOUR BRAHIM
	goto :end
)

:start
http-server


:end
echo bye bye.