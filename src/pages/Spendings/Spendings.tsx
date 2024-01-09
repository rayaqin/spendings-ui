import React, { useState } from 'react';
import './Spendings.scss';
import NewSpendingForm from '../../components/NewSpendingForm/NewSpendingForm';
import SpendingDisplay from '../../components/SpendingDisplay/SpendingDisplay';
import { CurrencyEnum, CurrencyOptionsEnum, TSpendingEntry, TSpendingsListSettings } from '../../utils/spendingTypes';
import { useQuery } from 'react-query';
import { extractValidData } from '../../utils/validData';
import { assembleSpendingUrl } from '../../utils/assembleSpendingUrl';
import { useCookies } from 'react-cookie';

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



const Spendings: React.FC = () => {

    const [cookies, setCookie] = useCookies<keyof TSpendingsListSettings>(['currencyFilter', 'sortOrder', 'clientSideSortAndFilter']);

    const defaultSettings: TSpendingsListSettings = {
        sortOrder: cookies.sortOrder || '-spent_at',
        currencyFilter: cookies.currencyFilter || CurrencyOptionsEnum.ALL,
        clientSideSortAndFilter: cookies.clientSideSortAndFilter || false,
    };
    const [listSettings, setListSettings] = useState<TSpendingsListSettings>(defaultSettings);

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
        setCookie('currencyFilter', newListSettings.currencyFilter ?? cookies.currencyFilter);
        setCookie('sortOrder', newListSettings.sortOrder ?? cookies.sortOrder);
        setCookie('clientSideSortAndFilter', newListSettings.clientSideSortAndFilter ?? cookies.clientSideSortAndFilter);

    }

    const triggerRefetch = () => {
        refetch();
    }


    return (
        <div className="spendings-outer-container">
            <h1 className="spendings-outer-container__spendings-title">Manage Spendings</h1>
            <div className="spendings-outer-container__spendings-container">
                <NewSpendingForm triggerRefetch={triggerRefetch} />
                <SpendingDisplay
                    listSettings={listSettings}
                    handleSettingsChange={handleSettingsChange}
                    spendingsData={listSettings.clientSideSortAndFilter ? sortSpendingsList(extractValidData(data), listSettings.sortOrder) : extractValidData(data)}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </div>
    );
};


export default Spendings;