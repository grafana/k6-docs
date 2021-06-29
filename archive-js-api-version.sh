#!/bin/sh
set -eu

VERSION="$1"
VERSION_FORMATTED="$(echo "$VERSION" | sed 's/\./-/g')"

cd src/data/markdown

# create folder for archived version data
mkdir "./versioned-js-api/$VERSION"

# copy content of docs/javascript api to the version folder
cp -pr "./docs/02 javascript api/." "./versioned-js-api/$VERSION/"

# replace internal links for javascript-api section (/javascript-api/ => /javascript-api/v0-XX/)
find "./versioned-js-api/$VERSION" -type f -iname "*.md" -exec sed -i -e "s,/javascript-api/,/javascript-api/${VERSION_FORMATTED}/,g" {} \;
