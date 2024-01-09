import { extractValidData } from '../validData';

describe('validData', () => {
    it('should filter the data correctly', () => {
        const data = [
            {
                id: 1,
                description: 'Expense 1',
                amount: '10.50',
                currency: 'USD',
                spent_at: '2022-01-01',
            },
            {
                id: 2,
                description: 'Expense 2',
                amount: '20.75',
                currency: 'HUF',
                spent_at: '2022-01-02-morning',
            },
            {
                id: 3,
                description: 'Expense 3',
                amount: 'twenty five',
                currency: 'USD',
                spent_at: '2022-01-03',
            },
        ];

        const expectedOutput = [
            {
                id: 1,
                description: 'Expense 1',
                amount: '10.50',
                currency: 'USD',
                spent_at: '2022-01-01',
            },
        ];

        const result = extractValidData(data);

        expect(result).toEqual(expectedOutput);
    });

    it('should return an empty array if data is not an array', () => {
        const data = null;

        const result = extractValidData(data);

        expect(result).toEqual([]);
    });
});
