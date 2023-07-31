---
title: 'Instalación'
excerpt: 'Instrucciones para installar k6 en Linux, Mac, or Windows. Usa Docker o los binarios de k6.'
---

k6 tiene paquetes para Linux, Mac, y Windows. Alternativamente, puede usar un contenedor Docker o un binario independiente.

## Linux

### Debian/Ubuntu

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```


### Fedora/CentOS

Usando `dnf` o `yum`:

```bash
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```


## macOS

Usando [Homebrew](https://brew.sh/):

```bash
brew install k6
```


## Windows

Si usa el [gestor de paquetes Chocolatey](https://chocolatey.org/) puede instalar el paquete no oficial con:

```
choco install k6
```

Alternativamente, puede descargar y ejecutar [el instalador oficial más reciente](https://dl.k6.io/msi/k6-latest-amd64.msi).


## Docker

```bash
docker pull grafana/k6
```

## Binarios

Nuestra [página de releases en GitHub](https://github.com/grafana/k6/releases) tiene binarios independientes para todas las plataformas. Descargue y extraiga el archivo para su plataforma, y coloque el binario `k6` o `k6.exe` en el `PATH` de su sistema. De esta manera puede ejecutar `k6` desde cualquier lugar.


## Usando extensiones de k6

Si utiliza una o más [extensiones de k6](/extensions), necesita un binario compilado con las extensiones deseadas. Visite la página [del creador de paquetes](/extensions/bundle-builder/) para empezar.


## Solución de problemas

Si tiene problemas con la instalación, visite [la lista de problemas y soluciones comúnes](/es/empezando/instalacion/solucion-de-problemas/) para ayuda.
Si su problema no está listado y persiste, contacte el canal `#lang-spanish` en nuestro [Slack oficial](https://k6io.slack.com/), o repórtelo en nuestro [foro comunitario](https://community.grafana.com/).
