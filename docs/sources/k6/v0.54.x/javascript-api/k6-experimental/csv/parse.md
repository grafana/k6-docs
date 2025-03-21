---
title: 'parse( file, [options] )'
description: 'parse a CSV file into a SharedArray'
weight: 20
---

# parse( file, [options] )

The `csv.parse` function parses an entire CSV file at once and returns a promise that resolves to a [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) instance.
This function uses Go-based processing, which results in faster parsing and lower memory usage compared to JavaScript alternatives.
It's ideal for scenarios where performance is a priority, and the entire CSV file can be loaded into memory.

## Asynchronous Nature

`csv.parse` is an asynchronous function that returns a Promise. Due to k6's current limitation with the [init context](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle/) (which
doesn't support asynchronous functions directly), you need to use an asynchronous wrapper like this:

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

let file;
let csvRecords;
(async function () {
  file = await open('data.csv');
  csvRecords = await csv.parse(file, { delimiter: ',' });
})();
```

{{< /code >}}

## Parameters

| Parameter | Type                                                                                          | Description                                                     |
| :-------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| file      | [fs.File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file)    | A file instance opened using the `fs.open` function.            |
| options   | [Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/options) | An optional parameter object to customize the parsing behavior. |

## Returns

A promise resolving to a [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) instance, where each element is an array representing a CSV record, and each sub-element is a field from that record.

## Example

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';
import { scenario } from 'k6/execution';

export const options = {
  iterations: 10,
};

let file;
let csvRecords;
(async function () {
  file = await open('data.csv');

  // The `csv.parse` function consumes the entire file at once and returns
  // the parsed records as a `SharedArray` object.
  csvRecords = await csv.parse(file, { skipFirstLine: true });
})();

export default async function () {
  // `csvRecords` is a `SharedArray`. Each element is a record from the CSV file, represented as an array
  // where each element is a field from the CSV record.
  //
  // `csvRecords[scenario.iterationInTest]` gives the record for the current iteration.
  console.log(csvRecords[scenario.iterationInTest]);
}
```

{{< /code >}}

## Notes on Usage

- **Memory considerations**: `csv.parse` loads the entire CSV file into memory at once, which may lead to increased memory usage and startup time for very large files.
- **Shared memory usage**: The [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) returned by `csv.parse` is shared among all Virtual Users (VUs), reducing memory overhead when multiple VUs access the same data.
