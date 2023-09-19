---
title: "Cookie"
excerpt: "Browser module: Cookie Class"
---

Cookie class representing a cookie in the [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext).

| Property | Type   | Description                                                                                                                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | string | The cookie's name. Required.                                                                                                                                                         |
| value    | string | The cookie's value. Required.                                                                                                                                                        |
| domain   | string | The cookie's domain.                                                                                                                                                                 |
| path     | string | The cookie's path. Defaults to `'/'`.                                                                                                                                                |
| url      | string | The cookie's URL.                                                                                                                                                                    |
| expires  | number | The cookie's expiration date as the number of seconds since the UNIX epoch. Defaults to `-1`, meaning a session cookie.                                                              |
| httpOnly | bool   | A cookie is inaccessible to the JavaScript [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) API when this property is `true`. Defaults to `false`. |
| secure   | bool   | The cookie's secure flag. Defaults to `false`.                                                                                                                                       |
| sameSite | string | The cookie's same site flag. It can be one of `'Strict'`, `'Lax'`, and `'None'`.                                                                                                     |