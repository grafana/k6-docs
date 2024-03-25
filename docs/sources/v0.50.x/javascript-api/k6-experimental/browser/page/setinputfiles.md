---
title: 'setInputFiles(selector, file[, options])'
description: 'Sets the file input element'
---

# setInputFiles(selector, file[, options])

Sets the file input element's value to the specified files.

To work with local files on the file system, use the [experimental fs module](https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/fs/) to load and read the file contents.

| Parameter           | Type        | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string      | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| file                | object      | `null`  | This is a required parameter.                                                                                                                                                                                                                                                                                                                 |
| file.name           | string      | `''`    | The name of the file. For example, `file.txt`.                                                                                                                                                                                                                                                                                                |
| file.mimeType       | string      | `''`    | The type of the file content. For example, `text/plain`.                                                                                                                                                                                                                                                                                      |
| file.buffer         | ArrayBuffer | `[]`    | Base64 encoded content of the file.                                                                                                                                                                                                                                                                                                           |
| options             | object      | `null`  | This is an optional parameter.                                                                                                                                                                                                                                                                                                                |
| options.noWaitAfter | boolean     | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number      | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import encoding from 'k6/encoding';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = browser.newPage();

  // In this example we create a simple web page with an upload input field.
  page.setContent(`
    <html>
      <head></head>
      <body>
          <!-- Simple file upload form -->
          <form method="POST" action="/upload" enctype="multipart/form-data">
              <input type="file" id="upload" multiple />
              <input type="submit" value="Send" />
          </form>
      </body>
    </html>`);

  // The file is set to the input element with the id "upload".
  page.setInputFiles('input[id="upload"]', {
    name: 'file.txt',
    mimetype: 'text/plain',
    buffer: encoding.b64encode('hello world'),
  });

  page.close();
}
```

{{< /code >}}
