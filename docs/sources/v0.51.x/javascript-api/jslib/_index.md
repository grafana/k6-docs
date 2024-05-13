---
title: 'jslib'
description: 'External JavaScript libraries for k6'
weight: 15
---

# jslib

The [jslib.k6.io](https://jslib.k6.io/) is a collection of external JavaScript libraries that can be [directly imported](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules#remote-http-s-modules) in k6 scripts.

| Library                                                                                                                        | Description                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [aws](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws)                                                       | Library allowing to interact with Amazon AWS services                                                                  |
| [httpx](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx)                                                   | Wrapper around [k6/http](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/#k6http) to simplify session handling |
| [k6chaijs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs)                                             | BDD assertion style                                                                                                    |
| [utils](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils)                                                   | Small utility functions useful in every day load testing                                                               |
| [http-instrumentation-pyroscope](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope) | Library to instrument k6/http to send baggage headers for pyroscope to read back                                       |
