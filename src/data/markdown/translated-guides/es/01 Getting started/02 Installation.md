---
title: 'Instalación'
excerpt: 'Instrucciones para installar k6 en Linux, Mac, or Windows. Usa Docker o los binarios de k6.'
---

## Linux

### Debian/Ubuntu

```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
$ echo "deb https://dl.bintray.com/loadimpact/deb stable main" | sudo tee -a /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get install k6
```

> #### ⚠️ En caso de usar un firewall o un proxy
> Usted debe tener en cuenta que algunos usuarios han reportado que no pueden descargar la clave del servidor de Ubuntu usando el comando `apt-key`, debido a que los firewalls o los proxies bloquean las solicitudes. Si usted está presentando este problema, puede intentar hacerlo de la siguiente manera: 
>
> ```bash
> $ wget -q -O - https://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
> ```

### Red Hat/CentOS

```bash
$ wget https://bintray.com/loadimpact/rpm/rpm -O bintray-loadimpact-rpm.repo
$ sudo mv bintray-loadimpact-rpm.repo /etc/yum.repos.d/
$ sudo yum install k6
```

## Mac (brew)

<CodeGroup labels={['Brew']}>

```bash
$ brew install k6
```

</CodeGroup>

## Windows (MSI installer)

Para instalarlo en Windows, descargue desde [el archivo k6](https://dl.bintray.com/loadimpact/windows/k6-v0.31.1-amd64.msi)

## Binaries

Toma un binario preconstruido de nuestra <a href="https://github.com/loadimpact/k6/releases">página de releases</a>. Instala el binario en el PATH de tu máquina, de esta manera puede ejecutar el archivo `k6` desde cualquier lugar.

## Docker

<CodeGroup labels={['Docker']}>

```bash
$ docker pull loadimpact/k6
```

</CodeGroup>
