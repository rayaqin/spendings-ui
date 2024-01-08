import React from 'react';
import './SpendingDisplay.scss';
import { TSpendingEntry, TSpendingsListSettings } from '../../utils/spendingTypes';
import SpendingsList from '../SpendingsList/SpendingsList';
import SpendingListSettings from '../SpendingListSettings/SpendingListSettings';

type SpendingDisplayProps = {
    listSettings: TSpendingsListSettings,
    handleSettingsChange: (newListSettings: Partial<TSpendingsListSettings>) => void,
    spendingsData: TSpendingEntry[],
    isLoading: boolean,
    isError: boolean,
}

const SpendingDisplay: React.FC<SpendingDisplayProps> = ({ listSettings, handleSettingsChange, spendingsData, isLoading, isError }) => {

    return (
        <div className="spending-display">
            <SpendingListSettings listSettings={listSettings} handleSettingsChange={handleSettingsChange} />
            <SpendingsList spendings={spendingsData} isLoading={isLoading} isError={isError} />
        </div>
    );
}

export default SpendingDisplay;
