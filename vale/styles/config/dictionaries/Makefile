.ONESHELL:
.DELETE_ON_ERROR:
export SHELL     := bash
export SHELLOPTS := pipefail:errexit
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rule

# Adapted from https://suva.sh/posts/well-documented-makefiles/
.PHONY: help
help: ## Display this help
help:
	@awk 'BEGIN {FS = ": ##"; printf "Usage:\n  make <target>\n\nTargets:\n"} /^[a-zA-Z0-9_\.\-\/%]+: ##/ { printf "  %-45s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: all
all: ## Create all dictionaries.
all: en_US-grafana.dic en_US-places.dic

en_US-places.dic: ## Create a Hunspell dictionary of places from a wordlist.
en_US-places.dic: en_US-places.wordlist
	cat <(wc -l <$< | tr -d ' ') $< > $@

en_US-grafana.dic: ## Create a Hunspell dictionary for Grafana from the Jsonnet dictionary.
en_US-grafana.dic: en_US-grafana.jsonnet ../../../../dictionary.libsonnet $(wildcard ../../../../dictionary/*.jsonnet)
	jsonnet -S en_US-grafana.jsonnet > $@
