#!/bin/bash

set -e

./node_modules/.bin/ng build --base-href=/ --extra-webpack-config webpack.extra.js --configuration=test

cp -R ./dist/* /home/dvp/eclipse-workspace/autowp/frontend/
