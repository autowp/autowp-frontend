#!/bin/bash

protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=generated -I ../goautowp spec.proto
