---
title: About test scenarios
description: |
  Learn about how to model user logic and load in a k6 scenario. 
weight: 999
aliases:
  - /docs/k6/author-run/about-scenarios/
---

# About test scenarios

In k6, you can configure both logic and load in a _scenario_.
Whether you write your tests from the Test Builder or your code editor,
understanding scenarios will help you model realistic load tests.

A realistic load test should account for both the behavior of its virtual users and the load that these users put on your application.
- _Test logic_ models user behavior. What does the user do when it interacts with the system?
- _Load_ models traffic. How many users come to interact with the system? Is the number constant or changing?

A single test can have multiple scenarios.
This provides much flexibility to model realistic patterns.

## Example of a scenario to model a real-world case

For example, consider the different personas and behaviors of the user base of a community-run encyclopedia.
Perhaps the majority of traffic comes from readers, who mainly click links to GET new pages.
However, the most data-intensive traffic may come from editors, who update pages and cause writes to the database.

Use scenarios to model diverse traffic patterns and behaviors.
In the example of the community-run encyclopedia, one scenario could simulate 1000 concurrent users reading different text pages,
and another could simulate 100 editors who log in and then do actions that cause writes to the application database.
Each scenario could also have different load shapes (for example, ramping or constant).

## Configure scenarios

In your test scripts, configure scenarios in the `options` object.

```
export const options = {
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      ...
    }
```

- For detailed conceptual info and scenario configuration, refer to [Scenarios](https://k6.io/docs/using-k6/scenarios) in the k6 OSS docs.
- To declare scenarios from the Test Builder, refer to the [Test Builder]({{< relref "test-builder" >}}) docs.






