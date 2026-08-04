// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/verify.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

export default async function () {
  const generatedKey = await crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: 'SHA-1' },
    },
    true,
    ['sign', 'verify'],
  );

  const data = new TextEncoder().encode('Hello World');

  /**
   * Signes the encoded data with the provided key using the HMAC algorithm
   * the returned signature can be verified using the verify method.
   */
  const signature = await crypto.subtle.sign('HMAC', generatedKey, data);

  /**
   * Verifies the signature of the encoded data with the provided key using the HMAC algorithm.
   */
  const verified = await crypto.subtle.verify(
    'HMAC',
    generatedKey,
    signature,
    data,
  );

  console.log('verified: ', verified);
}
