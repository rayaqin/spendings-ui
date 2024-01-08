import { assembleSpendingUrl } from '../assembleSpendingUrl';
import { CurrencyOptionsEnum, TSpendingsListSettings } from '../spendingTypes';

describe('assembleSpendingUrl', () => {
    it('should return default URL when isDefault is true', () => {
        const isDefault = true;
        const listSettings: TSpendingsListSettings = { keyFlip: false, sortOrder: 'spent_at', currencyFilter: CurrencyOptionsEnum.USD };
        const defaultURL = 'https://example.com';

        const result = assembleSpendingUrl(isDefault, listSettings, defaultURL);

        expect(result).toBe(defaultURL);
    });

    it('should return URL with currency and order parameters when isDefault is false and currencyFilter', () => {
        const isDefault = false;
        const listSettings: TSpendingsListSettings = { keyFlip: false, sortOrder: '-spent_at', currencyFilter: CurrencyOptionsEnum.USD };
        const defaultURL = 'https://example.com';

        const result = assembleSpendingUrl(isDefault, listSettings, defaultURL);

        expect(result).toBe(`${defaultURL}?currency=USD&order=-spent_at`);
    });

    it('should return URL without currency parameter when currencyFilter is "ALL"', () => {
        const isDefault = false;
        const listSettings: TSpendingsListSettings = { keyFlip: false, sortOrder: 'spent_at', currencyFilter: CurrencyOptionsEnum.ALL };
        const defaultURL = 'https://example.com';

        const result = assembleSpendingUrl(isDefault, listSettings, defaultURL);

        expect(result).toBe(`${defaultURL}?order=spent_at`);
    });
});
