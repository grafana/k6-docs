---
title: 'URLs with query parameters'
description: 'Scripting examples using URL and URLSearchParams modules.'
weight: 21
---

# URLs with query parameters

How to use **URL** and **URLSearchParams** imported from [jslib.k6.io](https://jslib.k6.io/) to construct URLs with/without query parameters.

## URL

{{< code >}}

```javascript
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';

export default function () {
  const url = new URL('https://k6.io');

  url.searchParams.append('utm_medium', 'organic');
  url.searchParams.append('utm_source', 'test');
  url.searchParams.append('multiple', ['foo', 'bar']);

  const res = http.get(url.toString());
  // https://k6.io?utm_medium=organic&utm_source=test&multiple=foo%2Cbar
}
```

{{< /code >}}

<!-- vale off -->

| Name                  | Type        | Description                                                                                                                                                  |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URLSearchParams(init) | Constructor | `init` Optional: One of [USVString, sequence of pairs or record ]                                                                                            |
| toString()            | Method      | Returns a USVString containing the whole URL                                                                                                                 |
| hash                  | Property    | A USVString containing a '#' followed by the fragment identifier of the URL.                                                                                 |
| host                  | Property    | A USVString containing the host, that is the `hostname`, and then, if the port of the URL is nonempty, a ':', followed by the `port` of the URL.             |
| hostname              | Property    | A USVString containing the [domain name](https://developer.mozilla.org/en-US/docs/Glossary/Domain_name) of the URL.                                          |
| href                  | Property    | Returns a USVString containing the whole URL.                                                                                                                |
| origin                | Property    | Returns a USVString containing the origin of the URL, that is its scheme, its domain and its port.                                                           |
| password              | Property    | A USVString containing the password specified before the domain name.                                                                                        |
| pathname              | Property    | Is a USVString containing an initial '/' followed by the path of the URL, not including the query string or fragment.                                        |
| port                  | Property    | A USVString containing the port number of the URL.                                                                                                           |
| protocol              | Property    | A USVString containing the protocol scheme of the URL, including the final ':'.                                                                              |
| search                | Property    | A USVString indicating the URL's parameter string; if any parameters are provided, this string includes all of them, beginning with the leading ? character. |
| searchParams          | Property    | A [URLSearchParams](#urlsearchparams) object which can be used to access the individual query parameters found in search.                                    |
| username              | Property    | A USVString containing the username specified before the domain name.                                                                                        |

<!-- vale on -->

## URLSearchParams

{{< code >}}

```javascript
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';

export default function () {
  const searchParams = new URLSearchParams([
    ['utm_medium', 'organic'],
    ['utm_source', 'test'],
    ['multiple', 'foo'],
    ['multiple', 'bar'],
  ]);

  const res = http.get(`${'https://k6.io'}?${searchParams.toString()}`);
  // https://k6.io?utm_medium=organic&utm_source=test&multiple=foo&multiple=bar
}
```

{{< /code >}}

| Name                  | Type        | Description                                                                                                                                                                                                       |
| --------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URLSearchParams(init) | Constructor | `init` Optional: One of [USVString, sequence of pairs or record ]                                                                                                                                                 |
| toString()            | Method      | Returns a query string (questionmark is omitted).                                                                                                                                                                 |
| append()              | Method      | Appends a specified key/value pair as a new search parameter.                                                                                                                                                     |
| delete()              | Method      | Deletes the given search parameter, and its associated value, from the list of all search parameters.                                                                                                             |
| entries()             | Method      | Returns an iterator allowing iteration through all key/value pairs contained in this object.                                                                                                                      |
| forEach()             | Method      | Allows iteration through all values contained in this object via a callback function. `callback(value, key)`.                                                                                                     |
| get()                 | Method      | Returns the first value associated with the given search parameter.                                                                                                                                               |
| getAll()              | Method      | Returns all the values associated with a given search parameter.                                                                                                                                                  |
| has()                 | Method      | Returns a Boolean that indicates whether a parameter with the specified name exists.                                                                                                                              |
| keys()                | Method      | Returns an iterator allowing iteration through all keys of the key/value pairs contained in this object.                                                                                                          |
| values()              | Method      | Returns an iterator allowing iteration through all values of the key/value pairs contained in this object.                                                                                                        |
| set()                 | Method      | Sets the value associated with a given search parameter to the given value. If there were several matching values, this method deletes the others. If the search parameter doesn't exist, this method creates it. |
| sort()                | Method      | Sorts all key/value pairs, if any, by their keys.                                                                                                                                                                 |
