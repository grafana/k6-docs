---
title: 'Parser'
description: 'A CSV parser for streaming CSV parsing, allowing line-by-line reading with minimal memory consumption.'
weight: 30
---

# Parser

The `csv.Parser` class provides a streaming parser that reads CSV files line-by-line, offering fine-grained control over the parsing process and minimizing memory consumption.
It's well-suited for scenarios where memory efficiency is crucial or when you need to process large CSV files without loading the entire file into memory.

## Asynchronous nature

The `csv.Parser` class methods are asynchronous and return Promises.
Due to k6's current limitation with the [init context](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle/#the-init-stage) (which doesn't support asynchronous functions directly), you need to use an asynchronous wrapper such as:

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

let file;
let parser;
(async function () {
  file = await open('data.csv');
  parser = new csv.Parser(file);
})();
```

{{< /code >}}

## Constructor

`new csv.Parser(file, options)` Creates a new Parser instance for streaming CSV parsing.

### Parameters

| Parameter | Type                                                                                          | Description                                                     |
| :-------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| file      | [fs.File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file)    | A file instance opened using the fs.open function.              |
| options   | [Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/options) | An optional parameter object to customize the parsing behavior. | An optional parameter object to customize the parsing behavior. Options can include delimiter (string). |

### Methods

| Name     | Description                                                                                           |
| :------- | :---------------------------------------------------------------------------------------------------- |
| `next()` | Reads the next line from the CSV file and returns a promise that resolves to an iterator-like object. |

### Returns

A promise resolving to an object with the following properties:

| Property | Type     | Description                                                                                           |
| :------- | :------- | :---------------------------------------------------------------------------------------------------- |
| done     | boolean  | Indicates whether there are more rows to read (false) or the end of the file has been reached (true). |
| value    | string[] | Contains the fields of the CSV record as an array of strings. If done is true, value is undefined.    |

## Example

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

export const options = {
  iterations: 10,
};

let file;
let parser;
(async function () {
  file = await open('data.csv');
  parser = new csv.Parser(file, { skipFirstLine: true });
})();

export default async function () {
  // The `next` method attempts to read the next row from the CSV file.
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

## Notes on usage

- **Memory efficiency**: Since `csv.Parser` reads the file line-by-line, it keeps memory usage low and avoids loading the entire set of records into memory. This is particularly useful for large CSV files.
- **Streaming control**: The streaming approach provides more control over how records are processed, which can be beneficial for complex data handling requirements.
