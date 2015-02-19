#!/bin/bash
export npm_config_prefix=.npm/
export PATH=.npm/bin:$PATH
npm install -g bower grunt-cli
echo "BOWER AND GRUNT SUCCESS"
bower install --allow-root
echo "BOWER SUCCESS"
npm install
echo "NPM SUCCESS"
grunt prod
echo "GRUNT SUCCESS"