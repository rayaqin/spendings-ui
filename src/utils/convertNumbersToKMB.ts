export function convertNumberToKMB(number: number): string {
    if (number <= 999999 || number.toString().includes('e')) {
        return number.toString();
    }

    const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'qu', 's', 'se', 'o', 'n', 'd'];
    let suffixIndex = 0;
    let convertedNumber = number;

    while (convertedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
        convertedNumber = convertedNumber / 1000;
        suffixIndex++;
    }

    const roundedVersion = parseFloat(convertedNumber.toFixed(1));
    if (roundedVersion >= 1000) {
        convertedNumber = roundedVersion / 1000;
        suffixIndex++;
    }

    return parseFloat(convertedNumber.toFixed(1)) + suffixes[suffixIndex];
}
