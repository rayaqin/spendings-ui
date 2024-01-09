import React from 'react';
import './SpendingsList.scss';
import { TSpendingEntry } from '../../utils/spendingTypes';
import SpendingEntry from '../SpendingEntry/SpendingEntry';
import SpendingEntrySkeleton from '../SpendingEntry/SpendingEntrySkeleton';


type SpendingsListProps = {
    spendings: TSpendingEntry[];
    isLoading: boolean;
    isError: boolean;
}

const SpendingsList: React.FC<SpendingsListProps> = ({ spendings, isLoading, isError }) => {
    return (
        <ul className="spendings-list">
            {isLoading ?
                [0, 1, 2, 3, 4, 5].map((key) => <SpendingEntrySkeleton key={key} />) :
                isError ?
                    <>
                        <p>An error occured while trying to acquire the list of your spendings.</p>
                        <p> Please try again later.</p>
                    </> :
                    spendings.length ?
                        spendings.map(spending => (<SpendingEntry spending={spending} key={spending.id} />)) :
                        <p>No spendings added yet. Add one to get started with managing your finances.</p>}
        </ul>
    );
}

export default SpendingsList;