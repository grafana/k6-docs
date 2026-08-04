// Source: docs/sources/k6/next/javascript-api/k6-x-tcp/_index.md (JavaScript block 2)
// Standalone verification copy of the documentation example.

import { Socket } from 'k6/x/tcp';

export default async function () {
  const socket = new Socket();

  const closed = new Promise((resolve) => {
    socket.on('close', resolve);
  });

  socket.on('data', (data) => {
    const response = new TextDecoder().decode(data);
    console.log('Received:', response.substring(0, 100));
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
  });

  const host = __ENV.TLS_HOST || 'example.com';

  await socket.connect({ port: 443, host, tls: true });
  await socket.write(
    `GET / HTTP/1.1\r\nHost: ${host}\r\nConnection: close\r\n\r\n`,
  );

  await closed;
}
