// Source: docs/sources/k6/next/javascript-api/k6-x-mqtt/_index.md (JavaScript block 2)
// Standalone verification copy of the documentation example.

import { Client } from 'k6/x/mqtt';

export default function () {
  const client = new Client();

  client.on('connect', async () => {
    console.log('Connected to MQTT broker');
    await client.subscribeAsync('probe');

    const intervalId = setInterval(() => {
      client.publish('probe', 'ping MQTT!');
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      client.end();
    }, 3100);
  });

  client.on('message', (topic, message) => {
    console.info(new TextDecoder().decode(message));
  });

  client.on('end', () => {
    console.log('Disconnected from MQTT broker');
  });

  client.connect(__ENV['MQTT_BROKER_ADDRESS'] || 'mqtt://broker.emqx.io:1883');
}
