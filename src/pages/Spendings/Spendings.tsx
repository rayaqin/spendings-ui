import React, { useState } from 'react';
import './Spendings.scss';
import NewSpendingForm from '../../components/NewSpendingForm/NewSpendingForm';
import SpendingDisplay from '../../components/SpendingDisplay/SpendingDisplay';
import { CurrencyEnum, CurrencyOptionsEnum, TSpendingEntry, TSpendingsListSettings } from '../../utils/spendingTypes';
import { useQuery } from 'react-query';
import { extractValidData } from '../../utils/validData';
import { assembleSpendingUrl } from '../../utils/assembleSpendingUrl';

const spendingURL: string = process.env.VITE_SPENDING_API_URL as string;

const currencyToValueMap = {
    [CurrencyEnum.HUF]: 1,
    [CurrencyEnum.USD]: 345,
};

const sortSpendingsList = (spendingsList: TSpendingEntry[], sortOrder: TSpendingsListSettings['sortOrder']) => {
    const sortDirection = sortOrder.startsWith('-') ? -1 : 1;
    return [...spendingsList].sort((a, b) => {
        if (sortOrder === 'spent_at' || sortOrder === '-spent_at') {
            return sortDirection * (new Date(a['spent_at']).getTime() - new Date(b['spent_at']).getTime());
        }
        return sortDirection * (currencyToValueMap[a.currency] * a.amount - currencyToValueMap[b.currency] * b.amount);
    });
};

const defaultSettings: TSpendingsListSettings = {
    sortOrder: '-spent_at',
    currencyFilter: CurrencyOptionsEnum.ALL,
};

const Spendings: React.FC = () => {


    const [listSettings, setListSettings] = useState<TSpendingsListSettings>(defaultSettings);
    const [clientSideSortAndFilter, setClientSideSortAndFilter] = useState<boolean>(false);

    const assembledURL = assembleSpendingUrl(listSettings, spendingURL);

    const { data, isError, isLoading, refetch } = useQuery(['spendings', listSettings.sortOrder, listSettings.currencyFilter], () => {
        return fetch(assembledURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            });
    });


    const handleSettingsChange = (newListSettings: Partial<TSpendingsListSettings>) => {
        setListSettings((previousState) => ({ ...previousState, ...newListSettings }));
    }

    const triggerRefetch = () => {
        refetch();
    }

    const flipClientSideSortAndFilter = () => {
        setClientSideSortAndFilter((previousState) => !previousState);
    }


    return (
        <div className="spendings-outer-container">
            <h1 className="spendings-outer-container__spendings-title">Manage Spendings</h1>
            <div className="spendings-outer-container__spendings-container">
                <div className="">
                    <button className="spendings-container__client-side-sort-and-filter-button" onClick={flipClientSideSortAndFilter}>
                        ClientSideSortAndFilter {clientSideSortAndFilter ? 'ON' : 'OFF'}
                    </button>
                </div>
                <NewSpendingForm triggerRefetch={triggerRefetch} />
                <SpendingDisplay
                    listSettings={listSettings}
                    handleSettingsChange={handleSettingsChange}
                    spendingsData={clientSideSortAndFilter ? sortSpendingsList(extractValidData(data), listSettings.sortOrder) : extractValidData(data)}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </div>
    );
};


export default Spendings;