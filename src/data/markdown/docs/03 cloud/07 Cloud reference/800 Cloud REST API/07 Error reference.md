---
title: 'Error reference'
excerpt: ''
---

The API returns errors in the following format:

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

 `message` and `code` **are required fields**:
- **`message`**  describes the error.
- **`code`** is an internal numerical identifier, useful when reporting problems to k6 support.

All other fields are optional.
The `field_errors` object will have keys named after the data field causing a problem (`fieldname1` and `fieldname2` above are just examples) whereas the `errors` array will hold details about any other errors.

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
