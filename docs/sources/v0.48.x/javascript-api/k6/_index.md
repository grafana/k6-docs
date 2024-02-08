---
title: 'k6'
description: 'The k6 module contains k6-specific functionality.'
weight: 02
---

# k6

The k6 module contains k6-specific functionality.

| Function                                                                                     | Description                                                                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [check(val, sets, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) | Runs one or more checks on a value and generates a pass/fail result but does not throw errors or otherwise interrupt execution upon failure. |
| [fail([err])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/fail)               | Throws an error, failing and aborting the current VU script iteration immediately.                                                           |
| [group(name, fn)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group)          | Runs code inside a group. Used to organize results in a test.                                                                                |
| [randomSeed(int)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/random-seed)    | Set seed to get a reproducible pseudo-random number using `Math.random`.                                                                     |
| [sleep(t)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep)                 | Suspends VU execution for the specified duration.                                                                                            |
