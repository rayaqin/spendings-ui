import { assembleSpendingUrl } from '../assembleSpendingUrl';
import { CurrencyOptionsEnum, TSpendingsListSettings } from '../spendingTypes';

describe('assembleSpendingUrl', () => {
    it('should return an url with both currency and sort order when currencyFilter is USD', () => {
        const listSettings: TSpendingsListSettings = {
            sortOrder: 'spent_at',
            currencyFilter: CurrencyOptionsEnum.USD,
            clientSideSortAndFilter: false,
        };
        const defaultURL = 'https://example.com';

        const result = assembleSpendingUrl(listSettings, defaultURL);

        expect(result).toBe(`${defaultURL}?currency=USD&order=spent_at`);
    });

    it('should return URL without currency parameter when currencyFilter is "ALL"', () => {
        const listSettings: TSpendingsListSettings = {
            sortOrder: 'spent_at',
            currencyFilter: CurrencyOptionsEnum.ALL,
            clientSideSortAndFilter: false,
        };
        const defaultURL = 'https://example.com';

        const result = assembleSpendingUrl(listSettings, defaultURL);

        expect(result).toBe(`${defaultURL}?order=spent_at`);
    });
});
