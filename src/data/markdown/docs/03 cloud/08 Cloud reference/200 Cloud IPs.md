---
title: Cloud IPs
excerpt: The IPs that k6 Cloud tests run on, and how many VUs can run on each IP
---

When you look at k6 tests from the side of your server, it's often helpful to
know which IPs are associated with k6 Cloud tests.

## IP addresses used by k6 Cloud {#cloud-ip-list}

k6 uses AWS for cloud load generators.
For the IP addresses used in the different load zones and filtering methods,
refer directly to [Amazon](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

If you prefer to view the ranges directly, within the above link, the [ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json) file provides the updated list of IP addresses used by our load generators.
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

k6 has 3 tiers of hardware for load-generation. The tier we choose depends on the number of VUs allocated to a load zone.

- Tier 1 is used when there are 1-999 VUs in a load zone
- Tier 2 is used when there are 1000-4001 VUs in a load zone
- Tier 3 is used when there are more than 4001 VUs in a load zone

- Tier 1 server handles up to 300VUs
- Tier 2 server handles up to 1200VUs
- Tier 3 server handles up to 5000VUs

Regardless of the tier, the amount of resources (CPU, Memory, Network) per VU is the same.

For example, if you start a test with 900VUs, we will use 3x Tier 1 servers. That means that the traffic generated from our service will be coming from 3 IPs.

If you start a test with 1000VUs in a single load zone, we will use 1x Tier 2 server. If the same test is started in 2 load zones, there will be 500VUs per load zone and 4x Tier 1 servers will be used.

<Blockquote mod="node" title="">

Note that these are the _defaults_. If your tests have specific requirements, please contact k6 support for a custom solution.

</Blockquote>
