---
title: 'Solución de problemas'
excerpt: 'Instrucciones para corregir problemas comunes de instalación.'
---

## Sistema no tiene ca-certificates or gnupg2

Algunas distribuciones de Linux no vienen con los paquetes `ca-certificates` y `gnupg2` instalados.
Si usa tal distribución, necesita instalarlos con:

```bash
sudo apt-get update && sudo apt-get install -y ca-certificates gnupg2
```

Este ejemplo es para Debian/Ubuntu y derivados. Consulte la documentación de su distribución si usa una diferente.

## En caso de usar un muro de fuego o proxy

Algunos usuarios han reportado no poder importar la clave de firma de k6 desde el servidor de Ubuntu usando el comando `gpg`, debido a que la solicitud es bloqueada por un muro de fuego o proxy en su red. Si tiene este problema, puede intentar hacerlo de la siguiente manera:

```bash
curl -s https://dl.k6.io/key.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/k6-archive-keyring.gpg
```


## Versiones anteriores a CentOS 8

Versiones anteriores a CentOS 8 no soportan firmas PGP V4 que utilizamos, por lo que debe deshabilitar la verificación instalando k6 con:
```bash
$ sudo yum install --nogpgcheck k6
```
