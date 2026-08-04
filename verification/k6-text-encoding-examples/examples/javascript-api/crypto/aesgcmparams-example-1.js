// Source: docs/sources/k6/next/javascript-api/crypto/aesgcmparams.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
  const plaintext = new TextEncoder().encode('Hello, World!');

  /**
   * Generate a symmetric key using the AES-CBC algorithm.
   */
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  /**
   * Encrypt the plaintext using the AES-CBC key with
   * have generated.
   */
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: crypto.getRandomValues(new Uint8Array(12)),
    },
    key,
    plaintext,
  );
}
