---
title: 'Error Codes'
shouldCreatePage: false
---

The following specific error codes are currently defined:

- 1000: A generic error that isn't any of the ones listed below.
- 1010: A non-TCP network error - this is a place holder there is no error currently known to trigger it.
- 1020: An invalid URL was specified.
- 1050: The HTTP request has timed out.
- 1100: A generic DNS error that isn't any of the ones listed below.
- 1101: No IP for the provided host was found.
- 1110: Blacklisted IP was resolved or a connection to such was tried to be established.
- 1111: Blacklisted hostname using The [Block Hostnames](/using-k6/k6-options/reference#block-hostnames) option.
- 1200: A generic TCP error that isn't any of the ones listed below.
- 1201: A "broken pipe" on write - the other side has likely closed the connection.
- 1202: An unknown TCP error - We got an error that we don't recognize but it is from the operating system and has `errno` set on it. The message in `error` includes the operation(write,read) and the errno, the OS, and the original message of the error.
- 1210: General TCP dial error.
- 1211: Dial timeout error - the timeout for the dial was reached.
- 1212: Dial connection refused - the connection was refused by the other party on dial.
- 1213: Dial unknown error.
- 1220: Reset by peer - the connection was reset by the other party, most likely a server.
- 1300: General TLS error
- 1310: Unknown authority - the certificate issuer is unknown.
- 1311: The certificate doesn't match the hostname.
- 1400 to 1499: error codes that correspond to the [HTTP 4xx status codes for client errors](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors)
- 1500 to 1599: error codes that correspond to the [HTTP 5xx status codes for server errors](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_errors)
- 1600: A generic HTTP/2 error that isn't any of the ones listed below.
- 1610: A general HTTP/2 GoAway error.
- 1611 to 1629: HTTP/2 GoAway errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1611.
- 1630: A general HTTP/2 stream error.
- 1631 to 1649: HTTP/2 stream errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1631.
- 1650: A general HTTP/2 connection error.
- 1651 to 1669: HTTP/2 connection errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1651.
- 1701: Decompression error.

Read more about [Error Codes](/javascript-api/error-codes/)
