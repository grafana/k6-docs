---
title: 'Options'
description: 'Options represents the configuration for CSV parsing.'
weight: 40
---

# Options

The `Options` object describes the configuration available for the operation of parsing CSV files using the [`csv.parse`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parse) function and the [`csv.Parser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/parser) class.

## Properties

| Property      | Type              | Description                                                                                               |
| :------------ | :---------------- | :-------------------------------------------------------------------------------------------------------- |
| delimiter     | string            | The character used to separate fields in the CSV file. Default is `','`.                                  |
| asObjects     | boolean           | Whether to parse the CSV file's lines as JavaScript objects. If it is `false`, then they are parsed as arrays. Default is `false`.                                 |
| skipFirstLine | boolean           | Whether to skip the first line of the CSV file. Default is `false`.                                       |
| fromLine      | (optional) number | The line number from which to start reading the CSV file. Default is `0`.                                 |
| toLine        | (optional) number | The line number at which to stop reading the CSV file. If the option is not set, then read until the end. |

### asObjects

When `asObjects` is set to `true`, parsing operations over the CSV file will return an array of objects. The object keys are the column names from the CSV file, as inferred from the first line of the file, and the values are the field values from the CSV record. Note that the first line of the CSV file is skipped, as it is assumed to contain the column names (header row).

As a result, the following CSV file:

```csv
name,age
John,30
Jane,25
```

Will be parsed into the following array of objects:

```json
[
  { "name": "John", "age": "30" },
  { "name": "Jane", "age": "25" }
]
```

## Example

{{< code >}}

<!--md-k6:skip-->

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

const file = await open('data.csv');
const parser = new csv.Parser(file, {
  delimiter: ',',
  skipFirstLine: true,
  fromLine: 2,
  toLine: 8,
});

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
