---
title: "patch( url, [body], [params] )"
description: "Issue an HTTP PATCH request."
---

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | string | Request URL (e.g. `http://example.com`). |
| body (optional) | string / object | Request body; objects will be `x-www-form-urlencoded`. |
| params (optional) | object | [Params](/javascript-api/k6-http/params) object containing additional request parameters |


### Returns

| Type | Description |
| ---- | ----------- |
| [Response](/javascript-api/k6-http/response) | HTTP Response object. |
