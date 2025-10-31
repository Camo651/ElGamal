import { getPublicKey, encrypt, decrypt, getMessageFromReusedEphemeralKey } from "./ElGamal";
import { FastExponentTests } from "./SquareAndMultiple";

FastExponentTests();

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

const testReusedEphemeralKey = () => {
    console.log("Running ElGamal reused ephemeral key test...");
    const prime = BigInt(409);
    const generator = BigInt(19);
    const privateKey = BigInt(301);
    const ephemeralKey = BigInt(23);
    const message1 = BigInt(59);
    const message2 = BigInt(123);
    const publicKey = getPublicKey(prime, generator, privateKey);
    console.log("Public Key:", publicKey);
    const ciphertext1 = encrypt(message1, publicKey, ephemeralKey);
    console.log("Ciphertext 1:", ciphertext1);
    const ciphertext2 = encrypt(message2, publicKey, ephemeralKey);
    console.log("Ciphertext 2:", ciphertext2);
    const recoveredMessage2 = getMessageFromReusedEphemeralKey(message1, ciphertext1, ciphertext2, ephemeralKey, publicKey);
    console.log("Recovered Message 2:", recoveredMessage2);
    console.log(`Reused Ephemeral Key Test ${recoveredMessage2 === message2 ? "Passed" : "Failed"}`);
    console.log("-----");
}

test();
testReusedEphemeralKey();