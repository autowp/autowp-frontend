#!/bin/bash

protoc --proto_path=../googleapis/ --proto_path=. --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=src/grpc -I ../goautowp spec.proto
