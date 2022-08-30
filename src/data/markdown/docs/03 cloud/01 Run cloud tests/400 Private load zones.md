---
title: 'Private load zones'
excerpt: 'How to set up private load zones in k6 Cloud'
---

A private load zone is a special location that we set up for you on k6 Cloud. This location corresponds to availability zones you've selected on your own AWS account. With private load zones, you can start tests on k6 Cloud but have them execute on _your own cloud infrastructure_, provisioned within AWS.

> ⭐️ &nbsp;Private load zones are available on [the Enterprise plan](https://k6.io/pricing/) upon request.

## Benefits of using private load zones

Why might you want to use a private load zone?

One advantage of private load zones is **improved privacy or application security**. When you run a load test on a private load zone in k6 Cloud, log output from the load generator never gets sent to us, which may help avoid the accidental leaking of private information.

Another advantage of using private load zones is the ability to **leverage all of k6 Cloud's features** even with tests run on your cloud account. For example, you will be able to visualize your results in real time, have your data collated in a single place, use the Test Builder and Script Editor to create your scripts, [and more](https://k6.io/docs/cloud/#cloud-features).

## How do you use a private load zone?

First, [contact us](mailto:support@k6.io) about adding private load zones to your subscription. We will give you information about how to proceed based on your requirements, including the setup that is required on your end to allow k6 Cloud to start instances on your behalf.

Second, once we've confirmed that your private load zone is ready to go, set up your test to select the private load zone. You can do this one of two ways:
- via the [graphical Test Builder](https://k6.io/docs/test-authoring/test-builder) on k6 Cloud
- via the k6 script, within the [test options](https://k6.io/docs/using-k6/k6-options/)

Here's how to define a private load zone in the test options of your k6 script:

```javascript
export const options = {
  ext: {
    loadimpact: {
      distribution: {
        private: {
          loadZone: 'companyname:amazon:us:portland',
          percent: 100,
        },
      },
    },
  },
};
```

We will assign a load zone to you in the format `companyname:amazon:us:portland`, and you'll be able to create one in each Amazon region you'd like.

Third, [start the test](https://k6.io/docs/cloud/creating-and-running-a-test/test-authoring/#running-a-cloud-test) the way you would any other test on k6 Cloud.

k6 checks whether your k6 Cloud account has permissions to start instances in your AWS account. Assuming k6 has the appropriate privileges, k6 instructs AWS to provision a number of instances according to your selections in the test script.

The test artifacts (the test script and any test data) are transferred to your AWS instances and k6 begins to execute the test.

## FAQs about private load zones

<DescriptionList>

Is running a test on a private load zone the same as running it on-premises?
: No. In an on-premises load test, the test is executed on machines in your data center. You would have to physically provision and maintain these machines. We are working on a way to run distributed load tests entirely on-premise, but this feature is not yet available.
: When you run a test on a private load zone, the test is executed on instances started in your AWS cloud account. These machines are physically located in geographical zones that you specify during setup.

Can you start private load zones in Azure, GCP, or other cloud providers?
: No. At the moment, you can only start private load zones in AWS.

Can I use a mix of private and public load zones?
: Yes, you can run tests on a combination of private and public load zones on k6 Cloud, and you can specify the percentage of load that you'd like to run on each zone within the script or within Test Builder.

How long does it take to start a test on a private load zone?
: Once a private load zone has been set up, it will take only slightly more time to start a test on it than it would on a public load zone. This is because we reuse public load generators to improve startup time, but we can't use this strategy for private load zones at this point. However, the difference between the two shouldn't be more than a few seconds.

Can I get live cloud logs from my private load zone?
: You'll be able to get all the *metrics* (response time, rps, errors, etc.) from k6, but at the moment, you won't be able to see log output from load generators within private load zones. We intend to address this in the future.

</DescriptionList>

## Read more

- [k6 Office Hours live stream about private load zones](https://youtu.be/sqKc95zdXyI)
