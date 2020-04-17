---
title: "What IP addresses are used by the k6 cloud?"
excerpt: "List of the IP addresses used by the k6 cloud"
---

This article contains the various IP addresses k6 uses to generate load for cloud based tests and other services. The most common reason for needing this information is to open your firewall to allow tests to reach the staging/test environment from a cloud based test. If you are streaming results to k6 Cloud utilizing `k6 run myscript.js -o cloud` you may only need to allow traffic against ingest.k6.io on port 443.

Other methods, such as header or query parameter whitelisting, may also fit your requirements. Refer to [this article](/cloud/cloud-faq/how-to-open-your-firewall-to-k6-cloud-service-for-cloud-executed-tests) for more information on those methods.

## Load Zones

k6 uses AWS for cloud load generators. For the IP addresses used in the different load zones and filtering methods please refer directly to [Amazon](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

If you prefer to view the ranges directly, within the above link, the [ip-ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json) file provides the updated list of IP addresses used by our load generators. In order to know which IP ranges can be used, you need to filter the `service` of type EC2 and the `region` of the selected load zone/s in your test configuration.

The zone codes are mapped as follows:


Code           | Name
---------------|--------------------------
us-east-1      | US East (Ashburn)
us-east-2      | US East (Columbus)
us-west-1      | US West (Palo Alto)
us-west-2      | US West (Portland)
ca-central-1   | Canada (Montreal)
eu-west-1      | EU (Dublin)
eu-central-1   | EU (Frankfurt)
eu-west-2      | EU (London)
ap-northeast-1 | Asia Pacific (Tokyo)
ap-northeast-2 | Asia Pacific (Seoul)
ap-southeast-1 | Asia Pacific (Singapore)
ap-southeast-2 | Asia Pacific (Sydney)
ap-south-1     | Asia Pacific (Mumbai)
sa-east-1      | South America (São Paulo)
