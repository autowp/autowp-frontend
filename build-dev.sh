#!/bin/bash

set -e

./node_modules/.bin/ng build --base-href=/ --extra-webpack-config webpack.extra.js --aot --vendor-chunk --build-optimizer=false --source-map=false

cp -R ./dist/* /home/dvp/eclipse-workspace/autowp/frontend/
