// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/_index.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
  const plaintext = new TextEncoder().encode('Hello, World!');

  /**
   * Generate a symmetric key using the AES-CBC algorithm.
   */
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  /**
   * Encrypt the plaintext using the AES-CBC key with
   * have generated.
   */
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    plaintext,
  );

  /**
   * Decrypt the ciphertext using the same key to verify
   * that the resulting plaintext is the same as the original.
   */
  const deciphered = await crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    ciphertext,
  );

  console.log(
    'deciphered text == original plaintext: ',
    arrayBufferToHex(deciphered) === arrayBufferToHex(plaintext),
  );
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}
