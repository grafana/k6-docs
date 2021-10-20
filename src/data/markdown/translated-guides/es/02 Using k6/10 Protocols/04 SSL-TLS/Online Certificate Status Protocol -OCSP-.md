---
title: 'Protocolo de estado de los certificados en línea (OCSP)'
excerpt: 'El Protocolo de Estado de Certificados en Línea (OCSP) es un protocolo que los navegadores web y los clientes pueden utilizar para comprobar el estado de un certificado TLS emitido con una Autoridad de Certificación (CA).'
---

## ¿Qué es OCSP?


El Protocolo de Estado de Certificados en Línea (OCSP) es un protocolo que los navegadores web y los clientes pueden utilizar para comprobar el estado de un certificado TLS emitido con una Autoridad de Certificación (CA), asegurándose de que no ha sido revocado por cualquier motivo.

Esto puede hacerse de diferentes maneras, poniendo la carga en diferentes partes:

- El navegador/cliente: hablar con la CA (o por el respondedor OCSP confiado por la CA) con OCSP. Uno de los inconvenientes de este enfoque es que los servidores de la CA deben estar disponibles, lo que puede no ser siempre el caso.
- El proveedor de navegadores: mantener una lista actualizada regularmente de revocaciones de certificados hablando con las CAs (o por el respondedor OCSP confiado por la CA) y luego distribuyendo esta lista a los navegadores que se ejecutan en las máquinas de los usuarios.
- El lado del servidor: el servidor se encarga de la interacción con la CA (o por el respondedor OCSP encomendado por la CA), almacenando en caché los resultados de las actualizaciones periódicas e incluyendo una "respuesta engrapada" (denominada engrapado OCSP) en la configuración de la conexión TLS con el navegador/cliente.


## OCSP with k6

Actualmente k6 soporta el grapado OCSP, recibiendo y analizando una respuesta grapada como parte de la configuración de la conexión TLS. La información de la respuesta OCSP está disponible en la propiedad `ocsp.stapled_response` del objeto de respuesta.

<CodeGroup labels={["OCSP stapled response properties example"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://stackoverflow.com');
  check(res, {
    'is OCSP response good': (r) => r.ocsp.status === http.OCSP_STATUS_GOOD,
  });
}
```

</CodeGroup>

## Properties of an OCSP object

El objeto OCSP contiene las siguientes propiedades:

| Llave                 | Tipo   | Descripción                                                                                                                                                                           |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`            | string | el estado del certificado, véanse los valores posibles a continuación
                                                                                                                              |
| `revocation_reason` | string | el motivo de la revocación del certificado (si ese es el estado), véanse los posibles valores a continuación                                                                                       |
| `produced_at`       | number | número de milisegundos transcurridos desde el 1 de enero de 1970 00:00:00 UTC, que representa el momento en que esta respuesta engrapada OCSP fue firmada por la CA (o por el respondedor OCSP encargado por la CA)          |
| `this_update`       | number | número de milisegundos transcurridos desde el 1 de enero de 1970 00:00:00 UTC, que representa el momento en el que se sabe que el estado indicado es correcto                                   |
| `next_update`       | number | número de milisegundos transcurridos desde el 1 de enero de 1970 00:00:00 UTC, que representa el momento en que esta respuesta engrapada OCSP se actualizará con la CA (o por el respondedor OCSP encargado por la CA) |
| `revoked_at`        | number | número de milisegundos transcurridos desde el 1 de enero de 1970 00:00:00 UTC, que representa el momento en que este certificado fue revocado (si ese es el estado)                                     |

### Posibles valores para `status`:

- `http.OCSP_STATUS_GOOD`
- `http.OCSP_STATUS_REVOKED`
- `http.OCSP_STATUS_UNKNOWN`
- `http.OCSP_STATUS_SERVER_FAILED`

### Posibles valores para `revocation_reason`:

- `http.OCSP_REASON_UNSPECIFIED`
- `http.OCSP_REASON_KEY_COMPROMISE`
- `http.OCSP_REASON_CA_COMPROMISE`
- `http.OCSP_REASON_AFFILIATION_CHANGED`
- `http.OCSP_REASON_SUPERSEDED`
- `http.OCSP_REASON_CESSATION_OF_OPERATION`
- `http.OCSP_REASON_CERTIFICATE_HOLD`
- `http.OCSP_REASON_REMOVE_FROM_CRL`
- `http.OCSP_REASON_PRIVILEGE_WITHDRAWN`
- `http.OCSP_REASON_AA_COMPROMISE`
