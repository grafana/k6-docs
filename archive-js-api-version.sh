#!/bin/sh
set -eu

VERSION="$1"

cd src/data/markdown

# create folder for archived version data
mkdir "./versioned-js-api/$VERSION"
mkdir "./versioned-js-api/$VERSION/javascript api"

# copy content of docs/javascript api to the version folder
cp -pr "./docs/02 javascript api/." "./versioned-js-api/$VERSION/javascript api/"
