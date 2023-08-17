---
title: Cloud IPs
excerpt: The IPs that k6 Cloud tests run on, and how many VUs can run on each IP
---

When you look at k6 tests from the side of your server, it's often helpful to
know which IPs are associated with k6 Cloud tests.

## IP addresses used by k6 Cloud {#cloud-ip-list}

k6 Cloud uses AWS for load generators. Generally, in the k6 Cloud app, and our documentation, we will refer to geographically distributed load generators as [load zones](https://k6.io/docs/misc/glossary/#load-zone).
For the IP addresses used in the different load zones and filtering methods,
refer directly to [Amazon](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

If you prefer to view the ranges directly, this [ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json) file provides the updated list of IP addresses used by our load generators.
To find the IP ranges that you can use, filter the `service` of type EC2 and the `region` of the selected load zones in your test configuration.

The zone codes are mapped as follows:

<Glossary>

- `af-south-1`: Cape Town
- `ap-east-1`: Hong Kong
- `ap-northeast-1`: Tokyo
- `ap-northeast-2`: Seoul
- `ap-northeast-3`: Osaka
- `ap-southeast-1`: Singapore
- `ap-southeast-2`: Sydney
- `ap-south-1`:  Mumbai
- `ca-central-1`: Montreal
- `eu-north-1`: Stockholm
- `eu-central-1`:  Frankfurt
- `eu-south-1`: Milan
- `eu-west-1`: Dublin
- `eu-west-2`:  London
- `eu-west-3`:  Paris
- `me-south-1`: Bahrain
- `us-east1`: Ashburn
- `us-east-2`: Columbus
- `us-west-1`: Palo Alto
- `us-west-2`: Portland
- `sa-east-1`: São Paulo

</Glossary>


## Maximum VUs per IP {#vu-per-tier}

<Blockquote mod="note" title="These are defaults">

If your tests have specific requirements, contact k6 support for a custom solution.

</Blockquote>

k6 has 3 tiers of hardware for load generation.
The tier k6 chooses depends on the number of VUs allocated to a load zone.

First step is to determine the number of VUs per load zone.

- Tier 1 when the load zone has 1-999 VUs
- Tier 2 when the load zone has 1000-4001 VUs
- Tier 3 when the load zone has 4001-5000 VUs

Second step is to determine the number of VUs per instance.

- Tier 1 instances can host up to 300 VUs
- Tier 2 instances can host up to 1200 VUs
- Tier 3 instances can host up to 5000 VUs

Regardless of the tier, the amount of resources (CPU, Memory, Network) per VU is the same.

For example, if you start a test with 400VUs, k6 uses 2 Tier 1 servers, with each of them hosting 200 VUs. This means that the traffic generated from our service comes from 2 IPs.

If you start a test with 1000VUs in a single load zone, k6 uses 1x Tier 2 server.
If the same test is started in 2 load zones, k6 would allocate 500 VUs per load zone and use 4x Tier 1 servers.


## Buy static IPs

If you don't want to run your tests from these default IP ranges, you can also purchase static IPs.
A static IP doesn't change.
After you purchase a static IP, only your organization can access it.

Reasons to run your tests from a static IP include security and convenience.
With static IPs, you can:
- Reduce the number of IPs that you must [open your firewall](/cloud/creating-and-running-a-test/troubleshooting/#open-a-firewall-for-k6-cloud) to.
- Avoid exposing your service to any IP besides the ones specially dedicated to be your load generators.

Refer to the [Pricing page](https://k6.io/pricing/) to check the price per dedicated IP per month.
If you're interested in using static IPs with your cloud tests, contact k6 customer support!
