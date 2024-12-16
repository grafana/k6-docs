---
title: Integrations & Tools
weight: 01
---

# Integrations & Tools

## Test authoring

Codeless tools to speed up the test creation.

- [Test Builder](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/test-builder) - Inspired by the Postman API Builder. Codeless UI tool to generate a k6 test quickly.
- [Browser Recorder](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-browser-recorder) - Record a user journey to create your k6 test.

## IDE extensions

Code k6 scripts in your IDE of choice. Empower your development workflow with IDE extensions.

- [Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=k6.k6) - Run k6 tests from VS Code.
- [IntelliJ IDEA](https://plugins.jetbrains.com/plugin/16141-k6) - Run k6 tests from IntelliJ IDEs. Supports debugging a k6 test via Node.js
- [IntelliSense](https://grafana.com/docs/k6/<K6_VERSION>/set-up/configure-k6-intellisense) - Get code autocompletion and in-context documentation.

## Converters

Generate a k6 script quickly from an existing file.

- [HAR-to-k6](https://github.com/k6io/har-to-k6) - Convert a HAR file to a k6 script.
- [Postman-to-k6](https://github.com/apideck-libraries/postman-to-k6) - Convert a Postman collection to a k6 script.
- [OpenAPI generator](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6) - Convert a Swagger/OpenAPI specification to a k6 script.

## Result store and visualization

k6 can output test results to various formats and 3rd-party services.

{{< column-list >}}
- [Amazon CloudWatch](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/amazon-cloudwatch)
- [Apache Kafka](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/apache-kafka)
- [CSV](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/csv)
- [Datadog](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/datadog)
- [Dynatrace](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/dynatrace)
- [Elasticsearch](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/elasticsearch)
- [Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud)
- [Grafana Cloud Prometheus](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/grafana-cloud-prometheus)
- [Grafana Dashboards](https://grafana.com/docs/k6/<K6_VERSION>/results-output/grafana-dashboards)
- [InfluxDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/influxdb)
- [JSON file](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/json)
- [Netdata](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/netdata)
- [New Relic](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/new-relic)
- [Prometheus](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write)
- [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd)
- [TimescaleDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/timescaledb)
{{< /column-list >}}

## Continuous Integration and Continuous Delivery

By automating load testing with your CI / CD tools, you can quickly see when a code change has introduced a performance regression.

{{< column-list >}}
- [AWS CodeBuild](https://k6.io/blog/integrating-k6-with-aws-codebuild/)
- [Azure Pipelines](https://k6.io/blog/integrating-load-testing-with-azure-pipelines/)
- [Bamboo](https://k6.io/blog/integrating-k6-with-bamboo/)
- [Buddy](https://k6.io/blog/integrating-k6-with-buddy-devops/)
- [CircleCI](https://k6.io/blog/integrating-load-testing-with-circleci/)
- [Flagger](https://docs.flagger.app/usage/webhooks#k6-load-tester)
- [GitHub Actions](https://k6.io/blog/load-testing-using-github-actions/)
- [GitLab](https://k6.io/blog/integrating-load-testing-with-gitlab/)
- [Google Cloud Build](https://k6.io/blog/integrating-k6-with-google-cloud-build/)
- [Jenkins](https://k6.io/blog/integrating-load-testing-with-jenkins/)
- [Keptn](https://k6.io/blog/performance-testing-in-keptn-using-k6/)
- [TeamCity](https://k6.io/blog/load-testing-using-teamcity-and-k6/)
{{< /column-list >}}

## Chaos engineering

- [Steadybit](https://k6.io/blog/chaos-engineering-with-k6-and-steadybit) - Using k6 and Steadybit for chaos engineering.
- [xk6-disruptor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor) - A k6 extension for injecting faults into k6 tests.
- [ChaosToolkit](http://chaostoolkit.org/drivers/k6/) - A collection of k6 actions and probes.
- [LitmusChaos](https://litmuschaos.github.io/litmus/experiments/categories/load/k6-loadgen/) - Simulate load generation to the target application as a part of chaos testing on Kubernetes using Litmus.

## Test management

- [Azure Test Plan](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a) - k6 load testing with Azure DevOps.
- [TestRail](https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck) - Introducing TestRail in your k6 tests.
- [Testkube](https://kubeshop.github.io/testkube/test-types/executor-k6) - Load testing with Testkube.
- [Tracetest](https://docs.tracetest.io/tools-and-integrations/integrations/k6) - Trace-based testing with Tracetest.
- [Xray](https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6) - Using Xray to validate test results in JIRA.

[Reach out to us](mailto:support@k6.io) if you have a tool or add-on that works well with k6, and we will list it here!
