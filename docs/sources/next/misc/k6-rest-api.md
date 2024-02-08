---
title: 'k6 REST API'
description: 'With this API you can see and control different execution aspects like
number of VUs, pause or resume the test, list groups, set and get the
setup data and more.'
_build:
  list: false
weight: 04
---

# k6 REST API

When k6 starts, it spins up an HTTP server with a REST API that can be used to control some
parameters of the test execution. By default, that server listens on `localhost:6565`, but
that can be modified by the `--address` CLI flag.

With this API you can see and control different execution aspects like number of VUs, Max
VUs, pause or resume the test, list groups, set and get the setup data and so on.

You can also find practical usage examples in
[this blog post](https://k6.io/blog/how-to-control-a-live-k6-test).

## Get Status

**GET** `http://localhost:6565/v1/status`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/status \
  -H 'Content-Type: application/json'
```

```json
{
  "data": {
    "attributes": {
      "paused": false,
      "running": true,
      "tainted": false,
      "vus": 1
    },
    "id": "default",
    "type": "status"
  }
}
```

{{< /code >}}

## Update Status

**PATCH** `http://localhost:6565/v1/status`

{{< code >}}

```bash
curl -X PATCH \
  http://localhost:6565/v1/status \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
        "attributes": {
            "paused": true,
            "vus": 1,
        },
        "id": "default",
        "type": "status"
    }
}'
```

```json
{
  "data": {
    "type": "status",
    "id": "default",
    "attributes": {
      "paused": true,
      "vus": 1,
      "running": true,
      "tainted": false
    }
  }
}
```

{{< /code >}}

This endpoint lets you pause/resume a running test and set the number of `vus` and `vus-max`
during the test.

## List Metrics

**GET** `http://localhost:6565/v1/metrics`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/metrics \
  -H 'Content-Type: application/json'
```

```json
{
  "data": [
    {
      "type": "metrics",
      "id": "http_req_duration",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 122.529465,
          "max": 179.098624,
          "med": 115.83006,
          "min": 107.743524,
          "p(90)": 136.9331272,
          "p(95)": 158.01587559999996
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_connecting",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 11.2357072,
          "max": 112.357072,
          "med": 0,
          "min": 0,
          "p(90)": 11.235707199999961,
          "p(95)": 61.796389599999884
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_sending",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 0.027994200000000004,
          "max": 0.106594,
          "med": 0.0192965,
          "min": 0.017486,
          "p(90)": 0.03165189999999997,
          "p(95)": 0.0691229499999999
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_waiting",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 122.33937080000001,
          "max": 179.021285,
          "med": 115.74006299999999,
          "min": 107.650352,
          "p(90)": 136.8561833,
          "p(95)": 157.93873414999996
        }
      }
    },
    {
      "type": "metrics",
      "id": "data_received",
      "attributes": {
        "type": "counter",
        "contains": "data",
        "tainted": null,
        "sample": {
          "count": 13830,
          "rate": 1119.9222882571698
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_blocked",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 11.364957999999998,
          "max": 113.611988,
          "med": 0.004173,
          "min": 0.003867,
          "p(90)": 11.365557499999959,
          "p(95)": 62.48877274999988
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_receiving",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 0.16209999999999997,
          "max": 0.757392,
          "med": 0.078622,
          "min": 0.057306,
          "p(90)": 0.2315264999999998,
          "p(95)": 0.4944592499999994
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_reqs",
      "attributes": {
        "type": "counter",
        "contains": "default",
        "tainted": null,
        "sample": {
          "count": 10,
          "rate": 0.8097775041628127
        }
      }
    },
    {
      "type": "metrics",
      "id": "http_req_tls_handshaking",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 0,
          "max": 0,
          "med": 0,
          "min": 0,
          "p(90)": 0,
          "p(95)": 0
        }
      }
    },
    {
      "type": "metrics",
      "id": "data_sent",
      "attributes": {
        "type": "counter",
        "contains": "data",
        "tainted": null,
        "sample": {
          "count": 860,
          "rate": 69.64086535800189
        }
      }
    },
    {
      "type": "metrics",
      "id": "iteration_duration",
      "attributes": {
        "type": "trend",
        "contains": "time",
        "tainted": null,
        "sample": {
          "avg": 1134.89821,
          "max": 1238.377413,
          "med": 1118.223518,
          "min": 1108.405498,
          "p(90)": 1185.348477,
          "p(95)": 1211.8629449999999
        }
      }
    },
    {
      "type": "metrics",
      "id": "iterations",
      "attributes": {
        "type": "counter",
        "contains": "default",
        "tainted": null,
        "sample": {
          "count": 10,
          "rate": 0.8097775041628127
        }
      }
    },
    {
      "type": "metrics",
      "id": "vus",
      "attributes": {
        "type": "gauge",
        "contains": "default",
        "tainted": null,
        "sample": {
          "value": 1
        }
      }
    }
  ]
}
```

{{< /code >}}

This endpoint will give you all the metrics in the current time. You can see more details on all
metrics available and how to create new ones in [Metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).

## Get Metric

**GET** `http://localhost:6565/v1/metrics/id`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/metrics/http_req_receiving \
  -H 'Content-Type: application/json'
```

```json
{
  "data": {
    "attributes": {
      "contains": "time",
      "sample": {
        "avg": 0.12641856097560983,
        "max": 1.1397,
        "med": 0.074412,
        "min": 0.057858,
        "p(90)": 0.208553,
        "p(95)": 0.218015
      },
      "tainted": null,
      "type": "trend"
    },
    "id": "http_req_receiving",
    "type": "metrics"
  }
}
```

{{< /code >}}

This endpoint will give you details for the given metric in the current time.

You can see more on all metrics available and how to create new ones in [Metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).

## List Groups

**GET** `http://localhost:6565/v1/groups`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/groups \
  -H 'Content-Type: application/json'
```

```json
{
  "data": [
    {
      "type": "groups",
      "id": "d41d8cd98f00b204e9800998ecf8427e",
      "attributes": {
        "path": "",
        "name": "",
        "checks": null
      },
      "relationships": {
        "groups": {
          "data": [
            {
              "type": "groups",
              "id": "b0470a9324a4ae563b04e9ac49fbc9cf"
            }
          ]
        },
        "parent": {
          "data": null
        }
      }
    },
    {
      "type": "groups",
      "id": "b0470a9324a4ae563b04e9ac49fbc9cf",
      "attributes": {
        "path": "::visit homepage",
        "name": "visit homepage",
        "checks": null
      },
      "relationships": {
        "groups": {
          "data": []
        },
        "parent": {
          "data": {
            "type": "groups",
            "id": "d41d8cd98f00b204e9800998ecf8427e"
          }
        }
      }
    }
  ]
}
```

{{< /code >}}

This endpoint returns all groups available on the test.

For more details on how to create groups please go to [Tags and Groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).

## Get Group

**GET** `http://localhost:6565/v1/groups/id`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/groups/b0470a9324a4ae563b04e9ac49fbc9cf \
  -H 'Content-Type: application/json'
```

```json
{
  "data": {
    "type": "groups",
    "id": "b0470a9324a4ae563b04e9ac49fbc9cf",
    "attributes": {
      "path": "::visit homepage",
      "name": "visit homepage",
      "checks": null
    },
    "relationships": {
      "groups": {
        "data": []
      },
      "parent": {
        "data": {
          "type": "groups",
          "id": "d41d8cd98f00b204e9800998ecf8427e"
        }
      }
    }
  }
}
```

{{< /code >}}

This endpoint returns the Group with the given ID.

For more details on how to create groups, please go to [Tags and Groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).

## Get Setup Data

**GET** `http://localhost:6565/v1/setup`

{{< code >}}

```bash
curl -X GET \
  http://localhost:6565/v1/setup \
  -H 'Content-Type: application/json'
```

```json
{
  "data": {
    "type": "setupData",
    "id": "default",
    "attributes": {
      "data": {
        "a": 1
      }
    }
  }
}
```

{{< /code >}}

This endpoint returns the current JSON-encoded setup data.

For more detail about the setup stage please go to [Test life cycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

## Run Setup

**PUT** `http://localhost:6565/v1/setup`

{{< code >}}

```bash
curl -X POST \
  http://localhost:6565/v1/setup \
  -H 'Content-Type: application/json'
```

```json
{
  "data": {
    "type": "setupData",
    "id": "default",
    "attributes": {
      "data": {
        "a": 1
      }
    }
  }
}
```

{{< /code >}}

This endpoint executes the Setup stage and returns the result.

For more detail about the setup stage please go to [Test life cycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

## Update Setup

**PUT** `http://localhost:6565/v1/setup`

{{< code >}}

```bash
curl -X PUT \
  http://localhost:6565/v1/setup \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
        "attributes": {
            "data": {
                "a": 1,
                "b": 2
            }
        },
        "id": "default",
        "type": "setupData"
    }
}'
```

```json
{
  "data": {
    "type": "setupData",
    "id": "default",
    "attributes": {
      "data": {
        "a": 1,
        "b": 2
      }
    }
  }
}
```

{{< /code >}}

This endpoint parses the JSON request body and sets the result as Setup data.

For more detail about the setup stage please go to [Test life cycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

## Stop Test

**PATCH** `http://localhost:6565/v1/status`

{{< code >}}

```bash
curl -X PATCH \
  http://localhost:6565/v1/status \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "type": "status",
       "id": "default",
       "attributes": {
        "stopped": true
       }
    }
}'
```

```json
{
  "data": {
    "type": "status",
    "id": "default",
    "attributes": {
      "stopped": true
    }
  }
}
```

{{< /code >}}

This call parses the JSON request body to update the status and stop a running test.
