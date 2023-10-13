---
title: 'Amazon CloudWatch'
excerpt: 'Esta guía cubre la ejecución de la integración de k6 con CloudWatch y la visualización de los resultados.'
---

k6 puede enviar los datos de las métricas a [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) a través del [CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html), que es efectivamente una integración de StatsD. Estas métricas pueden ser visualizadas en paneles de control.

Esta guía cubre la ejecución de la integración de CloudWatch y la visualización de los resultados:

- Ejecutar el agente de CloudWatch
- Ejecutar la prueba con k6
- Visualizar las métricas de k6 en Amazon CloudWatch


## Run the CloudWatch agent

Suponemos que ya tiene una máquina que soporta tanto la ejecución de k6 como del agente de  CloudWatch, que se ejecuta en un entorno de GNU/Linux o Windows. Simplemente [descargue](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html) la versión del agente CloudWatch adecuada para su sistema operativo.

1. Cree un rol en [IAM role](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-iam-roles-for-cloudwatch-agent.html) para poder enviar métricas a CloudWatch a través del agente. A continuación, si está ejecutando en Amazon EC2, sólo tiene que [adjuntar](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/iam-roles-for-amazon-ec2.html#attach-iam-role) el rol a su instancia EC2, para poder enviar métricas a CloudWatch. De lo contrario, si está ejecutando servidores locales, lea la siguiente [guía](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-commandline-fleet.html#install-CloudWatch-Agent-iam_user-first).

2. Descargue el paquete del agente de CloudWatch adecuado para su sistema operativo. Por ejemplo, en Debian 10 (Buster), hemos utilizado el siguiente enlace. Para otros sistemas operativos, consulte esta [guía](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html):

   ```bash
   $ wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
   ```

3. Instala el paquete:

   ```bash
   $ sudo dpkg -i amazon-cloudwatch-agent.deb
   ```

4. Configure el agente para recibir datos desde k6. Para ello, crea un fichero llamado "/opt/aws/amazon-cloudwatch-agent/etc/statsd.json" y pega el siguiente objeto de configuración JSON. Esta configuración significa que el agente escuchará en el puerto número 8125, que es el número de puerto por defecto para k6 y StatsD. El intervalo para recoger las métricas es de 5 segundos y no son agregadas, ya que necesitamos los datos en bruto más tarde en CloudWatch.

   ```json
   {
       "metrics": {
           "namespace": "k6",
           "metrics_collected": {
               "statsd": {
                   "service_address": ":8125",
                   "metrics_collection_interval": 5,
                   "metrics_aggregation_interval": 0
               }
           }
       }
   }
   ```

5. Ejecute el siguiente comando para iniciar el agente:

   ```bash
   $ sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/etc/statsd.json
   ```

6. Puede comprobar el estado del agente mediante el siguiente comando:

   ```bash
   $ amazon-cloudwatch-agent-ctl -a status
   ```

## Ejecutar la prueba con k6

Una vez que el agente esté funcionando correctamente, [instale](/es/empezando/instalacion/) k6 y [ejecute](/es/empezando/ejecucion-de-k6/)  la prueba, para que las métricas sean enviadas al agente mediante el siguiente comando:

```bash
$ k6 run --out output-statsd script.js
```

Las siguientes opciones pueden ser configuradas como variables de entorno, dependiendo de la configuración del agente:

| Nombre                      | Valor                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `K6_STATSD_ADDR`          | Dirección del servicio statsd, actualmente sólo se admite UDP. El valor por defecto es localhost:8125. |
| `K6_STATSD_NAMESPACE`     | El espacio de nombres utilizado como prefijo para todos los nombres de las métricas. El valor por defecto es k6.                    |
| `K6_STATSD_PUSH_INTERVAL` | Configure la frecuencia con la que se envían los datos. El valor por defecto es 1s.                                  |
| `K6_STATSD_BUFFER_SIZE`   | Establezca la frecuencia con la que se envían los datos. El valor por defecto es 1s.                                                            |

## Visualizar las métricas de k6 en Amazon CloudWatch

La visualización de las métricas exportadas a CloudWatch se realiza creando un panel de control y seleccionando las métricas deseadas para ser mostradas.

![List of k6 metrics](./images/CloudWatch/cloudwatch-k6-metrics.png)

Este es un ejemplo del dashboard que hemos creado para visualizar los resultados de las pruebas.

![k6 Dashboard on Amazon CloudWatch](./images/CloudWatch/cloudwatch-k6-dashboard.png)

El dashboard que se muestra en la imagen anterior se exporta como JSON y está disponible [aquí](https://github.com/k6io/example-cloudwatch-dashboards).
