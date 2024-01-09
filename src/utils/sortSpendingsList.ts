import { TCurrencyToValueMap, TSpendingEntry, TSpendingsListSettings } from './spendingTypes';

export const sortSpendingsList = (
    spendingsList: TSpendingEntry[],
    sortOrder: TSpendingsListSettings['sortOrder'],
    currencyToValueMap: TCurrencyToValueMap,
) => {
    const sortDirection = sortOrder.startsWith('-') ? -1 : 1;
    return [...spendingsList].sort((a, b) => {
        if (sortOrder === 'spent_at' || sortOrder === '-spent_at') {
            return sortDirection * (new Date(a['spent_at']).getTime() - new Date(b['spent_at']).getTime());
        }
        return sortDirection * (currencyToValueMap[a.currency] * a.amount - currencyToValueMap[b.currency] * b.amount);
    });
};
