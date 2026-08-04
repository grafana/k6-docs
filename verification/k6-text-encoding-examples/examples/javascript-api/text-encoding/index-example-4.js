// Source: docs/sources/k6/next/javascript-api/text-encoding/_index.md (JavaScript block 4)
// Standalone verification copy of the documentation example.

import { check } from 'k6';

const utf16le = new Uint8Array([
  0xff, 0xfe, 0x48, 0x00, 0x65, 0x00, 0x6c, 0x00, 0x6c, 0x00, 0x6f, 0x00,
]);

export default function () {
  const text = new TextDecoder('utf-16le').decode(utf16le);

  check(text, {
    'decoded value is correct': (value) => value === 'Hello',
  });
}
