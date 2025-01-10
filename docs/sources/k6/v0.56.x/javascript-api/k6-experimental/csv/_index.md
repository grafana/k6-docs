---
title: 'csv'
description: 'k6 csv experimental API'
weight: 10
---

# csv

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The `k6-experimental/csv` module provides efficient ways to handle CSV files in k6, offering faster parsing and lower memory
usage compared to traditional JavaScript-based libraries.

This module includes functionalities for both full-file parsing and streaming, allowing users to choose between
performance and memory optimization.

## Key features

- The [`csv.parse()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) function parses a complete CSV file into a SharedArray, leveraging Go-based processing for better performance and reduced memory footprint compared to JavaScript alternatives.
- The [`csv.Parser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) class is a streaming parser that reads CSV files line-by-line, optimizing memory usage and giving more control over the parsing process through a stream-like API.

### Benefits

- **Faster parsing**: The [`csv.parse()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) function bypasses the JavaScript runtime, significantly speeding up parsing for large CSV files.
- **Lower memory usage**: Both [`csv.parse()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) and [`csv.Parser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) support shared memory across virtual users (VUs) when using the [`fs.open()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/open) function.
- **Flexibility**: Users can choose between full-file parsing with [`csv.parse`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) for speed or line-by-line streaming with [`csv.Parser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) for memory efficiency.

### Trade-offs

- The [`csv.parse()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) function parses the entire file during the initialization phase, which might increase startup time and memory usage for large files. Best for scenarios where performance is more important than memory consumption.
- The [`csv.Parser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) class processes the file line-by-line, making it more memory-efficient but potentially slower due to the overhead of reading each line. Suitable for scenarios where memory usage is critical or more granular control over parsing is needed.

## API

| Function/Object                                                                                  | Description                                                                                       |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [csv.parse()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) | Parses an entire CSV file into a SharedArray for high-performance scenarios.                      |
| [csv.Parser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) | A class for streaming CSV parsing, allowing line-by-line reading with minimal memory consumption. |

## Example

### Parsing a full CSV File into a SharedArray

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';
import { scenario } from 'k6/execution';

export const options = {
  iterations: 10,
};

const file = await open('data.csv');

// The `csv.parse` function consumes the entire file at once and returns
// the parsed records as a `SharedArray` object.
const csvRecords = await csv.parse(file, { delimiter: ',' });

export default async function () {
  // `csvRecords` is a `SharedArray`. Each element is a record from the CSV file, represented as an array
  // where each element is a field from the CSV record.
  //
  // Thus, `csvRecords[scenario.iterationInTest]` will give us the record for the current iteration.
  console.log(csvRecords[scenario.iterationInTest]);
}
```

{{< /code >}}

### Streaming a CSV file line-by-line

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

export const options = {
  iterations: 10,
};

const file = await open('data.csv');

// The `csv.parse` function consumes the entire file at once and returns
// the parsed records as a `SharedArray` object.
const parser = new csv.Parser(file);

export default async function () {
  // The parser `next` method attempts to read the next row from the CSV file.
  //
  // It returns an iterator-like object with a `done` property that indicates whether
  // there are more rows to read, and a `value` property that contains the row fields
  // as an array.
  const { done, value } = await parser.next();
  if (done) {
    throw new Error('No more rows to read');
  }

  // We expect the `value` property to be an array of strings, where each string is a field
  // from the CSV record.
  console.log(done, value);
}
```

{{< /code >}}
