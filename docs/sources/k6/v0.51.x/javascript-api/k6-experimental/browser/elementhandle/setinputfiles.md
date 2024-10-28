---
title: 'setInputFiles(file[, options])'
description: 'Sets the file input element'
---

# setInputFiles(file[, options])

Sets the file input element's value to the specified files.

To work with local files on the file system, use the [experimental fs module](https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/fs/) to load and read the file contents.

| Parameter           | Type        | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file                | object      | `null`  | This is a required parameter.                                                                                                                                                                                                                                                                                                                 |
| file.name           | string      | `''`    | The name of the file. For example, `file.txt`.                                                                                                                                                                                                                                                                                                |
| file.mimeType       | string      | `''`    | The type of the file content. For example, `text/plain`.                                                                                                                                                                                                                                                                                      |
| file.buffer         | ArrayBuffer | `[]`    | Base64 encoded content of the file.                                                                                                                                                                                                                                                                                                           |
| options             | object      | `null`  | This is an optional parameter.                                                                                                                                                                                                                                                                                                                |
| options.noWaitAfter | boolean     | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number      | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

### Inline File Example

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

  try {
    // In this example we create a simple web page with an upload input field.
    // Usually, you would use page.goto to navigate to a page with a file input field.
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

    const eh = page.$('input[id="upload"]');

    // The file is set to the input element with the id "upload".
    eh.setInputFiles({
      name: 'file.txt',
      mimetype: 'text/plain',
      buffer: encoding.b64encode('hello world'),
    });
  } finally {
    page.close();
  }
}
```

{{< /code >}}

### Local File Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import encoding from 'k6/encoding';
import { open } from 'k6/experimental/fs';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

// Declare the location of the file on the local filesystem.
let file;
(async function () {
  file = await open('/abs/path/to/file.txt');
})();

export default async function () {
  const page = browser.newPage();

  try {
    // In this example we create a simple web page with an upload input field.
    // Usually, you would use page.goto to navigate to a page with a file input field.
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

    const eh = page.$('input[id="upload"]');

    // Read the whole file content into a buffer.
    const buffer = await readAll(file);

    // The file is set to the input element with the id "upload".
    eh.setInputFiles({
      name: 'file.txt',
      mimetype: 'text/plain',
      buffer: encoding.b64encode(buffer),
    });
  } finally {
    page.close();
  }
}

// readAll will read the whole of the file from the local filesystem into a
// buffer.
async function readAll(file) {
  const fileInfo = await file.stat();
  const buffer = new Uint8Array(fileInfo.size);

  const bytesRead = await file.read(buffer);
  if (bytesRead !== fileInfo.size) {
    throw new Error('unexpected number of bytes read');
  }

  return buffer;
}
```

{{< /code >}}
