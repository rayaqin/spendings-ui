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
    spent_at: Date;
};

export type TNewSpendingEntry = {
    description: string;
    amount: string;
    currency: CurrencyEnum;
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
    keyFlip: boolean;
    sortOrder: 'spent_at' | 'amount' | '-spent_at' | '-amount';
    currencyFilter: CurrencyOptionsEnum;
};
