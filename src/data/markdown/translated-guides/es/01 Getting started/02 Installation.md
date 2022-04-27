---
title: 'Instalación'
excerpt: 'Instrucciones para installar k6 en Linux, Mac, or Windows. Usa Docker o los binarios de k6.'
---

## Linux

### Debian/Ubuntu

> #### 🧠 Si usas una imagen que le falte  `ca-certificates` o `gnupg2`
> 
> Necesitas instalar primero esos paquetes con añadiendo el comando:
> 
> ```bash
> $ sudo apt-get update && sudo apt-get install ca-certificates gnupg2 -y
> ```

```bash
$ sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
$ echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
$ sudo apt-get update
$ sudo apt-get install k6
```

> #### ⚠️ En caso de usar un firewall o un proxy
> Usted debe tener en cuenta que algunos usuarios han reportado que no pueden descargar la clave del servidor de Ubuntu usando el comando `apt-key`, debido a que los firewalls o los proxies bloquean las solicitudes. Si usted está presentando este problema, puede intentar hacerlo de la siguiente manera:
>
> ```bash
> $ curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
> ```
> Entonces confirme que la clave con el ID mencionado arriba se muestre al ejecutar `sudo apt-key list`.

### Fedora/CentOS

Usando `dnf` o `yum`:

```bash
$ sudo dnf install https://dl.k6.io/rpm/repo.rpm
$ sudo dnf install k6
```

Versiones anteriores a CentOS 8 no soportan firmas PGP V4 que utilizamos, por lo que debe deshabilitar la verificación instalando k6 con:
```bash
$ sudo yum install --nogpgcheck k6
```

> #### ⚠️ Nota sobre Bintray
>
> Los repositorios k6 de Bintray [dejarán de funcionar después del 1ro de mayo, 2021](https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/)
> y deberá cambiar a nuestros repositorios siguiendo las instrucciones mencionadas arriba.
>
> En Debian/Ubuntu puede remover el repositorio de Bintray con:
> ```bash
> $ sudo sed -i '/dl\.bintray\.com\/loadimpact\/deb/d' /etc/apt/sources.list
> $ sudo apt-key del 379CE192D401AB61
> $ sudo apt-get update
> ```
>
> Y en Fedora/CentOS con:
> ```bash
> $ sudo rm /etc/yum.repos.d/bintray-loadimpact-rpm.repo
> ```


## macOS

Usando [Homebrew](https://brew.sh/):

```bash
$ brew install k6
```


## Windows

Si usa el [gestor de paquetes Chocolatey](https://chocolatey.org/) puede instalar el paquete no oficial con:

```
choco install k6
```

Si no, puede descargar e instalar [el más reciente paquete oficial `.msi`](https://dl.k6.io/msi/k6-latest-amd64.msi).


## Binarios

Descarga un binario preconstruido de nuestra [página de releases](https://github.com/grafana/k6/releases), y colócalo en el `PATH` de tu sistema. De esta manera puede ejecutar `k6` desde cualquier lugar.


## Docker

```bash
$ docker pull grafana/k6
```
