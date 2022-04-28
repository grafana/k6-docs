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


## apt-key es deprecado

Algunos usuarios de Debian/Ubuntu y derivados podrían encontrar una advertencia utilizando `apt-key` para añadir la clave de firma del repositorio de k6:

> `Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead (see apt-key(8))`

Para evitar esto, y estar a prueba del futuro, se recomienda remover la clave existente de `security@k6.io`, y actualizar la lista de repositorios.

```bash
# borra la clave existente
sudo apt-key del k6

# importa la clave de la forma recomendada
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

# actualiza el repositorio
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
```


## Error importando la clave GPG de k6

El comando `gpg` para importar la clave de firma podría fallar con:
```bash
gpg: keybox '/usr/share/keyrings/k6-archive-keyring.gpg' created
gpg: failed to create temporary file '/root/.gnupg/.#lk0x000055db689f2310.a86c4b090dc7.7': No such file or directory
gpg: connecting dirmngr at '/root/.gnupg/S.dirmngr' failed: No such file or directory
gpg: keyserver receive failed: No dirmngr
```

Esto pasaría si es la primera vez que ejecuta `gpg` para ese usuario, por lo que el directorio `/root/.gnupg/` no existe. Puede crearlo ejecutando `sudo gpg -k` e intentando importar la clave nuevamente.


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
