#!/bin/bash

set -e

./node_modules/.bin/ng build --base-href=/ --extra-webpack-config webpack.extra.js --configuration=test
./node_modules/.bin/ng run wheelsage:server:test

cp -R ./dist/* ../autowp/frontend/
