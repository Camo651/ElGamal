export const FastExponent = (base: bigint, exponent: bigint, modulo?: bigint): bigint => {
    console.log(`Calculating FastExponent with base=${base}, exponent=${exponent}, modulo=${modulo}`);
    if (exponent === BigInt(0)){
        console.log("Exponent is zero, returning 1");
        return BigInt(1);
    }
    const binaryExponent = exponent.toString(2);
    console.log("Binary Exponent:", binaryExponent);
    let result = base;
    if (modulo) {
        result = result % modulo;
    }
    for (let i = 1; i < binaryExponent.length; i++) {
        console.log(`Step ${i}: bit=${binaryExponent[i]}, result = ( ${result} ^ 2 ) ${binaryExponent[i] === '1' ? `* ${base}` : ''} ${modulo ? `% ${modulo}` : ''}`);
        result *= result;
        if (binaryExponent[i] === '1') {
            result *= base;
        }
        if (modulo) {
            result = result % modulo;
        }
    }
    return result;
}

export const FastExponentTests = () => {
    console.log("Running Fast Exponentiation Tests...");
    const tests: { base: bigint; exponent: bigint; mod?: bigint; expected?: bigint }[] = [
        { base: BigInt(3), exponent: BigInt(20), mod: BigInt(45), expected: BigInt(3) ** BigInt(20) % BigInt(45) },
        { base: BigInt(3), exponent: BigInt(200), expected: BigInt(3) ** BigInt(200) },
        { base: BigInt(235973), exponent: BigInt(456872884723247), mod: BigInt(583884)},
        { base: BigInt(984327455683), exponent: BigInt(1253489582), mod: BigInt(994348472542)}
    ];

    tests.forEach(({ base, exponent, mod, expected }) => {
        const result = FastExponent(base, exponent, mod);
        console.log(`FastExponent(${base}, ${exponent}, ${mod}) = ${result}`);
        if (expected === undefined) {
            console.log("No expected value provided.");
            return;
        }
        if (result === expected) {
            console.log("Test Passed");
        } else {
            console.error(`Test Failed: Expected ${expected}`);
        }
    });
}