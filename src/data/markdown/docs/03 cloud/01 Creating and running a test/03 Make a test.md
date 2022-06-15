---
title: "k6 Cloud tutorial"
excerpt 'Read how to make a test quickly, without leaving your browser. Use a GUI, or turn a recording into a script. Good for quick tests and prototypes.'
---

In k6 Cloud, you can make tests quickly without scripting anything.
Using the script builder is the easiest way, but the browser recorder lets you make realistic user behavior in just a bit more than the time it would take to use a web application.


## Log in to k6 Cloud

1. Log in
1. If you joined through an organization, verify your organization.
Select the profile icon, then select either your name or your organization.
1. Make a test. Besides scripting, you have two options:
      a) Use the test builder
      b) Make a recording

## Use the test builder

To get started, let's make a simple test that simulates user traffic. It'll start with ten users, ramp up to 20 VUs and stay there for a "busy period" of 1 minute, then ramp back down to 10 Vus at the end of the day.

1. Select **Create new test**.
1. Open the GUI builder with **Start Building**.
1. Select **Requests > Request**.
Select the `GET`  as the HTTP method, and set the target URL to `https://test.k6.io`.
1. Select **Scenarios**, and make sure the executor is `Ramping VUs`.
1. To create baseline traffic, in the **Start VUs** field, enter `10`. Then fill in values to ramp VUs up and down:

    |Target VUs| Duration|
    |----------|---------|
    |`20`      | `30s`   |
    |`20`      | `1m`    |
    |`10`      | `30s`   |

1. To get the source script, use the toggle. 
1. Select **Save and run**.

Now you have a test script that is running on k6 Cloud servers.
In a bit more than two minutes, you'll be able to investigate the results.

## Make a recording

The script in the last section makes only a single GET request.
If you want to model real user behavior on non-static applications, this test's results won't tell you much.

But modeling VU behavior in code can be tricky.
Instead, you can use the Browser recorder to generate a k6 scripter.
Not only is it quicker than scripting by hand, it may be more accurate.

To make a script from a recording, follow these steps:

1. Install the extension for your browser of choice.
2. Go to the [k6 fake ecommerce shop](http://ecommerce.test.k6.io/).
3. Select the extension, the **Start recording**. Wait until the recording starts.
4. Navigate the site as a shopper would.


You can simulate normal shopping with these steps.

1. Add a shirt to your cart.
1. Add a belt.
1. Add two branded beanies.
1. Remove the belt.
1. Select checkout, fill in some fake details, and "buy".

Now stop the recording and make a script.

1. Select the extension, then **Stop**. You'll be redirected to the k6 Cloud site.
1. Leave the defaults and select **Save**.
1. Notice how the requests are grouped by page. Find your shortest sleep time, and add a second (you were probably moving faster than a real shopper would).
1. Select scenarios, and configure the ramping behavior from the previous section.


Now you have the same traffic patterns but with realistic behavior from your VUs.

## Test scripts without scripting

In these two examples, you made a script without writing in code.
 However, all k6 Cloud is built upon k6 OSS. So, you can copy these script files, modify them, and run them on your CLI.

Long term, most testers rely on the k6 API to script out dynamic, modular test suites.
But the test builder lets you prototype tests quickly.
The Browser recorder is a quick, convenient, and relatively realistic way to model real user behavior.
