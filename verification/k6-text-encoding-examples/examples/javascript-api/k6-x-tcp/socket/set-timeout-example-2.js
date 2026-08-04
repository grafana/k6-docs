// Source: docs/sources/k6/next/javascript-api/k6-x-tcp/socket/set-timeout.md (JavaScript block 2)
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
    // Reset the timeout after each data event
    socket.setTimeout(5000);
  });

  socket.on('timeout', () => {
    console.log('No data received for 5 seconds — closing');
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
  });

  const host = __ENV.TCP_HOST || 'localhost';
  const port = __ENV.TCP_PORT || '8080';

  await socket.connect(port, host);
  console.log('Connected — waiting for data (5s timeout)');

  // Set timeout after connecting; no immediate write so the idle timer can fire
  socket.setTimeout(5000);

  await closed;
}
