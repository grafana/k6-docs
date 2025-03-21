---
title: 'Error Codes'
description: 'Error codes are unique numbers that can be used to identify and handle different application and network errors more easily.'
weight: 13
---

# Error Codes

Error codes are unique numbers that can be used to identify and handle different application and network errors more easily. For the moment, these error codes are applicable only for errors that happen during HTTP requests, but they will be reused and extended to support other protocols in future k6 releases.

When an error occurs, its code is determined and returned as both the `error_code` field of the [`http.Response`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object, and also attached as the `error_code` [tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) to any [metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) associated with that request. Additionally, for more details, the `error` metric tag and `http.Response` field will still contain the actual string error message.

Error codes for different errors are as distinct as possible, but for easier handling and grouping, codes in different error categories are also grouped in broad ranges. The current error code ranges are:

- 1000-1099 - General errors
- 1100-1199 - DNS errors
- 1200-1299 - TCP errors
- 1300-1399 - TLS errors
- 1400-1499 - HTTP 4xx errors
- 1500-1599 - HTTP 5xx errors
- 1600-1699 - HTTP/2 specific errors

The following specific error codes are currently defined:

{{< docs/shared source="k6" lookup="javascript-api/k6-errors-list.md" version="<K6_VERSION>" >}}
