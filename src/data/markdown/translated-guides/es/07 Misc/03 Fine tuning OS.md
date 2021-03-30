---
title: 'Optimizar el Sistema Operativo'
excerpt: ''
---

Algunos usuarios, al ejecutar sus scripts de prueba localmente, se encuentran con límites en su sistema operativo que les impiden realizar el número necesario de peticiones para completar la prueba. Este límite suele manifestarse en forma de error por tener demasiados Archivos Abiertos **Too Many Open Files**. Estos límites, si no se modifican, pueden ser un grave cuello de botella si se decide ejecutar una prueba algo más grande o complicada localmente en su máquina.

En este artículo le mostraremos cómo inspeccionar los límites impuestos por el SO de su sistema, ajustarlos y escalarlos para pruebas más grandes.

Es importante tener en cuenta que todo lo que estamos cubriendo en este artículo debe ser abordado con una buena dosis de precaución. Al igual que con cualquier cambio que introduzcas en tu sistema operativo, te recomendamos que no cambies a ciegas la configuración de tu sistema a un valor específico. Debes documentar formas de prueba que muestren una clara relación antes/después. Por ejemplo, antes de cambiar el período MSL / TIME_WAIT, confirme que está experimentando el problema (mensajes de error, netstat, ss, etc.), cambie la configuración de forma conservadora, vuelva a ejecutar la prueba y anote cualquier mejora. De este modo, podremos calibrar el impacto de la optimización, los posibles efectos secundarios negativos y llegar a un rango de valores recomendados.

> Las modificaciones que aparecen a continuación han sido probadas para macOS Sierra 10.12 y superior, por lo que si estás ejecutando una versión anterior a esa, el proceso para cambiar estos ajustes puede ser diferente.

## Límite de recursos de red

Los derivados de los sistemas operativos Unix, como GNU/Linux, BSD y macOS, tienen la capacidad de limitar la cantidad de recursos del sistema disponibles para un proceso para salvaguardar la estabilidad del sistema. Esto incluye la cantidad total de memoria, el tiempo de CPU o la cantidad de archivos abiertos que un solo proceso puede gestionar.

Dado que en Unix todo es un archivo, incluidas las conexiones de red, las herramientas de prueba de aplicaciones que utilizan mucho la red, como k6, podrían alcanzar el límite configurado de archivos abiertos permitidos, dependiendo de la cantidad de conexiones de red utilizadas en una prueba concreta.

Como se mencionó en la sección inicial, esto hace que se muestre un mensaje como el siguiente durante una prueba:

```bash
WARN[0127] Request Failed     error="Get http://example.com/: dial tcp example.com: socket: too many open files"
```

Este mensaje significa que se ha alcanzado el límite de recursos de red, lo que impedirá a k6 crear nuevas conexiones, alterando así el resultado de la prueba. En algunos casos esto puede ser deseado, para medir el rendimiento general del sistema, por ejemplo, pero en la mayoría de los casos esto será un cuello de botella para probar el servidor HTTP y la propia aplicación web.

A continuación veremos formas de aumentar este límite de recursos, y permitir a k6 ejecutar pruebas con cientos o miles de VUs concurrentes desde un único sistema.

**Tipos de límites**

Los sistemas Unix tienen dos tipos de límites de recursos:

- hard limits: son el máximo absoluto permitido para cada usuario, y sólo pueden ser configurados por el usuario root.
- soft limits: pueden ser configurados por cada usuario, pero no pueden estar por encima del hard limits.

Visualización de la configuración de los límites.

### Viewing limits configuration

**> Linux**

En GNU/Linux, puedes ver los límites configurados con el comando ulimit.

`ulimit -Sa` mostrará todos los soft limits para el usuario actual:


```bash
$ ulimit -Sa
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3736
max locked memory       (kbytes, -l) 16384
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3736
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

Mientras que `ulimit -Ha` mostrará todos los hard limits para el usuario actual:

```bash
$ ulimit -Ha
core file size          (blocks, -c) unlimited
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3736
max locked memory       (kbytes, -l) 16384
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1048576
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) unlimited
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3736
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

Observe la diferencia de que los archivos abiertos son un máximo de 1024 para el soft limit, mientras que es 1048576 para el hard limit.

**> macOS**

En macOS, sin embargo, tendrá un par de límites diferentes impuestos por el sistema para tener en cuenta.

El primero es `launchctl limit maxfiles` que imprime los límites por proceso que se especifican también como un soft limit y un hard limit. Cuando se excede un soft limit un proceso puede recibir una señal (por ejemplo, si se excede el tiempo de CPU o el tamaño del archivo), pero se le permitirá continuar la ejecución hasta que alcance el hard limit (o modifique su límite de recursos). `kern.maxfiles` es el límite de descriptores de archivo totales en todo el sistema - la suma total de todos los archivos abiertos para todos los procesos más todos los archivos que el núcleo tiene abiertos para sus propios fines.

`sysctl kern.maxfiles`

`sysctl kern.maxfilesperproc`

Así que, para reiterar, la ejecución de los comandos anteriores le mostrará los límites del sistema en archivos abiertos y procesos en ejecución

### Cambiar la configuración de los límites

Lo primero que debe considerar antes de cambiar la configuración es la cantidad de conexiones de red que espera que requiera su prueba. La métrica http_reqs en el resumen de resultados de k6 puede indicar esto, pero un cálculo básico del número de VUs máx. VUs * número de peticiones HTTP en una sola iteración de VUs proporcionará una aproximación justa. Tenga en cuenta que k6 también se ocupa de los archivos de texto y otros recursos que cuentan para la cuota de "archivos abiertos", pero las conexiones de red son las que más consumen.

**> macOS**

Antes de que podamos cambiar cualquier límite impuesto por el sistema en macOS, tendremos que desactivar una función de seguridad que nos impide hacerlo. Tendremos que desactivar la Protección de Integridad del Sistema que se introdujo en OS X El Capitan para evitar que ciertos archivos y directorios propiedad del sistema sean modificados por procesos sin los privilegios adecuados.

Para desactivarlo, tendrás que reiniciar tu Mac y mantener pulsados Comando + R mientras se inicia. Esto hará que se inicie en el modo de recuperación.

Allí deberás ir a Utilidades, que se encuentran en la barra de menú de la parte superior de la pantalla, y luego abrir la Terminal. Una vez que lo tengas abierto, introduce el siguiente comando:

`csrutil disable`

Una vez que presiones enter y cierres la Terminal, podrás reiniciar tu Mac normalmente e ingresar a tu cuenta.

**Changing soft limits**

**> Linux**

Digamos que queremos ejecutar una prueba de 1000 VUs que hace 4 peticiones HTTP por iteración. En este caso, podríamos aumentar el límite de archivos abiertos a 5000, para tener en cuenta el uso adicional de archivos no relacionados con la red. Esto se puede hacer con el siguiente comando:


```bash
$ ulimit -n 5000
```

Esto cambia el límite sólo para la sesión actual del shell.

Si queremos persistir este cambio para futuras sesiones, podemos añadir esto a un archivo de inicio del shell. Para Bash esto sería:


```bash
$ echo "ulimit -n 5000" >> ~/.bashrc
```

**> macOS**

Si el soft limit es demasiado bajo, ajuste la sesión actual a (los valores escritos aquí suelen ser cercanos a los predeterminados):

```bash
sudo launchctl limit maxfiles 65536 200000
```

Como se necesita sudo, se le pide una contraseña.

**Cambiar los hard limits**

**> Linux**

Si el comando anterior resulta en un error como no se puede modificar el límite: Operación no permitida o el valor excede el hard limit, eso significa que el hard limit es demasiado bajo, que como se mencionó antes, sólo puede ser cambiado por el usuario root.

Esto puede hacerse modificando el archivo `/etc/security/limits.conf`.

Por ejemplo, para establecer tanto los soft limit como los hard limit de la cantidad de archivos abiertos por proceso para la cuenta de alice, abra `/etc/security/limits.conf` como root en su editor de texto de elección y añada las siguientes líneas:

```bash
alice soft nofile 5000
alice hard nofile 1048576
```

Los nuevos límites se aplicarán después de cerrar la sesión y volver a entrar.

Alternativamente, * hard nofile 1048576 aplicaría la configuración para todas las cuentas de usuario no root, y root hard nofile 1048576 para el usuario root. Vea la documentación para ese archivo o man bash para la documentación del comando ulimit.

**> macOS**

El siguiente paso será configurar los nuevos límites de archivos. Abre la terminal y pega el siguiente comando:

```bash
sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
```

Esto abrirá un editor de texto dentro de la ventana de la terminal donde se le pedirá que proporcione su contraseña, luego copia y pega lo siguiente:

```markup
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
 "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
 <dict>
 <key>Label</key>
 <string>limit.maxfiles</string>
 <key>ProgramArguments</key>
 <array>
 <string>launchctl</string>
 <string>limit</string>
 <string>maxfiles</string>
 <string>64000</string>
 <string>524288</string>
 </array>
 <key>RunAtLoad</key>
 <true/>
 <key>ServiceIPC</key>
 <false/>
 </dict>
</plist>
```

Pulsando `Control + X` se guardarán los cambios y se saldrá del editor. Al pegar y guardar esto hemos introducido dos limitaciones diferentes a su límite de archivos máximos. El primero (64000) es un soft limit, que si se alcanza, indicará a su Mac que se prepare para dejar de permitir la apertura de nuevos archivos, pero aún así los dejará abrir. Si se alcanza el segundo (524288), un hard limit, volverá a ver el mensaje de error "demasiados archivos abiertos".

Usaremos el mismo procedimiento para aumentar el límite de procesos a continuación.

Mientras que en la Terminal crea un archivo similar con este comando:

```bash
sudo nano /Library/LaunchDaemons/limit.maxproc.plist
```

De nuevo, después de que se le pida la contraseña, puede pegar el siguiente código y para guardarlo y cerrarlo puedes hacerlo con `Control + X`.

```markup
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
 <plist version="1.0">
 <dict>
 <key>Label</key>
 <string>limit.maxproc</string>
 <key>ProgramArguments</key>
 <array>
 <string>launchctl</string>
 <string>limit</string>
 <string>maxproc</string>
 <string>2048</string>
 <string>4096</string>
 </array>
 <key>RunAtLoad</key>
 <true />
 <key>ServiceIPC</key>
 <false />
 </dict>
 </plist>
```

Todo lo que queda después de esto es reiniciar su Mac de nuevo en Modo de Recuperación, abrir la Terminal, volver a encender el SIP con `csrutil enable` y comprobar si los límites fueron cambiados con los comandos que usamos al principio.

En la mayoría de los casos estos límites deberían ser suficientes para ejecutar la mayoría de sus pruebas simples localmente durante algún tiempo, pero puede modificar los archivos anteriores a cualquier valor que necesite en sus pruebas.

<Blockquote mod="warning">

Por favor, tenga en cuenta que todas estas limitaciones se ponen en marcha para proteger su sistema operativo de los archivos y aplicaciones que están mal escritas y que podrían tener fugas de memoria en grandes cantidades. Le sugerimos que no se exceda con los valores, o podría encontrar que su sistema se ralentiza  o  puede que se quede sin RAM.

</Blockquote>

## Rango de puertos locales

Cuando se crea una conexión de red saliente, el núcleo asigna un puerto local (de origen) para la conexión de entre un rango de puertos disponibles.

**> GNU/Linux**

En GNU/Linux puedes ver este rango con:

```bash
$ sysctl net.ipv4.ip_local_port_range net.ipv4.ip_local_port_range = 32768 60999
```

Aunque 28.231 puertos pueden ser suficientes para la mayoría de los casos de uso, esto puede ser un factor limitante si estás probando con miles de conexiones. Puedes aumentarlo, por ejemplo:

```bash
sysctl -w net.ipv4.ip_local_port_range="16384 65000"
```

Tenga en cuenta que este rango se aplica tanto a TCP como a UDP, así que sea conservador con los valores que elija y aumente según sea necesario.

Para que los cambios sean permanentes, añada `net.ipv4.ip_local_port_range=16384 65000` a `/etc/sysctl.conf`. Ajustes de último recurso Si sigue experimentando problemas de red con los cambios anteriores, considere la posibilidad de activar `net.ipv4.tcp_tw_reuse`:


```bash
sysctl -w net.ipv4.tcp_tw_reuse=1
```

Esto permitirá una función para reutilizar rápidamente las conexiones en estado TIME_WAIT, lo que potencialmente producirá un mayor rendimiento.

**> macOS/Linux**

En macOS el rango de puertos efímeros por defecto es de 49152 a 65535, para un total de 16384 puertos. Puede comprobarlo con el comando sysctl:

```bash
$ sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last

net.inet.ip.portrange.first: 49152
net.inet.ip.portrange.last: 65535
```

Una vez que se le acaben los puertos efímeros, normalmente tendrá que esperar hasta que el estado TIME_WAIT expire (2 * vida máxima del segmento) hasta que pueda reutilizar un número de puerto en particular. Puede duplicar el número de puertos cambiando el rango para que comience en 32768, que es el predeterminado en Linux y Solaris. (El número máximo de puertos es 65535, por lo que no puede aumentar el extremo superior).

```bash
$ sudo sysctl -w net.inet.ip.portrange.first=32768

net.inet.ip.portrange.first: 49152 -> 32768
```

Tenga en cuenta que el rango oficial designado por IANA es de 49152 a 65535, y algunos cortafuegos pueden asumir que los puertos asignados dinámicamente se encuentran dentro de ese rango. Es posible que tenga que reconfigurar su cortafuegos para poder utilizar un rango mayor fuera de su red local.

## Optimizaciones generales

En esta sección repasaremos algunas de las optimizaciones que no dependen necesariamente de tu sistema operativo, pero que pueden afectar a tus pruebas.

### Uso de la RAM

Dependiendo de la prueba particular de k6: número máximo de VUs utilizadas, número y tamaño de las dependencias de JavaScript, y complejidad del propio script de prueba, k6 puede consumir grandes cantidades de RAM del sistema durante la ejecución de la prueba. Aunque el desarrollo se centra en reducir el uso de la memoria RAM en la medida de lo posible, una sola ejecución de prueba puede utilizar decenas de gigabytes de RAM en determinados escenarios.

Como referencia, cuente que cada instancia de VU requiere entre 1MB y 5MB de RAM, dependiendo de la complejidad de su script y sus dependencias. Esto es aproximadamente entre `GB y 5GB de RAM del sistema requerido para una prueba de 1.000 VU, así que asegúrese de que hay suficiente RAM física disponible para satisfacer las demandas de su prueba.

Si necesita disminuir el uso de RAM, puede utilizar la opción `--compatibility-mode=base`. Más información en [JavaScript Compatibility Mode](/using-k6/javascript-compatibility-mode).

### Memoria virtual

Además de la RAM física, asegúrese de que el sistema está configurado con una cantidad adecuada de memoria virtual, o espacio de intercambio, en caso de que se requieran ráfagas de uso de memoria más altas.

Puedes ver el estado y la cantidad de espacio de intercambio disponible en tu sistema con los comandos swapon o free.

No vamos a entrar en detalles de configuración de swap, pero puedes encontrar varias guías en línea.

### Rendimiento de la red

Dado que k6 puede generar y mantener grandes cantidades de tráfico de red, también se pone a prueba la pila de red de los sistemas operativos modernos. Bajo ciertas cargas o condiciones de red, es posible conseguir un mayor rendimiento y una mejor prestación ajustando algunos parámetros de red del sistema operativo o reestructurando las condiciones de red de la prueba.

### TCP TIME_WAIT period

A las aplicaciones de red TCP, como los clientes y servidores web, se les asigna un par de sockets de red (una combinación única de dirección local, puerto local, dirección remota y puerto remoto) para cada conexión entrante o saliente. Normalmente, este par de sockets se utiliza para una única sesión de solicitud/respuesta HTTP y se cierra poco después. Sin embargo, incluso después de que una conexión sea cerrada con éxito por la aplicación, el kernel puede seguir reservando recursos para reabrir rápidamente el mismo socket si llega un nuevo segmento TCP que coincida. Esto también ocurre durante la congestión de la red, donde algunos paquetes se pierden en la transmisión. Esto coloca el socket en un estado TIME_WAIT, y se libera una vez que el período TIME_WAIT expira. Este periodo se suele configurar entre 15 segundos y 2 minutos.

El problema con el que se pueden encontrar algunas aplicaciones como k6 es el de provocar que un elevado número de conexiones acaben en el estado TIME_WAIT, lo que puede impedir que se creen nuevas conexiones de red.

En estos escenarios, antes de realizar cambios en la configuración de red del sistema, que podrían tener efectos secundarios adversos para otras aplicaciones, es preferible tomar primero algunas precauciones comunes de prueba. Utilizar diferentes puertos o IPs del servidor

Dado que los sockets se crean únicamente para una combinación de dirección local, puerto local, dirección remota y puerto remoto, una solución segura para evitar la congestión TIME_WAIT es utilizar diferentes puertos o direcciones IP del servidor.

Por ejemplo, puede configurar su aplicación para que se ejecute en los puertos :8080, :8081, :8082, etc. y repartir sus peticiones HTTP entre estos endpoints.

## Véase también

- [Ejecución de pruebas a gran escala](/testing-guides/running-large-tests)
- [JavaScript Compatibility Mode](/using-k6/javascript-compatibility-mode)
