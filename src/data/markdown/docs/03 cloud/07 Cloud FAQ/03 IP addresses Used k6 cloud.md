---
title: "What IP addresses are used by the k6 cloud?"
excerpt: "List of the IP addresses used by the k6 cloud"
---

k6 uses AWS for cloud load generators. For the IP addresses used in the different load zones and filtering methods please refer directly to [Amazon](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

If you prefer to view the ranges directly, within the above link, the [ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json) file provides the updated list of IP addresses used by our load generators. In order to know which IP ranges can be used, you need to filter the `service` of type EC2 and the `region` of the selected load zone/s in your test configuration.

The zone codes are mapped as follows:

<Glossary>

- `us-east1`: Ashburn
- `us-east-2`: Columbus
- `us-west-1`: Palo Alto
- `us-west-2`: Portland
- `ca-central-1`: Montreal
- `eu-west-1`: Dublin
- `eu-central-1`:  Frankfurt
- `eu-west-2`:  London
- `ap-northeast-1`: Tokyo
- `ap-northeast-2`: Seoul
- `ap-southeast-1`: Singapore
- `ap-southeast-2`: Sydney
- `ap-south-1`:  Mumbai
- `sa-east-1`: São Paulo

</Glossary>