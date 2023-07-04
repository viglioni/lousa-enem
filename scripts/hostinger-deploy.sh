#!/bin/bash

(rsync -avzhe "ssh -p 65002" ./out/* u336768656@195.179.236.20:/home/u336768656/public_html/pride) && echo "deployed" || echo "something went wrong"
