import { render } from '@testing-library/react';
import SpendingsList from '../SpendingsList/SpendingsList';
import { CurrencyEnum, TSpendingEntry } from '../../utils/spendingTypes';

describe('SpendingsList', () => {
    global.crypto.randomUUID = jest.fn();
    it('should render skeleton components when isLoading is true', () => {
        const spendings: TSpendingEntry[] = [];
        const isLoading = true;
        const isError = false;

        const { container } = render(
            <SpendingsList spendings={spendings} isLoading={isLoading} isError={isError} />
        );

        expect(container.querySelectorAll('.text-group__description.skeleton').length).toBe(6);
    });

    it('should render error message when isError is true', () => {
        const spendings: TSpendingEntry[] = [];
        const isLoading = false;
        const isError = true;

        const { getByText } = render(
            <SpendingsList spendings={spendings} isLoading={isLoading} isError={isError} />
        );

        expect(getByText('An error occured while trying to acquire the list of your spendings.')).toBeTruthy();
        expect(getByText('Please try again later.')).toBeTruthy();
    });

    it('should render spendings list when spendings array is not empty', () => {
        const spendings: TSpendingEntry[] = [
            { id: 1, description: 'Spending 1', amount: 10, currency: CurrencyEnum.USD, spent_at: new Date().toISOString() },
            { id: 2, description: 'Spending 2', amount: 20, currency: CurrencyEnum.HUF, spent_at: new Date().toISOString() },
        ];
        const isLoading = false;
        const isError = false;

        const { container } = render(
            <SpendingsList spendings={spendings} isLoading={isLoading} isError={isError} />
        );

        expect(container.querySelectorAll('.spending-entry').length).toBe(2);
    });

    it('should render "No spendings added yet" message when spendings array is empty', () => {
        const spendings: TSpendingEntry[] = [];
        const isLoading = false;
        const isError = false;

        const { getByText } = render(
            <SpendingsList spendings={spendings} isLoading={isLoading} isError={isError} />
        );

        expect(getByText('No spendings added yet. Add one to get started with managing your finances.')).toBeTruthy();
    });
});