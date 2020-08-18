---
title: 'Error Handling'
excerpt: ''
draft: 'true'
---

If an error occurs, the error will be on the following format:

```json
{"error": {
      "message": "<error text>",
      "code": <int>,
      "detail_code": <int>,
      "field_errors" {
            "fieldname1": ["error1", "error2", ... ],
            "fieldname2": ["error1", "error2", ...],
            ...
        }
      "errors": ["error1", "error2", ...],
  }
}
```

All fields are optional except for `message` and `code`.

The `message` field holds an overall description of the error, and the `code` field is an internal numerical identifier useful when reporting problems to Load Impact support.

The optional `field_errors` object will have keys named after the data field causing a problem (`fieldname1` and `fieldname2` above are just examples) whereas the `errors` array will hold details about any other errors.

The most common error codes are (not a full list):

| Error Code | Description           |
| ---------- | --------------------- |
| 0          | UNKNOWN               |
| 1          | GENERAL               |
| 2          | VALIDATION            |
| 3          | NOT_FOUND             |
| 4          | NOT_ALLOWED           |
| 5          | NOT_AUTHENTICATED     |
| 6          | AUTHENTICATION_FAILED |
| 7          | METHOD_NOT_ALLOWED    |
