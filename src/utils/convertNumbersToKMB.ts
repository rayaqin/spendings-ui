export function convertNumberToKMB(number: number): string {
    if (number <= 999999) {
        return number.toString();
    }

    const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'qu', 's', 'se', 'o', 'n', 'd'];
    let suffixIndex = 0;
    let convertedNumber = number;

    while (convertedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
        convertedNumber = convertedNumber / 1000;
        suffixIndex++;
    }

    // rounding down to avoid cases like 999.9m becoming 1000m
    return Math.floor(convertedNumber * 10) / 10 + suffixes[suffixIndex];
}
