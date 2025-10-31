import { getPublicKey, encrypt, decrypt } from "./ElGamal";

interface ElGamalTest {
    prime: bigint;
    generator: bigint;
    privateKey: bigint;
    ephemeralKey: bigint;
    message: bigint;
}

const tests: ElGamalTest[] = [
    {
        prime: BigInt(409),
        generator: BigInt(19),
        privateKey: BigInt(301),
        ephemeralKey: BigInt(23),
        message: BigInt(59),
    },
        {
        prime: BigInt(409),
        generator: BigInt(19),
        privateKey: BigInt(301),
        ephemeralKey: BigInt(135),
        message: BigInt(59),
    },
];

const test = () => {
    console.log("Running ElGamal tests...");
    for (const t of tests) {
        console.log("Test case:", t);
        const publicKey = getPublicKey(t.prime, t.generator, t.privateKey);
        console.log("Public Key:", publicKey);
        const ciphertext = encrypt(t.message, publicKey, t.ephemeralKey);
        console.log("Ciphertext:", ciphertext);
        const decryptedMessage = decrypt(ciphertext, t.privateKey, t.prime);
        console.log("Decrypted Message:", decryptedMessage);
        console.log(`Test ${decryptedMessage === t.message ? "Passed" : "Failed"}`);
        console.log("-----");
    }
}

test();