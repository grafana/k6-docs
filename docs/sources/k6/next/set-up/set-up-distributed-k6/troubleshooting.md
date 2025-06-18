---
aliases:
  - ./troubleshooting # docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/troubleshooting
weight: 400
title: Troubleshoot
---

# Troubleshoot

This topic includes instructions to help you troubleshoot common issues with the k6 Operator.

If you’re using Private Load Zones in Grafana Cloud k6, refer to [Troubleshoot Private Load Zones](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/private-load-zone/troubleshoot/).

## How to troubleshoot

{{< docs/shared source="k6" lookup="k6-operator/troubleshooting-how-to.md" version="<K6_VERSION>" >}}

## Common scenarios

### Issues with environment variables

Refer to [Environment variables](https://github.com/grafana/k6-operator/blob/main/docs/env-vars.md) for details on how to pass environment variables to the k6 Operator.

### Tags not working

Tags are a rather common source of errors when using the k6 Operator. For example, the following tags would lead to parsing errors:

```yaml
  arguments: --tag product_id="Test A"
  # or
  arguments: --tag foo=\"bar\"
```

You can see those errors in the logs of either the initializer or the runner Pod, for example:

```bash
time="2024-01-11T11:11:27Z" level=error msg="invalid argument \"product_id=\\\"Test\" for \"--tag\" flag: parse error on line 1, column 12: bare \" in non-quoted-field"
```

This is a common problem with escaping the characters. You can find an [issue](https://github.com/grafana/k6-operator/issues/211) in the k6 Operator repository that can be upvoted.

### Initializer logs an error but it's not about tags

This can happen because of lack of attention to the [preparation](#preparation) step. One command that you can use to help diagnose issues with your script is the following:

```bash
k6 inspect --execution-requirements script.js
```

That command is a shortened version of what the initializer Pod is executing. If the command produces an error, there's a problem with the script itself and it should be solved outside of the k6 Operator. The error itself may contain a hint to what's wrong, such as a syntax error.

If the standalone `k6 inspect --execution-requirements` executes successfully, then it's likely a problem with `TestRun` deployment specific to your Kubernetes setup. A couple of recommendations here are:

- Review the output of the initializer Pod: is it logged by the k6 process or by something else?
  - :information_source: k6 Operator expects the initializer logs to contain only the output of `k6 inspect`. If there are any other log lines present, then the k6 Operator will fail to parse it and the test won't start. Refer to this [issue](https://github.com/grafana/k6-operator/issues/193) for more details.
- Check events in the initializer Job and Pod as they may contain another hint about what's wrong.

{{< docs/shared source="k6" lookup="k6-operator/troubleshooting-common-scenarios.md" version="<K6_VERSION>" >}}
