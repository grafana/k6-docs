---
title: 'Components'
description: 'Understand the components that make up k6 Studio'
weight: 400
---

# Components

The k6 Studio desktop application consists of three components:

- [**Recorder**](https://grafana.com/docs/k6-studio/components/test-recorder/): The Recorder can help you generate a HAR file. When you start a recording, the application uses a proxy recorder and launches an instance of Chrome, and records the traffic from your actions on the browser.
- [**Generator**](https://grafana.com/docs/k6-studio/components/test-generator/): The Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it. You can use it to define a list of hosts to allow or remove from your script, include variables in your script, and configure rules to extract values, parameterize requests, and more.
- [**Validator**](https://grafana.com/docs/k6-studio/components/test-validator/): The Validator can help you validate that a test script is working as expected. You can use it to run one iteration of your test, and visualize the request and response of any requests on your test script. The Validator works with any k6 test script, not only scripts generated via the Generator.

Each component can be used separately. If you have a HAR recording, you can add it to the Recorder folder to visualize the request and response data, or import it into the Generator to create a new test script. You can also import a script you create manually to the Validator, and use it to run one iteration of that test.

For more details about each components, refer to their individual pages.
