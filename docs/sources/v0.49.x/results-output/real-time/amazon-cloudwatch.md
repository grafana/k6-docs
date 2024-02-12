---
title: 'Amazon CloudWatch'
description: 'You can send k6 results output to Amazon CloudWatch and later visualize them.'
weight: 00
---

# Amazon CloudWatch

{{% admonition type="warning" %}}

The built-in StatsD output has been deprecated on k6 v0.47.0. You can continue to use this feature by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), and this guide has been updated to include instructions for how to use it.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{% /admonition %}}

k6 can send metrics data to [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) through the [CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html) by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd). These metrics can then be visualized in dashboards.

This guide covers how to:

- Run the CloudWatch agent
- Run the k6 test
- Visualize k6 metrics in Amazon CloudWatch

## Before you begin

To use the StatsD output option, you have to build a k6 binary using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd). For more details, refer to [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd).

## Run the CloudWatch agent

We presume that you already have a machine that supports both running k6 and CloudWatch agent, which either runs a flavor of GNU/Linux or Windows. Just go ahead and [download](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html) the suitable CloudWatch agent version for your operating system.

1. Create an [IAM role](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-iam-roles-for-cloudwatch-agent.html) to send metrics to CloudWatch via the agent. Then, if you are running on Amazon EC2, just [attach](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/iam-roles-for-amazon-ec2.html#attach-iam-role) the role to your EC2 instance, so that you can send metrics to CloudWatch. Otherwise, if you are running on-premises servers, follow this [guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-commandline-fleet.html#install-CloudWatch-Agent-iam_user-first).

2. Download the CloudWatch Agent package suitable for your operating system. For example, on Debian 10 (Buster), we've used the following link. For other operating systems, please refer to this [guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html):

   ```bash
   $ wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
   ```

3. Install the package:

   ```bash
   $ sudo dpkg -i amazon-cloudwatch-agent.deb
   ```

4. Configure the agent to receive data from k6. For this, create a file called "_/opt/aws/amazon-cloudwatch-agent/etc/statsd.json_" and paste the following JSON config object into it. This configuration means that the agent would listen on port number 8125, which is the default port number for k6 and StatsD. The interval for collecting metrics is 5 seconds and we don't aggregate them, since we need the raw data later in CloudWatch.

   ```json
   {
     "metrics": {
       "namespace": "k6",
       "metrics_collected": {
         "statsd": {
           "service_address": ":8125",
           "metrics_collection_interval": 5,
           "metrics_aggregation_interval": 0
         }
       }
     }
   }
   ```

5. Run the following command to start the agent:

   ```bash
   $ sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/etc/statsd.json
   ```

6. You can check the status of the agent using the following command:

   ```bash
   $ amazon-cloudwatch-agent-ctl -a status
   ```

## Run the k6 test

Once the agent is running, you can run your test with:

{{< code >}}

```bash
$ K6_STATSD_ENABLE_TAGS=true k6 run --out output-statsd script.js
```

{{< /code >}}

Make sure you're using the k6 binary you built with the xk6-output-statsd extension.

You can look at the [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd) output page for configuration options.

## Visualize k6 metrics in Amazon CloudWatch

Visualization of the exported metrics to CloudWatch is done by creating a dashboard and selecting desired metrics to be displayed.

![List of k6 metrics](/media/docs/k6-oss/cloudwatch-k6-metrics.png)

Here's an example dashboard we've created to visualize the test results.

![k6 Dashboard on Amazon CloudWatch](/media/docs/k6-oss/cloudwatch-k6-dashboard.png)

The above dashboard is exported as JSON and is available [here](https://github.com/k6io/example-cloudwatch-dashboards).
