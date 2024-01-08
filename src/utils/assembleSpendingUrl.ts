import { TSpendingsListSettings } from './spendingTypes';

export const assembleSpendingUrl = (listSettings: TSpendingsListSettings, defaultURL: string) => {
    const { currencyFilter, sortOrder } = listSettings;
    let url = defaultURL + '?';
    if (currencyFilter && currencyFilter !== 'ALL') url += `currency=${listSettings.currencyFilter}&`;
    if (sortOrder) url += `order=${sortOrder}`;

    return url;
};
