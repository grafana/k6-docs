---
title: Reuse and re-run tests 
excerpt: 
---

By the end of the previous section, your script has advanced from simple component testing to more wholistic testing.
The script is getting long, and, more importantly it has parts that you'd like to reuse in later tests.

For ongoing operations, design your tests for re-use, and modularize components as you would in any JavaScript development.


## Modularize logic

To modularize iteration code:
1. Extract the tested endpoints into separate files.
1. Export them from their file and import them into the main test

## Modularize workload

On a similar note, you can save your Options object (or its object properties as JSON).

## Mix and match logic

With modularized configuration and logic, you can mix and match logic.
An easy way to configure this is through environment variables.

What's the next step? Perhaps automate the test completely.

## Next steps



Now you've seen examples to write tests, assert for performance, filter results, and modularize scripts.

Of course, these examples just scratch the surface of k6 full capabilities.


