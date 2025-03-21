---
title: 'Using the HAR converter'
description: 'The HAR converter is an alternative to the Browser recorder. It generates a k6 script based on the HTTP requests included on a HAR file.'
weight: 02
---

# Using the HAR converter

The [har-to-k6 converter](https://github.com/k6io/har-to-k6) is a NodeJS tool that generates a k6 script based on the HTTP requests included in a [HAR file](<https://en.wikipedia.org/wiki/HAR_(file_format)>).
It is an alternative to the [Browser recorder](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-browser-recorder).

{{< admonition type="note" >}}

HAR is a file format used by all major browsers and various other tools to export recorded HTTP requests.

{{< /admonition >}}

## Before you start

Before you start, consider the following:

- [Be sure to record realistically](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings#be-sure-to-record-realistically)
- [A hybrid approach for load testing websites](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings#consider-hybrid-approach-for-load-testing-websites)

You'll need to choose a tool to record your HAR file.
Multiple browsers and tools can export HTTP traffic in a HAR format.
A few popular ones are:

- [Chrome](https://www.google.com/chrome/)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Microsoft Edge](https://www.microsoft.com/en-us/edge)
- [Charles recording proxy](http://www.charlesproxy.com/)(HTTP proxy/recorder)
- [Fiddler](http://www.telerik.com/fiddler) (HTTP proxy/recorder)

## 1. Record a HAR file

Here are the basic steps you need to record in Chrome:

1. Open a new incognito window in Chrome. (This is optional, but it means you won't send things like cookies, which your browser might have saved).
1. Open up Chrome developer tools (press F12).
1. Select the **Network** tab.
1. Check that the recording button (round button) is activated (red color).
1. If you want to make a recording of several successive page loads, select the **Preserve log** checkbox.
1. Enter the URL of your site and start doing whatever you want your simulated load-test users to do.
1. When done, in Chrome developer tools, right-click the URLs and choose **Save as HAR with content**.

![Save HAR for load testing](/media/docs/k6-oss/session_recorder_save_as_har.png)

## 2. Convert with `har-to-k6`

The [har-to-k6 converter](https://github.com/k6io/har-to-k6) is a NodeJS tool that can convert a HAR file (browser session) into a k6 script.

1. Make sure that you have installed NodeJS (version >=11.0.0).
1. Install the converter. You can use `npm`:

   ```bash
   $ npm install -g har-to-k6
   ```

   For other installation options, check out the [har-to-k6 installation instructions](https://github.com/k6io/har-to-k6#installation).

1. Generate a k6 script from a HAR file with the convert command:

   ```bash
   $ har-to-k6 myfile.har -o loadtest.js
   ```

   This command auto-generates a k6 script for you.
   It reads the HAR file (_myfile.har_) and converts it into a k6 test (_loadtest.js_).

## 3. Modify the auto-generated k6 script

In the previous step, the converter created a k6 script for testing.
Now, you should evaluate whether you have to change any part of the k6 script.

Depending on your use case, you might need to:

- Configure the load options
- Remove third-party content
- Correlate dynamic data

### Configure the load options

Now, k6 has auto-generated a "functional" test.
By default, this test runs with one virtual user and for one iteration.

It's time for you to configure the load options of your performance tests.
k6 lets you configure this in several ways:

- As CLI arguments while running the test:

  ```bash
  k6 run --vus 10 --duration 30s loadtest.js
  ```

- As options in the script file.

  ```javascript
  export const options = {
    vus: 10,
    duration: '30s',
  };
  ```

To learn more about how to configure the load options, read the [Adding more VUs guide](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6#adding-more-vus) and the [Options guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options).

### Remove third-party content

If you are recording a user session of a website, by default, you'll record all the HTTP requests that your website uses.
This includes requests from the third-party tools that your site uses,
e.g. analytics tools, Facebook, Twitter, Support Widgets, CDNs, etc.

You should remove these third party requests:

- They will skew the percentiles of your performance results.
- You may be unable to affect the performance of the third-party service.
- The load test may violate the terms-of-service contract that you have with the provider.

Your k6 script can skip third-party requests in a few ways:

- Edit the auto-generated k6 script, removing the requests one-by-one
- Download a HAR file with only requests to the selected domains.

In Chrome, you can use the DevTools Network Filter to select only particular domains.
The Filter input accepts a Regex to match multiple domains.

```bash
/loadimpact.com|cloudfront.net/
```

![Save HAR filter domain using regex](/media/docs/k6-oss/session_recorder_filter_domain.png)

After filtering your selected domains, you can download the HAR file as described in the first step of this tutorial.
The HAR file will include only the requests to the selected domains.

If you don't know all the domains to filter, it helps to use the query language of the Network Filter.
Just input `domain:` in the filter to see all the different domains recorded by the Network Panel.

![Save HAR filter domain list](/media/docs/k6-oss/session_recorder_filter_domain_list.png)

### Correlate dynamic data

In load testing, _correlation_ is when you extract the value from the response of one request and reuse it in a subsequent request.
Often, the correlation would be for a token or ID that is needed to run a sequence of steps in a user journey.

The recorded HAR file may include dynamic data used on your site - `IDs`, `CSRF tokens`, `VIEWSTATE`, `wpnonce`, and other `dynamic values` - that will be converted into the k6 script.

To run your load test correctly, you may need to replace some recorded data with dynamic data that k6 gets from previous requests.
For example, tokens expire quickly, and they are one of the most common things that users will correlate from a recorded session.

[Here](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data) are a few examples using the k6 API to correlate dynamic data.

## 4. Run the test

Now, you can run your load test with k6. If you have not installed k6 yet, please, follow the [k6 installation instructions](https://grafana.com/docs/k6/<K6_VERSION>/set-up/installation).

Execute the `k6 run` command to run your k6 script:

```bash
$ k6 run loadtest.js
```

To learn about running k6, check out the [Running k6 tutorial](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6).
