// Source: docs/sources/k6/next/javascript-api/crypto/pbkdf2params.md (JavaScript block 1)
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

  // Derive bits using PBKDF2
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

  console.log('derived bits: ' + arrayBufferToHex(derivedBits));
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}
