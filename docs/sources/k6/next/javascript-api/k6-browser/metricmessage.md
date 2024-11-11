---
title: 'MetricMessage'
description: 'Browser module: MetricMessage Object'
weight: 03
---

# MetricMessage

A `MetricMessage` object allows tagging of metrics that are measured and emitted for the page.

`MetricMessage` objects are dispatched by the page when a handler is registered with [page.on('metric')](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on). For each metric that is measured and emitted for the page, the k6 browser module delivers a `MetricMessage` object to the registered handlers, allowing them to pattern match and tag metrics.

## tag

The `tag` method matches the given `matches` with the current metric's url and name tags. When a match is found, it will use `name` to replace the existing URL and name tag values.

Doing this helps group metrics with different URL and name tags, which are, in fact, referencing the same resource so that a correlation can be found over time and to reduce the cardinality of the metrics.

<TableWithNestedRows>

| Parameter               | Type     | Description                                                                                                                                                                                                                                                                                 |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tagMatch                | object   | It is required. The tagMatch object and its properties that are used for matching metrics.                                                                                                                                                                                                  |
| tagMatch.name           | string   | It is a required field and it must not be an empty string. It will replace the current metric's url and name tag values when a match is found.                                                                                                                                              |
| tagMatch.matches        | object[] | It is a required field. It is an array of objects containing the regular expression and optional method to match against the current metric's url and name tags. It will iterate over all the objects in `matches` until a match is found, or to the end of the array if no match is found. |
| tagMatch.matches.url    | RegExp   | It is a required field. It is used to match against the current metric url and name tags.                                                                                                                                                                                                   |
| tagMatch.matches.method | string   | It is optional. When it is not set, a match will occur on all method types. When it is set, it will match on the one method that is set. Valid values are `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`, `'OPTIONS'`, `'HEAD'`, `'TRACE'` and `'CONNECT'`                               |

</TableWithNestedRows>

### Example Usage

{{< code >}}

<!-- eslint-skip-->

```javascript
// First we need to register a handler with `page.on('metric')`.
page.on('metric', (metric) => {
  // It will find a match between the current metric url and name tags against
  // the supplied regular expression in `url`.
  metric.tag({
    // This is the new name value that will replace the existing value in the
    // url and name tags when a match is found.
    name: 'test',
    // You can provide multiple matches here.
    matches: [
      {
        url: /^https:\/\/test\.k6\.io\/\?q=[0-9a-z]+$/,
        // When a method is defined it will also need to match on that too. If a
        // method is not provided it will match on all method types.
        method: 'GET',
      },
    ],
  });
});
```

{{< /code >}}
