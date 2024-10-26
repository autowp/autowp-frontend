#!/bin/bash

set -e

./node_modules/.bin/ng build --base-href=/ --configuration=development

cp -R ./dist/* ../autowp/frontend/
