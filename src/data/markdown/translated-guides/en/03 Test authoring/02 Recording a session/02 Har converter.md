---
title: 'HAR converter'
excerpt: 'The HAR converter is an alternative to the Browser recorder. It generates a k6 script based on the HTTP requests included on a HAR file.'
---


The HAR converter is an alternative to the [Browser recorder](/test-authoring/recording-a-session/browser-recorder). It generates a k6 script based on the HTTP requests included on a [HAR file](<https://en.wikipedia.org/wiki/HAR_(file_format)>).

> HAR is a file format used by all major browsers and various other tools to export recorded HTTP requests.

The [har-to-k6 converter](https://github.com/loadimpact/har-to-k6) is a NodeJS tool. Unlike the Browser Recorder, it **does not require a k6 Cloud user** to generate the k6 script.

When using the HAR converter, the process looks like:

1. Record a HAR file using your browser or tool of choice.
2. Use the **har-to-k6 converter** to generate a k6 test from the HAR file.
3. Update the auto-generated k6 test in your text editor or IDE.
4. Use **k6** to run the test.

## 1. Record a HAR file

Multiple browsers and tools can be used to export HTTP traffic in a HAR format. A few popular ones are:

- [Chrome](https://www.google.com/chrome/)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge)
- [Charles recording proxy](http://www.charlesproxy.com/)(HTTP proxy/recorder)
- [Fiddler](http://www.telerik.com/fiddler) (HTTP proxy/recorder)

Here are the basic steps you need to take to make a recording in Chrome:

1. Open a new incognito window in Chrome (not really necessary, but using an incognito window means you won't be sending a lot of cookies, etc that might have been saved by your browser).
2. Open up Chrome developer tools (press F12)
3. Click the "Network" tab
4. Check out that the recording button (round button) is activated (red color).
5. Click the "Preserve log" checkbox if you want to make a recording of several successive page loads.
6. Enter the URL of your site and start doing whatever you'd like your simulated load test users to be doing.
7. When done, right-click on the list of URLs in Chrome developer tools and choose "Save as HAR with content".

![Save HAR for load testing](./images/session_recorder_save_as_har.png)

It's good to have in consideration the following best practices to record a user session:

## Do

- Browse like a user would
- Take natural pauses that users would take to consume page content
- Focus on the most common use cases, rather than all the possible use cases
- Take note of pages where forms/logins occur, you will likely need to complete some scripting there

## Do NOT

- Visit every page in one journey
- Click every possible option
- Navigate as fast as you can
- Navigate away your actual site or application

## 2. Convert the HAR file to a k6 script

The [har-to-k6 converter](https://github.com/loadimpact/har-to-k6) is a NodeJS tool that can convert a HAR file (browser session) into a k6 script.

**Install the har-to-k6 converter**

A prerequisite is to have installed NodeJS (version >=11.0.0). To install the converter, you can use `npm`:

```bash
$ npm install -g har-to-k6
```

For other installation options, check out the [har-to-k6 installation instructions](https://github.com/loadimpact/har-to-k6#installation).

**Run the convert command**

Now, you can run the converter to generate a k6 script from a HAR file:

```bash
$ har-to-k6 myfile.har -o loadtest.js
```

The above command will auto-generate a k6 script for you. It will read the HAR file (_myfile.har_) and convert it into a k6 test (_loadtest.js_).

## 3. Modify the auto-generated k6 script

In the previous step, the converter did create a k6 script for testing. Now, you should evaluate if you have to change any part of the k6 script. Depending on your use case, you might need to modify some of the following aspects:

- Configure the load options
- Remove third-party content
- Correlate dynamic data

### Configure the load options

At this moment, k6 has auto-generated a “functional” test, a test that by default will run with one “Virtual User” for one “Iteration”.

It’s time for you to configure the “load” options of your performance tests. k6 allows configuring in several ways:

1 - As CLI arguments while running the test:

```bash
k6 run --vus 10 --duration 30s loadtest.js
```

2 - The options of the script file.

```javascript
export let options = {
  vus: 10,
  duration: '30s',
};
```

To learn more information about how to configure the load options, read the [Adding more VUs guide](/getting-started/running-k6#adding-more-vus) and the [Options guide](/using-k6/options).

### Remove third-party content

If you are recording a user session of a website, by default, you will record all the HTTP requests, including requests from third-party tools used on your website — for example, Analytics tools, Facebook, Twitter, Support Widgets, CDNs and many more.

You should remove these third party requests because:

- These third-party requests will skew the percentiles of your performance results.
- You may have no ability to impact the performance of the third-party service
- The load test may violate the terms of service contract that you have with the provider.

You have two options to skip third-party requests in your k6 script.

1 - Edit the auto-generate k6 script and remove one by one the requests to third-party services.

2 - Download a HAR file with only requests to the selected domains.

In Chrome, you can use the DevTools Network Filter to select only particular domains. The Filter input accepts a Regex to match multiple domains.

```bash
/loadimpact.com|cloudfront.net/
```

![Save HAR filter domain using regex](./images/session_recorder_filter_domain.png)

After filtering your selected domains, you can download the HAR file as described in the first step of this tutorial, and the HAR file will only include the requests to the selected domains.

If you don’t know all the domains to filter, it is beneficial to use the query language of the Network Filter. Just input `domain:` in the filter to see all the different domains recorded by the Network Panel.

![Save HAR filter domain list](./images/session_recorder_filter_domain_list.png)

### Correlate dynamic data

In a load testing, **correlation** means extracting one or more values from the response of one request and then reusing them in subsequent requests. Often times this could be getting a token or some sort of ID necessary to fulfill a sequence of steps in a user journey

The recorded HAR file may include dynamic data used on your site - `IDs`, `CSRF tokens`, `VIEWSTATE`, `wpnonce`, and other `dynamic values` - that will be converted into the k6 script.

To run your load test correctly, you may need to replace the hard coded data with dynamic data that k6 gets from previous requests. For example, tokens will expire quickly and it is one of the most common things that users will correlate from a recorded session.

[Here](/examples/correlation-and-dynamic-data) are a few examples using the k6 API to correlate dynamic data.

## 4. Run the test

Now, you can run your load test with k6. If you have not installed k6 yet, please, follow the [k6 installation instructions](/getting-started/installation).

Execute the `k6 run` command to run your k6 script:

```bash
$ k6 run loadtest.js
```

For learning more about running k6, check out the [Running k6 guide](/getting-started/running-k6).

## See also

- [Browser recorder](/test-authoring/recording-a-session/browser-recorder): Chrome and Firefox extensions to generate a k6 script from a browser session.
