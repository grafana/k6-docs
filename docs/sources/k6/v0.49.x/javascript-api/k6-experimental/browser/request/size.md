---
title: 'size()'
description: 'Browser module: Request.size method'
---

# size()

Similar to Playwright's [`request.sizes()`](https://playwright.dev/docs/api/class-request#request-sizes), this method returns the size (in bytes) of body and header sections of the [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request).

### Returns

| Type   | Description                           |
| ------ | ------------------------------------- |
| object | `{ body: <bytes>, headers: <bytes> }` |
