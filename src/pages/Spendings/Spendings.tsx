import React, { useEffect, useState } from 'react';
import './Spendings.scss';
import NewSpendingForm from '../../components/NewSpendingForm/NewSpendingForm';
import SpendingDisplay from '../../components/SpendingDisplay/SpendingDisplay';
import { CurrencyEnum, CurrencyOptionsEnum, TSpendingsListSettings } from '../../utils/spendingTypes';
import { useQuery } from 'react-query';
import { extractValidData } from '../../utils/validData';
import { assembleSpendingUrl } from '../../utils/assembleSpendingUrl';
import { useCookies } from 'react-cookie';
import { sortSpendingsList } from '../../utils/sortSpendingsList';

const spendingURL: string = process.env.VITE_SPENDING_API_URL as string;

const currencyToValueMap = {
    [CurrencyEnum.HUF]: 1,
    [CurrencyEnum.USD]: 345,
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

    // for fun
    useEffect(() => {
        fetch(process.env.VITE_EXCHANGE_RATE_API_URL as string)
            .then(response => response.json())
            .then(data => {
                if (data && data.rates && data.rates['HUF'] && data.rates['USD']) {
                    const usdValue = data.rates['HUF'] / data.rates['USD'];
                    console.info("%c1 USD equals " + usdValue + " HUF", "font-weight: bold; color: #22dd22");
                    currencyToValueMap[CurrencyEnum.USD] = usdValue;
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rate:', error);
            });
    }, []);



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
                    spendingsData={listSettings.clientSideSortAndFilter ? sortSpendingsList(extractValidData(data), listSettings.sortOrder, currencyToValueMap) : extractValidData(data)}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </div>
    );
};


export default Spendings;