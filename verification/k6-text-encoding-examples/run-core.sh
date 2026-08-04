#!/usr/bin/env sh

set -eu

BUNDLE_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
K6_EXECUTABLE=${K6_BIN:-k6}

find \
  "$BUNDLE_DIR/examples/javascript-api/crypto" \
  "$BUNDLE_DIR/examples/javascript-api/text-encoding" \
  -type f -name '*.js' -print \
  | sort \
  | while IFS= read -r script; do
      echo "Running ${script#$BUNDLE_DIR/}"
      "$K6_EXECUTABLE" run --iterations 1 "$script"
    done
