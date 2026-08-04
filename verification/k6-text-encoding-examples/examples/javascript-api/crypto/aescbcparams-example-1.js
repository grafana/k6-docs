// Source: docs/sources/k6/next/javascript-api/crypto/aescbcparams.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
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
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: crypto.getRandomValues(new Uint8Array(16)),
    },
    key,
    new TextEncoder().encode('Hello, World!'),
  );

  console.log(ciphertext);
}
