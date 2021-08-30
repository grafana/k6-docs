#!/bin/sh
set -eu

VERSION="$1"

cd src/data/markdown

# create folder for archived version data
mkdir "./versioned-js-api/$VERSION"
mkdir "./versioned-js-api/$VERSION/javascript\ api"

# copy content of docs/javascript api to the version folder
cp -pr "./docs/02 javascript api/." "./versioned-js-api/$VERSION/javascript api/"

# replace internal links for javascript-api section (/javascript-api/ => /javascript-api/v0-XX/)
find "./versioned-js-api/$VERSION/javascript api" -type f -iname "*.md" -exec sed -i -e "s,/javascript-api/,/${VERSION}/javascript-api/,g" {} \;
