import { convertNumberToKMB } from '../convertNumbersToKMB';

describe('convertNumberToKMB', () => {
    it('should convert numbers to KMB format if they are at least 1 million', () => {
        console.log(convertNumberToKMB(Number.MAX_SAFE_INTEGER + 1));
        expect(convertNumberToKMB(0)).toBe('0');
        expect(convertNumberToKMB(500)).toBe('500');
        expect(convertNumberToKMB(999)).toBe('999');
        expect(convertNumberToKMB(1000)).toBe('1000');
        expect(convertNumberToKMB(1234)).toBe('1234');
        expect(convertNumberToKMB(1500)).toBe('1500');
        expect(convertNumberToKMB(999999)).toBe('999999');
        expect(convertNumberToKMB(1000000)).toBe('1m');
        expect(convertNumberToKMB(987654321)).toBe('987.7m');
        expect(convertNumberToKMB(999999999)).toBe('1b');
        expect(convertNumberToKMB(1000000000)).toBe('1b');
        expect(convertNumberToKMB(1234567890123)).toBe('1.2t');
        expect(convertNumberToKMB(5000000000)).toBe('5b');
        expect(convertNumberToKMB(999999999999)).toBe('1t');
        expect(convertNumberToKMB(1000000000000)).toBe('1t');
        expect(convertNumberToKMB(5000000000000000)).toBe('5q');
        expect(convertNumberToKMB(1e265)).toBe('1e+265');
    });
});
