import React, { useState } from 'react';
import './Spendings.scss';
import NewSpendingForm from '../../components/NewSpendingForm/NewSpendingForm';
import SpendingDisplay from '../../components/SpendingDisplay/SpendingDisplay';
import { CurrencyOptionsEnum, TSpendingsListSettings } from '../../utils/spendingTypes';
import { useQuery } from 'react-query';
import { validData } from '../../utils/validData';
import { assembleSpendingUrl } from '../../utils/assembleSpendingUrl';

const spendingURL: string = process.env.VITE_SPENDING_API_URL as string;

const defaultListSettings: TSpendingsListSettings = {
    keyFlip: false,
    sortOrder: 'spent_at',
    currencyFilter: CurrencyOptionsEnum.ALL,
};


const Spendings: React.FC = () => {

    const [listSettings, setListSettings] = useState<TSpendingsListSettings>(defaultListSettings);

    const assembledURL = assembleSpendingUrl(listSettings, spendingURL);

    const { data, isLoading, isError } = useQuery(['spendings', listSettings], () =>
        fetch(assembledURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
    );


    const handleSettingsChange = (newListSettings: Partial<TSpendingsListSettings>) => {
        setListSettings((prevState) => ({ ...prevState, ...newListSettings }));
    }

    const triggerRefetch = () => {
        handleSettingsChange({ ...listSettings, keyFlip: !listSettings.keyFlip });
    }


    return (
        <div className="spendings-outer-container">
            <h1 className="spendings-title">Manage Spendings</h1>
            <div className="spendings-container">
                <NewSpendingForm triggerRefetch={triggerRefetch} />
                <SpendingDisplay
                    listSettings={listSettings}
                    handleSettingsChange={handleSettingsChange}
                    spendingsData={validData(data)}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </div>
    );
};


export default Spendings;