#!/bin/bash

rm -rf {APP_NAME}.tar.gz
tar czv -f {APP_NAME}.tar.gz . --exclude ".git" --exclude ".gitignore" --exclude "bower_components"  --exclude "logs" --exclude "src" --exclude "bower.json" --exclude "spec" --exclude ".markdown" --exclude ".sh" --exclude ".gz"