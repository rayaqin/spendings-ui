import { sortSpendingsList } from '../sortSpendingsList';
import { CurrencyEnum } from '../spendingTypes';

describe('sortSpendingsList', () => {
    const currencyToValueMap = {
        [CurrencyEnum.HUF]: 1,
        [CurrencyEnum.USD]: 345,
    };

    const spendingsList = [
        { id: 1, description: 'Spending 1', amount: 1, currency: CurrencyEnum.USD, spent_at: '2022-01-01' },
        { id: 2, description: 'Spending 2', amount: 344, currency: CurrencyEnum.HUF, spent_at: '2022-01-02' },
        { id: 3, description: 'Spending 3', amount: 15, currency: CurrencyEnum.USD, spent_at: '2022-01-03' },
    ];

    it('should sort spendings list by date in ascending order if sortOrder is "spent_at"', () => {
        const sortOrder = 'spent_at';
        const sortedList = sortSpendingsList(spendingsList, sortOrder, currencyToValueMap);

        expect(sortedList).toEqual([
            { id: 1, description: 'Spending 1', amount: 1, currency: CurrencyEnum.USD, spent_at: '2022-01-01' },
            { id: 2, description: 'Spending 2', amount: 344, currency: CurrencyEnum.HUF, spent_at: '2022-01-02' },
            { id: 3, description: 'Spending 3', amount: 15, currency: CurrencyEnum.USD, spent_at: '2022-01-03' },
        ]);
    });

    it('should sort spendings list by date in descending order if sortOrder is "-spent_at"', () => {
        const sortOrder = '-spent_at';
        const sortedList = sortSpendingsList(spendingsList, sortOrder, currencyToValueMap);

        expect(sortedList).toEqual([
            { id: 3, description: 'Spending 3', amount: 15, currency: CurrencyEnum.USD, spent_at: '2022-01-03' },
            { id: 2, description: 'Spending 2', amount: 344, currency: CurrencyEnum.HUF, spent_at: '2022-01-02' },
            { id: 1, description: 'Spending 1', amount: 1, currency: CurrencyEnum.USD, spent_at: '2022-01-01' },
        ]);
    });

    it('should sort spendings list by amount in ascending order if sortOrder is "amount"', () => {
        const sortOrder = 'amount';
        const sortedList = sortSpendingsList(spendingsList, sortOrder, currencyToValueMap);

        expect(sortedList).toEqual([
            { id: 2, description: 'Spending 2', amount: 344, currency: CurrencyEnum.HUF, spent_at: '2022-01-02' },
            { id: 1, description: 'Spending 1', amount: 1, currency: CurrencyEnum.USD, spent_at: '2022-01-01' },
            { id: 3, description: 'Spending 3', amount: 15, currency: CurrencyEnum.USD, spent_at: '2022-01-03' },
        ]);
    });

    it('should sort spendings list by amount in descending order if sortOrder is "-amount"', () => {
        const sortOrder = '-amount';
        const sortedList = sortSpendingsList(spendingsList, sortOrder, currencyToValueMap);

        expect(sortedList).toEqual([
            { id: 3, description: 'Spending 3', amount: 15, currency: CurrencyEnum.USD, spent_at: '2022-01-03' },
            { id: 1, description: 'Spending 1', amount: 1, currency: CurrencyEnum.USD, spent_at: '2022-01-01' },
            { id: 2, description: 'Spending 2', amount: 344, currency: CurrencyEnum.HUF, spent_at: '2022-01-02' },
        ]);
    });
});
