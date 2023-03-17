---
title: Author and run tests
description: Write tests to run on Grafana k6 Cloud
weight: 200
aliases:
  - /docs/k6/author-run/
---

# Author and run tests

k6 emphasizes a _code-based_ approach to testing, which makes it easier to modularize scripts, track changes, and automate tests.
This code-based approach carries over to cloud execution, which has a few extra scripting capabilities and tags.
In the following topics, read about how to author and run tests in Grafana k6:

However, along with the scripting API, the Grafana Cloud k6 ecosystem provides some supportive tools to speed up test creation and facilitate collaboration across different roles.

## Tools to prototype tests

To author tests quickly, you can use the following tools:

- [The Test builder]({{< relref "test-builder" >}}) is a graphical test builder.
- The script editor is a web-based editor in k6 cloud.
- The [HAR convertor](https://k6.io/docs/test-authoring/recording-a-session/har-converter/) turns a HAR file into a k6 test script.

All these tools make portable scripts, which you can later modify in your code editor.

