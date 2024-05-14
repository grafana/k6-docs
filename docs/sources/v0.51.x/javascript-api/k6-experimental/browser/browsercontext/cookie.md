---
title: 'Cookie'
description: 'Browser module: Cookie Class'
---

# Cookie

Cookie class represents a cookie in the [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).

See the [HTTP Cookies documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) on the Mozilla website for more details about cookies.

| Property | Type   | Default | Description                                                                                                                                                      |
| -------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | string | `""`    | The cookie's name. Required.                                                                                                                                     |
| value    | string | `""`    | The cookie's value. Required.                                                                                                                                    |
| domain   | string | `""`    | The cookie's domain.                                                                                                                                             |
| path     | string | `'/'`   | The cookie's path.                                                                                                                                               |
| url      | string | `""`    | The cookie's URL.                                                                                                                                                |
| expires  | number | `-1`    | The cookie's expiration date as the number of seconds since the UNIX epoch. `-1` means a session cookie.                                                         |
| httpOnly | bool   | `false` | A cookie is inaccessible to the JavaScript [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) API when this property is `true`. |
| secure   | bool   | `false` | The cookie's secure flag.                                                                                                                                        |
| sameSite | string | `'Lax'` | The cookie's same site flag. It can be one of `'Strict'`, `'Lax'`, and `'None'`.                                                                                 |
