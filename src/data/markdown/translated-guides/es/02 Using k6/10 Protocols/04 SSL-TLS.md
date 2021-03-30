---
title: 'SSL/TLS'
excerpt: ''
---

La Seguridad de la Capa de Transporte (TLS), sucesora de la Capa de Conexión Segura (SSL), es el mecanismo a través del cual se pueden establecer conexiones cifradas entre clientes y servidores en la web y a través del cual los datos pueden fluir con integridad intacta.

Simplificado, TLS es posible gracias a la utilización de una Infraestructura de Clave Pública (PKI) que implica claves criptográficas privadas, certificados de propiedad (públicos, firmados con clave privada) y autoridades de certificación (CAs, que emiten y afirman la validez de los certificados emitidos).

Todo el sistema depende del funcionamiento de las CA, de que las claves criptográficas que utilizan para firmar certificados de propiedad a los propietarios de sitios/dominios se mantengan en secreto. También depende de la capacidad de los propietarios de sitios/dominios para mantener en secreto su clave criptográfica privada.

Si no lo hacen, tienen que informar de ello a la CA que emitió el certificado para que ésta pueda revocar y, al hacerlo, informar a los navegadores y otros clientes de los cambios a través del Protocolo de Estado de los Certificados en Línea (OCSP).


## TLS en k6

Por defecto y sin ninguna configuración especial k6 se conectará y hablará con los servidores a través de TLS - Sólo tiene que asegurarse de que sus URLs de petición se especifican con el esquema https.

Vale la pena hablar con más detalle de la siguiente funcionalidad TLS soportada por k6:


- [Certificados del cliente SSL/TLS](/using-k6/protocols/ssl-tls/ssl-tls-client-certificates)
- [Versiones SSL/TLS y cifrados](/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers) (restricción y comprobación de lo que se ha utilizado para una solicitud HTTP mediante la comprobación de las propiedades del objeto de respuesta)
- [Protocolo de estado de los certificados en línea (OCSP)](/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp)
- [Response.timings.tls_handshaking](/javascript-api/k6-http/response)
