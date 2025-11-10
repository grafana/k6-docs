---
title: 'SSL/TLS'
description: 'By default and without any special configuration, k6 will connect and talk to servers over TLS. You just need to make sure to specify your request URLs with the https scheme.'
weight: 04
weight: 04
---

# SSL/TLS

Transport Layer Security (TLS), the successor of Secure Socket Layer (SSL), is the mechanism through
which encrypted connections can be established between clients and servers on the web and through
which data can flow with integrity intact.

Simplified, TLS is made possible by using a Public Key Infrastructure (PKI) involving private
cryptographic keys, certificates of ownership (public, signed with private key), and certificate
authorities (CAs, issuing and asserting the validity of issued certificates).

The entire system depends on the functioning operation of the CAs.
The system trusts that the cryptographic keys that CAs use to sign certificates of ownership to site/domain owners are kept secret.
It also depends on the domain owners' ability to keep their private cryptographic keys secret.

If they fail to do so, they have to report the leak to the CA that issued the certificate.
After this disclosure, the CA can revoke the certificate and, in doing so, let browsers and other clients know of the changes through
the Online Certificate Status Protocol (OCSP).

## TLS in k6

By default and without any special configuration, k6 connects and talks to servers over TLS.
You just need to make sure that you specify your request URLs with the `https` scheme.

K6 supports the following TLS functionalities.
Each is worth discussing in more detail:

- [TLS client certificates](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/ssl-tls-client-certificates)
- [TLS version and ciphers](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers) (restricting as
  well as checking what was used for a HTTP request by checking response object properties)
- [Online Certificate Status Protocol (OCSP)](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/online-certificate-status-protocol--ocsp)
- [Response.timings.tls_handshaking](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response)
