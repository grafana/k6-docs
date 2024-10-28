---
title: 'k6/http'
descriptiontiontion: 'The k6/http module contains functionality for performing HTTP transactions.'
weight: 09
---

# k6/http

The k6/http module contains functionality for performing HTTP transactions.

| Function                                                                                                                       | Description                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [batch( requests )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/batch)                                     | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).                                                                 |
| [cookieJar()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar-method)                                | Get active HTTP Cookie jar.                                                                                                               |
| [del( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/del)                            | Issue an HTTP DELETE request.                                                                                                             |
| [file( data, [filename], [contentType] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/file)                | Create a file object that is used for building multi-part requests.                                                                       |
| [get( url, [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/get)                                    | Issue an HTTP GET request.                                                                                                                |
| [head( url, [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head)                                  | Issue an HTTP HEAD request.                                                                                                               |
| [options( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/options)                    | Issue an HTTP OPTIONS request.                                                                                                            |
| [patch( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/patch)                        | Issue an HTTP PATCH request.                                                                                                              |
| [post( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post)                          | Issue an HTTP POST request.                                                                                                               |
| [put( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/put)                            | Issue an HTTP PUT request.                                                                                                                |
| [request( method, url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request)            | Issue any type of HTTP request.                                                                                                           |
| [asyncRequest( method, url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/asyncrequest)  | Issue any type of HTTP request asynchronously.                                                                                            |
| [setResponseCallback(expectedStatuses)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback) | Sets a response callback to mark responses as expected.                                                                                   |
| [url\`url\`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url)                                              | Creates a URL with a name tag. Read more on [URL Grouping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests#url-grouping). |
| [expectedStatuses( statusCodes )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses)           | Create a callback for setResponseCallback that checks status codes.                                                                       |

| Class                                                                                  | Description                                                                              |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [CookieJar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) | Used for storing cookies, set by the server and/or added by the client.                  |
| [FileData](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/filedata)   | Used for wrapping data representing a file when doing multipart requests (file uploads). |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params)       | Used for setting various HTTP request-specific parameters such as headers, cookies, etc. |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response)   | Returned by the http.\* methods that generate HTTP requests.                             |
