import React from 'react';
import { CurrencyOptionsEnum, TSpendingsListSettings } from '../../utils/spendingTypes';
import './SpendingListSettings.scss';
import classNames from 'classnames';
import ToggleButton from '../ToggleButton/ToggleButton';

type SpendingListSettingsProps = {
    handleSettingsChange: (newListSettings: Partial<TSpendingsListSettings>) => void,
    listSettings: TSpendingsListSettings,
}

const SpendingListSettings: React.FC<SpendingListSettingsProps> = ({ handleSettingsChange, listSettings }) => {

    const flipClientSideSortAndFilter = () => {
        handleSettingsChange({ clientSideSortAndFilter: !listSettings.clientSideSortAndFilter });
    }
    return (
        <div className="spending-display__settings">
            <div className="settings__wrapper-box">
                <select
                    id="sort-order"
                    className="wrapper-box__sort-order"
                    value={listSettings.sortOrder as string}
                    onChange={(event) => handleSettingsChange({ sortOrder: event.target.value as TSpendingsListSettings['sortOrder'] })}
                >
                    <option value="spent_at">Sort by Date ascending</option>
                    <option value="-spent_at">Sort by Date descending (default)</option>
                    <option value="amount">Sort by Amount ascending</option>
                    <option value="-amount">Sort by Amount descending</option>
                </select>
                <div className="spendings-container__settings">
                    <ToggleButton toggleFn={flipClientSideSortAndFilter} value={listSettings.clientSideSortAndFilter} />
                </div>
                <div className="wrapper-box__currency" >
                    {Object.values(CurrencyOptionsEnum).map((currency) => (
                        <button
                            className={classNames('currency__button', { 'button__selected': listSettings.currencyFilter === CurrencyOptionsEnum[currency] })}
                            key={currency}
                            onClick={() => handleSettingsChange({ currencyFilter: CurrencyOptionsEnum[currency] })}
                        >
                            {currency}
                        </button>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default SpendingListSettings;