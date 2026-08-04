// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/derivekey.md (JavaScript block 1)
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

  // Derive an AES-GCM key using PBKDF2
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt,
      iterations: 310000,
    },
    baseKey,
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  console.log('derived key: ' + JSON.stringify(derivedKey));
}
