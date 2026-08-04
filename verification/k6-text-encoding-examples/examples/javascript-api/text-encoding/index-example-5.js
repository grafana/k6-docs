// Source: docs/sources/k6/next/javascript-api/text-encoding/_index.md (JavaScript block 5)
// Standalone verification copy of the documentation example.

import { check } from 'k6';

export default function () {
  const decoder = new TextDecoder();
  const firstPart = decoder.decode(new Uint8Array([0xf0, 0x9f]), {
    stream: true,
  });
  const secondPart = decoder.decode(new Uint8Array([0x91, 0x8b]));

  check(firstPart + secondPart, {
    'split character is decoded': (value) => value === '👋',
  });
}
