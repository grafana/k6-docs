// Source: docs/sources/k6/next/javascript-api/crypto/subtlecrypto/sign.md (JavaScript block 2)
// Standalone verification copy of the documentation example.

export default async function () {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify'],
  );

  const data = new TextEncoder().encode('Hello World');

  const alg = { name: 'ECDSA', hash: { name: 'SHA-256' } };

  // makes a signature of the encoded data with the provided key
  const signature = await crypto.subtle.sign(alg, keyPair.privateKey, data);

  console.log('signature: ', printArrayBuffer(signature));

  //Verifies the signature of the encoded data with the provided key
  const verified = await crypto.subtle.verify(
    alg,
    keyPair.publicKey,
    signature,
    data,
  );

  console.log('verified: ', verified);
}

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
