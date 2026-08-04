// Source: docs/sources/k6/next/javascript-api/text-encoding/_index.md (JavaScript block 3)
// Standalone verification copy of the documentation example.

import { check } from 'k6';

const text = 'Hello, 世界 👋';
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default function () {
  const encoded = encoder.encode(text);
  const decoded = decoder.decode(encoded);

  check(decoded, {
    'encoded value is a Uint8Array': () => encoded instanceof Uint8Array,
    'decoded value matches the input': (value) => value === text,
  });
}
