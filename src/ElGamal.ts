export interface PublicKey {
  prime: bigint;
  generator: bigint;
  publicKey: bigint;
}

export interface Ciphertext {
  c1: bigint;
  c2: bigint;
}

export const getPublicKey = (prime: bigint, generator: bigint, privateKey: bigint): PublicKey => {
    const publicKey = generator ** privateKey % prime;
    return { prime, generator, publicKey };
}

export const encrypt = (message: bigint, publicKey: PublicKey, ephemeralKey: bigint): Ciphertext => {
    const c1 = publicKey.generator ** ephemeralKey % publicKey.prime;
    const c2 = (message * (publicKey.publicKey ** ephemeralKey)) % publicKey.prime;
    return { c1, c2 };
}

export const decrypt = (ciphertext: Ciphertext, privateKey: bigint, prime: bigint): bigint => {
    const x = (ciphertext.c1 ** privateKey) % prime;
    const m = (ciphertext.c2 * ( x ** (prime - BigInt(2)) )) % prime;
    return m;
}