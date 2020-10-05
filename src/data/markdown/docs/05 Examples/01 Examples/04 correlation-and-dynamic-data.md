---
title: 'Correlation and Dynamic Data'
excerpt: |
  Scripting examples on how to correlate dynamic data in your test script. Correlation is
  often required when using the Chrome Extension or HAR converter to generate your test script.
  This is due to the fact that those tools will capture session IDs, CSRF tokens, VIEWSTATE,
  wpnonce, and other dynamic values from your specific session.
---

Scripting examples on how to correlate dynamic data in your test script. Correlation is often
required when using the Chrome Extension or HAR converter to generate your test script. This
is because those tools will capture session IDs, CSRF tokens, VIEWSTATE, wpnonce, and other
dynamic values from your specific session. These tokens typically expire very quickly. This
is one of the most common things that users will script for when testing user journeys across
websites or web apps.

### Correlation

In a load testing scenario, correlation means extracting one or more values from the response
of one request and then reusing them in subsequent requests. Often, this could be getting
a token or some sort of ID necessary to fulfill a sequence of steps in a user journey.

The [browser recording](/using-k6/session-recording-har-support) will for example capture things like CSRF tokens,
VIEWSTATES, nonce, etc. from your session. This type of data is likely to no longer be valid when
you run your test, meaning you'll need to handle the extraction of this data from the HTML/form
to include it in subsequent requests. This issue is fairly common with any site that has forms
and can be handled with a little bit of scripting.

### Extracting values/tokens from JSON response

<div class="code-group" data-props='{ "labels": ["extract-json.js"], "lineNumbers": [true] }'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // Make a request that returns some JSON data
  let res = http.get('https://httpbin.org/json');

  // Extract data from that JSON data by first parsing it
  // using a call to "json()" and then accessing properties by
  // navigating the JSON data as a JS object with dot notation.
  let slide1 = res.json().slideshow.slides[0];
  check(slide1, {
    'slide 1 has correct title': (s) => s.title === 'Wake up to WonderWidgets!',
    'slide 1 has correct type': (s) => s.type === 'all',
  });

  // Now we could use the "slide1" variable in subsequent requests...
}
```

</div>

**Relevant k6 APIs**:

- [Response.json()](/javascript-api/k6-http/response)
- [JSON.parse()](https://developer.mozilla.org/en-US/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  (An alternative API that can be used for parsing JSON data)

### Extracting values/tokens from form fields

You can choose from two different approaches when deciding how to handle form submissions.
Either you use the higher-level [Response.submitForm([params])](/javascript-api/k6-http/response/response-submitform-params) API
or you extract necessary hidden fields etc. and build a request yourself and then send it using the
appropriate `http.*` family of APIs, like [http.post(url, [body], [params])](/javascript-api/k6-http/post-url-body-params).

#### Extracting .NET ViewStates, CSRF tokens and other hidden input fields

<div class="code-group" data-props='{ "labels": ["extract-from-hidden.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import {sleep} from "k6";

export default function() {

    // Request the page containing a form and save the response. This gives you access
    //to the response object, `res`.
    const res = http.get("https://test.k6.io/my_messages.php", {"responseType": "text"});

    // Query the HTML for an input field named "redir". We want the value or "redir"
    const elem = res.html().find('input[name=redir]');

    // Get the value of the attribute "value" and save it to a variable
    const val = elem.attr('value');

    // Now you can concatenate this extracted value in subsequent requests that require it.
    ...
    // console.log() works when executing k6 scripts locally and is handy for debugging purposes
    console.log("The value of the hidden field redir is: " + val);

    sleep(1);
}
```

</div>

> ### ⚠️ Did you know?
>
> Take note if `discardResponseBodies` is set to true in the options
> section of your script. If it is, you can either make it `false` or save the response per
> request with `{"responseType": "text"}` as shown in the example.

**Relevant k6 APIs**:

- [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find-selector) (the [jQuery Selector API](http://api.jquery.com/category/selectors/)
  docs are also a good resource on what possible selector queries can be made)
- [Selection.attr(name)](/javascript-api/k6-html/selection/selection-attr-name)
