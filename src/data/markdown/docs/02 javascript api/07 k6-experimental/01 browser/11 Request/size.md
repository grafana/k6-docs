---
title: 'size()'
excerpt: 'Browser module: Request.size method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/request/size/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/request/size/
---

Similar to Playwright's [`request.sizes()`](https://playwright.dev/docs/api/class-request#request-sizes), this method returns the size (in bytes) of body and header sections of the [Request](/javascript-api/k6-experimental/browser/request).

### Returns

| Type   | Description                           |
|--------|---------------------------------------|
| object | `{ body: <bytes>, headers: <bytes> }` |
