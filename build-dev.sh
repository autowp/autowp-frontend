#!/bin/bash

set -e

./node_modules/.bin/ng build --base-href=/ --configuration=test

cp -R ./dist/* ../autowp/frontend/
