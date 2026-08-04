// Source: docs/sources/k6/next/javascript-api/k6-x-tcp/socket/destroy.md (JavaScript block 2)
// Standalone verification copy of the documentation example.

import { Socket } from 'k6/x/tcp';

export default async function () {
  const socket = new Socket();

  const closed = new Promise((resolve) => {
    socket.on('close', () => {
      console.log('Connection closed');
      resolve();
    });
  });

  socket.on('data', (data) => {
    const str = new TextDecoder().decode(data);
    console.log('Received:', str);
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
    socket.destroy();
  });

  const host = __ENV.TCP_HOST || 'localhost';
  const port = __ENV.TCP_PORT || '8080';

  await socket.connect(port, host);
  await socket.write('Hello, server!');

  await closed;
}
