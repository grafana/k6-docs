---
title: Analyze results
excerpt: Use k6 to write custom metrics and filter results.
---


The end-of-test summary provides only an overview of performance.
In real analysis, it helps to be able to analyze the test along data points.

Two methods to make results more meaningful are to use tags to filter results,
and to create custom metrics to study performance of a certain block.

## Write data points to a file

k6 provides many output structures.
One of the most commonly used is JSON.

To output results as JSON, use the out flag.

~~~bash
k6 run --out json=results.json tutorial.js
~~~

Then, you can filter the output with the tool of your choice.

k6 results have a number of built-in tags.
For example, run this `jq` command to filter results to only results where the status is 200:

```
jq '. | select(.data.tags.status >= "200")' results.json
```

## Add tags for further filtering



## Organize in groups

## Make custom metric


