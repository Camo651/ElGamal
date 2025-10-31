export const FastExponent = (base: bigint, exponent: bigint): bigint => {
    if (exponent === BigInt(0)) return BigInt(1);
    const binaryExponent = exponent.toString(2);
    const trimmedBinary = binaryExponent.replace(/^0+/, '');
    let result = BigInt(base);
    for (let i = 1; i < trimmedBinary.length; i++) {
        result *= result;
        if (trimmedBinary[i] === '1') {
            result *= base;
        }
    }
    return result;
}

export const FastExponentTests = () => {
    console.log("Running Fast Exponentiation Tests...");
    const tests: { base: bigint; exponent: bigint; expected: bigint }[] = [
        { base: BigInt(2), exponent: BigInt(10), expected: BigInt(2 ** 10) },
        { base: BigInt(3), exponent: BigInt(5), expected: BigInt(3 ** 5) },
        { base: BigInt(5), exponent: BigInt(0), expected: BigInt(1) },
        { base: BigInt(7), exponent: BigInt(3), expected: BigInt(7 ** 3) },
        { base: BigInt(2), exponent: BigInt(100), expected: BigInt(2 ** 100) },
    ];

    tests.forEach(({ base, exponent, expected }) => {
        const result = FastExponent(base, exponent);
        console.log(`FastExponent(${base}, ${exponent}) = ${result}`);
        if (result === expected) {
            console.log("Test Passed");
        } else {
            console.error(`Test Failed: Expected ${expected}`);
        }
    });
}