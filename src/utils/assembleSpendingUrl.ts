import { TSpendingsListSettings } from './spendingTypes';

export const assembleSpendingUrl = (isDefault: boolean, listSettings: TSpendingsListSettings, defaultURL: string) => {
    if (isDefault) return defaultURL;
    const { currencyFilter, sortOrder } = listSettings;
    let url = defaultURL + '?';
    if (currencyFilter && currencyFilter !== 'ALL') url += `currency=${listSettings.currencyFilter}&`;
    if (sortOrder) url += `order=${sortOrder}`;

    return url;
};
