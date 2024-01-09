export enum CurrencyEnum {
    HUF = 'HUF',
    USD = 'USD',
}
export enum CurrencyOptionsEnum {
    HUF = 'HUF',
    USD = 'USD',
    ALL = 'ALL',
}

export type TSpendingEntry = {
    id: number;
    description: string;
    amount: number;
    currency: keyof typeof CurrencyEnum;
    spent_at: string;
};

export type TNewSpendingEntry = {
    description: string;
    amount: string;
    currency: CurrencyEnum;
};

export type TCurrencyToValueMap = {
    [key in keyof typeof CurrencyEnum]: number;
};

export type TNewSpending = Omit<TSpendingEntry, 'id'>;

export type TSaveButtonState = 'Save' | 'loading' | 'Success' | 'Error';

export enum SpendingInputEnum {
    description = 'description',
    amount = 'amount',
    currency = 'currency',
    spent_at = 'spent_at',
}

export type TSpendingInputType = keyof typeof SpendingInputEnum;

export type TSpendingsListSettings = {
    sortOrder: 'spent_at' | 'amount' | '-spent_at' | '-amount';
    currencyFilter: CurrencyOptionsEnum;
    clientSideSortAndFilter: boolean;
};
