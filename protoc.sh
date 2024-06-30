#!/bin/bash

protoc --proto_path=node_modules/google-proto-files/ --proto_path=. --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=src/grpc -I ../goautowp spec.proto
