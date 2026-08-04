// Source: docs/sources/k6/next/javascript-api/crypto/aesctrparams.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
  const plaintext = new TextEncoder().encode('Hello, World!');

  /**
   * Generate a symmetric key using the AES-CTR algorithm.
   */
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-CTR',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  /**
   * Encrypt the plaintext using the AES-CTR key with
   * have generated.
   */
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter: crypto.getRandomValues(new Uint8Array(16)),
      length: 128,
    },
    key,
    plaintext,
  );
}
