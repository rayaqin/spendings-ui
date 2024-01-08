import { CurrencyEnum, TSpendingEntry } from '../../utils/spendingTypes';
import './SpendingEntry.scss';
import { CiEdit as EditIcon } from "react-icons/ci";
import { LuDollarSign } from "react-icons/lu";
import { TbCurrencyForint } from "react-icons/tb";
import { RxCross2 as DeleteIcon } from "react-icons/rx";

import React from 'react';
import { formatSpendingsDate } from '../../utils/formatSpendingsDate';
import { currencyToDisplayMap, currencyToSideMap } from '../../utils/currencyMaps';

const currencyToIconMap = {
    [CurrencyEnum.USD]: <LuDollarSign className="icon-box__icon" />,
    [CurrencyEnum.HUF]: <TbCurrencyForint className="icon-box__icon" />,
};

type SpendingEntryProps = {
    spending: TSpendingEntry,
}

const SpendingEntry: React.FC<SpendingEntryProps> = ({ spending }) => {

    const { id, description, amount, currency, spent_at } = spending;


    const amountWithCurrency = () => {
        if (currencyToSideMap[currency] === 'left') return `${currencyToDisplayMap[currency]}${amount}`;
        if (currencyToSideMap[currency] === 'right') return `${amount}${currencyToDisplayMap[currency]}`;
        return amount;
    }


    return (
        <li className="spending-entry" key={id}>
            <div className="spending-entry__left-group">
                <div className="left-group__icon-box">
                    {currencyToIconMap[currency]}
                </div>
                <div className="left-group__text-group">
                    <p className="text-group__description">{description}</p>
                    <time className="text-group__date">{formatSpendingsDate(spent_at)}</time>
                </div>
            </div>

            <div className="spending-entry__right-group">

                <span className="right-group__amount">{amountWithCurrency()}</span>
                <div className="right-group__button-group">
                    <button className="button-group__edit" disabled><EditIcon /></button>
                    <button className="button-group__delete" disabled><DeleteIcon /></button>
                </div>
            </div>
        </li>
    );
}

export default SpendingEntry;