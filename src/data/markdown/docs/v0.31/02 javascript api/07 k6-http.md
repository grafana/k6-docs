---
title: 'k6/http'
excerpt: 'The k6/http module contains functionality for performing HTTP transactions.'
---

The k6/http module contains functionality for performing HTTP transactions.

| Function | Description |
| -------- | ----------- |
| [batch( requests )](/javascript-api/v0-31/k6-http/batch-requests)  | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do). |
| [cookieJar()](/javascript-api/v0-31/k6-http/cookiejar-method)  | Get active HTTP Cookie jar. |
| [del( url, [body], [params] )](/javascript-api/v0-31/k6-http/del-url-body-params)  | Issue an HTTP DELETE request. |
| [file( data, [filename], [contentType] )](/javascript-api/v0-31/k6-http/file-data-filename-contenttype)  | Create a file object that is used for building multi-part requests. |
| [get( url, [params] )](/javascript-api/v0-31/k6-http/get-url-params)  | Issue an HTTP GET request. |
| [options( url, [body], [params] )](/javascript-api/v0-31/k6-http/options-url-body-params)  | Issue an HTTP OPTIONS request. |
| [patch( url, [body], [params] )](/javascript-api/v0-31/k6-http/patch-url-body-params)  | Issue an HTTP PATCH request. |
| [post( url, [body], [params] )](/javascript-api/v0-31/k6-http/post-url-body-params)  | Issue an HTTP POST request. |
| [put( url, [body], [params] )](/javascript-api/v0-31/k6-http/put-url-body-params)  | Issue an HTTP PUT request. |
| [request( method, url, [body], [params] )](/javascript-api/v0-31/k6-http/request-method-url-body-params)  | Issue any type of HTTP request. |
| [setResponseCallback(expectedStatuses)](/javascript-api/v0-31/k6-http/setresponsecallback-callback)  | Sets a response callback to mark responses as expected. |
| [expectedStatuses( statusCodes )](/javascript-api/v0-31/k6-http/expectedstatuses-statuses)  | Create a callback for setResponseCallback that checks status codes. |

| Class | Description |
| -------- | ----------- |
| [CookieJar](/javascript-api/v0-31/k6-http/cookiejar)  |  Used for storing cookies, set by the server and/or added by the client. |
| [FileData](/javascript-api/v0-31/k6-http/filedata)  |  Used for wrapping data representing a file when doing multipart requests (file uploads). |
| [Params](/javascript-api/v0-31/k6-http/params)  |  Used for setting various HTTP request-specific parameters such as headers, cookies, etc. |
| [Response](/javascript-api/v0-31/k6-http/response)  |  Returned by the http.* methods that generate HTTP requests. |
