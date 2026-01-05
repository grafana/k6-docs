---
title: 'Parser'
description: 'A CSV parser for streaming CSV parsing, allowing line-by-line reading with minimal memory consumption.'
weight: 30
---

# Parser

The `csv.Parser` class provides a streaming parser that reads CSV files line-by-line, offering fine-grained control over the parsing process and minimizing memory consumption.
It's well-suited for scenarios where memory efficiency is crucial or when you need to process large CSV files without loading the entire file into memory.

## Constructor

| Parameter | Type                                                                                          | Description                                                                                               |
| :-------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| file      | [fs.File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file)    | A file instance opened using the fs.open function.                                                        |
| options   | [Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/options) | An optional parameter object to customize the parsing behavior. Options can include a delimiter (string). |

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

### Basic Usage

{{< code >}}

<!--md-k6:skip-->

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

export const options = {
  iterations: 10,
};

const file = await open('data.csv');
const parser = new csv.Parser(file, { skipFirstLine: true });

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

### Using `asObjects`

The `asObjects` option parses the CSV file into an array of objects. The object keys are the column names from the CSV file, and the values are the field values from the CSV record.
Note that the first line of the CSV file is skipped, as it is assumed to contain the column names (header row).

{{< code >}}

<!--md-k6:skip-->

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';
import { scenario } from 'k6/execution';

export const options = {
  iterations: 3,
};

const file = await open('data.csv');
const parser = new csv.Parser(file, { asObjects: true });

export default async function () {
  // Will print the record for the current iteration as an object.
  //
  // For example, given the following CSV file:
  //
  // firstname,lastname
  // francois,mitterand
  // helmut,kohl
  // pierre,mendes-france
  //
  // The test will print:
  //
  // { firstname: 'francois', lastname: 'mitterand' }
  // { firstname: 'helmut', lastname: 'kohl' }
  // { firstname: 'pierre', lastname: 'mendes-france' }
  const { done, value } = await parser.next();
  if (done) {
    throw new Error('No more rows to read');
  }

  console.log(value);
}
```

{{< /code >}}

## Notes on usage

- **Memory efficiency**: Since `csv.Parser` reads the file line-by-line, it keeps memory usage low and avoids loading the entire set of records into memory. This is particularly useful for large CSV files.
- **Streaming control**: The streaming approach provides more control over how records are processed, which can be beneficial for complex data handling requirements.
