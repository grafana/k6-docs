// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/digest.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode('Hello, world!'),
  );

  console.log(arrayBufferToHex(digest));
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}
