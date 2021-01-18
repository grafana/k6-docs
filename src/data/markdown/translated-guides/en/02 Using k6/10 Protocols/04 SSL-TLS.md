---
title: 'SSL/TLS'
excerpt: ''
---

Transport Layer Security (TLS), the successor of Secure Socket Layer (SSL), is the mechanism through
which encrypted connections can be established between clients and servers on the web and through
which data can flow with integrity intact.

Simplified, TLS is made possible by using a Public Key Infrastructure (PKI) involving private
cryptographic keys, certificates of ownership (public, signed with private key) and certificate
authorities (CAs, issuing and asserting the validity of issued certificates).

The entire system is dependent on the functioning operation of the CAs, that the cryptographic keys
they use to sign certificates of ownership to site/domain owners are kept secret. It is also
dependent on the site/domain owners' ability to keep their private cryptographic key secret.

If they fail to do so, they have to report this to the CA that issued the certificate so that the
CA can revoke it, and by doing so letting browsers and other clients know of the changes through
the Online Certificate Status Protocol (OCSP).

## TLS in k6

By default and without any special configuration k6 will connect and talk to servers over TLS -
You just need to make sure that your request URLs are specified with the `https` scheme.

The following TLS functionality supported by k6 is worth talking about in more detail:

- [TLS client certificates](/using-k6/protocols/ssl-tls/ssl-tls-client-certificates)
- [TLS version and ciphers](/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers) (restricting as
  well as checking what was used for a HTTP request by checking response object properties)
- [Online Certificate Status Protocol (OCSP)](/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp)
- [Response.timings.tls_handshaking](/javascript-api/k6-http/response)
