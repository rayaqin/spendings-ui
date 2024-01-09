import { CurrencyEnum, TSpendingEntry } from './spendingTypes';

export const extractValidData = (data: unknown): TSpendingEntry[] => {
    if (!Array.isArray(data)) return [];
    return data
        .filter((entry) => {
            return (
                entry?.id &&
                entry?.description &&
                entry?.amount &&
                !Number.isNaN(parseFloat(entry?.amount)) &&
                entry?.currency &&
                entry?.currency in CurrencyEnum &&
                entry?.spent_at &&
                !Number.isNaN(Date.parse(entry?.spent_at))
            );
        })
        .map((entry) => ({
            ...entry,
            spent_at: entry.spent_at,
        }));
};
