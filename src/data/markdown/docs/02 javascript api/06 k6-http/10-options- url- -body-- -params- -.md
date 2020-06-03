---
title: "options( url, [body], [params] )"
description: "Issue an HTTP GET request."
---

| Parameter         | Type            | Description                                                                                           |
| ----------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| url               | string          | Request URL (e.g. `http://example.com`).                                                              |
| body (optional)   | string / object | Request body; objects will be `x-www-form-urlencoded`.                                                |
| params (optional) | object          | [Params](/javascript-api/k6-http/params-k6-http) object containing additional request parameters. |


### Returns

| Type     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response-k6-http) object. |
