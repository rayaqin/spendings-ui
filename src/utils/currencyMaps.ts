import { CurrencyEnum } from './spendingTypes';

export const currencyToDisplayMap = {
    [CurrencyEnum.USD]: '$',
    [CurrencyEnum.HUF]: 'Ft',
};

export const currencyToSideMap = {
    [CurrencyEnum.USD]: 'left',
    [CurrencyEnum.HUF]: 'right',
};
