---
title: 'parse( file, [options] )'
description: 'parse a CSV file into a SharedArray'
weight: 20
---

# parse( file, [options] )

The `csv.parse` function parses an entire CSV file at once and returns a promise that resolves to a [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) instance.
This function uses Go-based processing, which results in faster parsing and lower memory usage compared to JavaScript alternatives.
It's ideal for scenarios where performance is a priority, and the entire CSV file can be loaded into memory.

## Parameters

| Parameter | Type                                                                                           | Description                                                     |
| :-------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| file      | [fs.File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file)     | A file instance opened using the `fs.open` function.            |
| options   | [Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/csv/options) | An optional parameter object to customize the parsing behavior. |

## Returns

A promise resolving to a [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) instance, where each element is an array representing a CSV record, and each sub-element is a field from that record.

## Examples

### Basic Usage

{{< code >}}

<!--md-k6:skip-->

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
const csvRecords = await csv.parse(file);

export default async function () {
  // `csvRecords` is a `SharedArray`. Each element is a record from the CSV file, represented as an array
  // where each element is a field from the CSV record.
  //
  // `csvRecords[scenario.iterationInTest]` gives the record for the current iteration.
  console.log(csvRecords[scenario.iterationInTest]);
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
const csvRecords = await csv.parse(file, { asObjects: true });

export default function () {
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
  console.log(csvRecords[scenario.iterationInTest]);
}
```

{{< /code >}}

## Notes on Usage

- **Memory considerations**: `csv.parse` loads the entire CSV file into memory at once, which may lead to increased memory usage and startup time for very large files.
- **Shared memory usage**: The [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) returned by `csv.parse` is shared among all Virtual Users (VUs), reducing memory overhead when multiple VUs access the same data.
