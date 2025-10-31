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
    const xInverse = modularInverse(x, prime);
    const m = (ciphertext.c2 * xInverse) % prime;
    return m;
}

export const getMessageFromReusedEphemeralKey = (message1: bigint, ciphertext1: Ciphertext, ciphertext2: Ciphertext, ephemeralKey: bigint, publicKey: PublicKey): bigint => {
    if(ciphertext1.c1 !== ciphertext2.c1) {
        throw new Error("Ephemeral key not reused");
    }
    const c1_2Inverse = modularInverse(ciphertext1.c2, publicKey.prime);
    const m2 = (ciphertext2.c2 * c1_2Inverse * message1) % publicKey.prime;
    return m2;
}

const modularInverse = (a: bigint, prime: bigint): bigint => {
    return a ** (prime - BigInt(2)) % prime;
}