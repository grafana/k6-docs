// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/importkey.md (JavaScript block 4)
// Standalone verification copy of the documentation example.

export default async function () {
  const password = new TextEncoder().encode('my secret password');

  // Import the password as a key for PBKDF2
  // Note: extractable must be false for PBKDF2
  const baseKey = await crypto.subtle.importKey(
    'raw',
    password,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  );

  console.log('imported PBKDF2 key: ' + JSON.stringify(baseKey));

  // Now you can use this key with deriveBits or deriveKey
  const salt = crypto.getRandomValues(new Uint8Array(16));
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
