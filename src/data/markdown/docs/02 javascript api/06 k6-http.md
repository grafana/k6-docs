---
title: 'k6/http'
---

The k6/http module contains functionality for performing HTTP transactions.

| Function | Description |
| -------- | ----------- |
| [batch( requests )](/javascript-api/k6-http/batch-requests)  | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do). |
| [cookieJar()](/javascript-api/k6-http/cookiejar)  | Get active HTTP Cookie jar. |
| [del( url, [body], [params] )](/javascript-api/k6-http/del-url-body-params)  | Issue an HTTP DELETE request. |
| [file( data, [filename], [contentType] )](/javascript-api/k6-http/file-data-filename-contenttype)  | Create a file object that is used for building multi-part requests. |
| [get( url, [params] )](/javascript-api/k6-http/get-url-params)  | Issue an HTTP GET request. |
| [options( url, [body], [params] )](/javascript-api/k6-http/options-url-body-params)  | Issue an HTTP GET request. |
| [patch( url, [body], [params] )](/javascript-api/k6-http/patch-url-body-params)  | Issue an HTTP PATCH request. |
| [post( url, [body], [params] )](/javascript-api/k6-http/post-url-body-params)  | Issue an HTTP POST request. |
| [put( url, [body], [params] )](/javascript-api/k6-http/put-url-body-params)  | Issue an HTTP PUT request. |
| [request( method, url, [body], [params] )](/javascript-api/k6-http/request-method-url-body-params)  | Issue any type of HTTP request. |

| Class | Description |
| -------- | ----------- |
| [CookieJar (k6/http)](/javascript-api/k6-http/cookiejar-k6-http)  |  Used for storing cookies, set by the server and/or added by the client. |
| [FileData (k6/http)](/javascript-api/k6-http/filedata-k6-http)  |  Used for wrapping data representing a file when doing multipart requests (file uploads). |
| [Params (k6/http)](/javascript-api/k6-http/params-k6-http)  |  Used for setting various HTTP request-specific parameters such as headers, cookies, etc. |
| [Response (k6/http)](/javascript-api/k6-http/response-k6-http)  |  Returned by the http.* methods that generate HTTP requests. |
