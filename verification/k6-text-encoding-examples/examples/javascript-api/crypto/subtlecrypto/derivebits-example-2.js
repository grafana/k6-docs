// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/derivebits.md (JavaScript block 2)
// Standalone verification copy of the documentation example.

export default async function () {
  const password = new TextEncoder().encode('my secret password');

  // Import the password as a key
  const baseKey = await crypto.subtle.importKey(
    'raw',
    password,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  );

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive 256 bits using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt,
      iterations: 310000,
    },
    baseKey,
    256,
  );

  console.log('derived bits: ' + printArrayBuffer(derivedBits));
}

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
