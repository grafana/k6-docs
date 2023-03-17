---
title: Cloud IPs
description: The IPs that k6 tests run on, and how many VUs can run on each IP
aliases:
  - /docs/k6/reference/cloud-ips/
---

# Cloud IPs

When you look at k6 tests from the side of your server, it's often helpful to
know which IPs are associated with k6 Cloud tests.
For example, you could use the IPs to identify traffic sources, or to bypass network rate limits.


## IP addresses used by the k6 app  {#cloud-ip-list}

k6 uses AWS for load generators.
Generally, the app and documentation refer to geographically distributed load generators as [load zones]({{< relref "../author-run/cloud-scripting-extras/load-zones" >}}).
For the IP addresses used in the different load zones and filtering methods,
refer directly to the [Amazon IP ranges](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

If you prefer to view the ranges directly, this [`ip-ranges.json`](https://ip-ranges.amazonaws.com/ip-ranges.json) file provides the updated list of IP addresses used by our load generators.
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

**Tier 1**
: 1-999 VUs allocated to the load zone

**Tier 2**
: 1000-4001 VUs allocated to the load zone

**Tier 3**
: 4001-5000 VUs allocated to the load zone

Regardless of the tier, the amount of resources (CPU, Memory, Network) per VU is the same.
For example, if you start a test with 400VUs, k6 uses 1 Tier 1 server,
meaning that the traffic generated from our service comes from 1 IP.

If you start a test with 1000VUs in a single load zone, k6 uses one Tier 2 server.
If the same test is started in 2 load zones, k6 would allocate 500VUs per load zone and use two Tier 1 servers.

