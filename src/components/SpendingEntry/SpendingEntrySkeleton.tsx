import React from 'react';
import { CiEdit as EditIcon } from "react-icons/ci";
import { RxCross2 as DeleteIcon } from "react-icons/rx";


const SpendingEntrySkeleton: React.FC = () => {
    return (
        <li className="spending-entry" key={window.crypto.randomUUID()}>
            <div className="spending-entry__left-group">
                <div className="left-group__icon-box skeleton"></div>
                <div className="left-group__text-group">
                    <p className="text-group__description skeleton"></p>
                    <time className="text-group__date skeleton"></time>
                </div>
            </div>

            <div className="spending-entry__right-group">
                <span className="right-group__amount skeleton"></span>
                <div className="right-group__button-group">
                    <button className="button-group__edit" disabled><EditIcon /></button>
                    <button className="button-group__delete" disabled><DeleteIcon /></button>
                </div>
            </div>
        </li>
    );
}

export default SpendingEntrySkeleton;