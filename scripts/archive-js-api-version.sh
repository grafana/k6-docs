#!/bin/sh
set -eu

VERSION="$1"

cd src/data/markdown

# create folder for archived version data
mkdir "./docs/$VERSION"

# copy content of docs/javascript api to the version folder
cp -pr "./docs/02 javascript api/." "./docs/$VERSION/02 javascript api/"