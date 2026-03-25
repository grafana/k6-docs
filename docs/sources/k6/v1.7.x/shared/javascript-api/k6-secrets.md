---
title: javascript-api/k6-secrets
---

The [`k6/secrets` module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-secrets) gives access to secrets provided by configured [secret sources](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source).

| Property                                                                                      | Description                                                                                         |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [get([String])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-secrets#get)       | asynchrounsly get a secret from the default secret source                                           |
| [source([String])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-secrets#source) | returns a source for the provided name that can than be used to get a secret from a concrete source |
