#!/bin/bash
if (($EUID !=0)); then
     echo Script must be run by root.
     exit
else
     docker build -t websocket-tg .
     docker run -d --name ws-tg -p 8080:8080 websocket-tg
     docker ps
fi
