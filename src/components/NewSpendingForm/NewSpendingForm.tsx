import React, { useState } from 'react';
import { CurrencyEnum, TNewSpending, TNewSpendingEntry, TSaveButtonState } from '../../utils/spendingTypes';
import { useMutation } from 'react-query';
import { Theme, ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './NewSpendingForm.scss';
import classNames from 'classnames';

const spendingURL: string = process.env.VITE_SPENDING_API_URL as string;

const defaultFormData: TNewSpendingEntry = {
    description: '',
    amount: '0',
    currency: CurrencyEnum.USD,
};

const toastSettings = {
    position: "bottom-center" as ToastPosition,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark" as Theme,
};

type NewSpendingFormProps = {
    triggerRefetch: () => void,
}

const NewSpendingForm: React.FC<NewSpendingFormProps> = ({ triggerRefetch }) => {

    const [formData, setFormData] = useState<TNewSpendingEntry>(defaultFormData);

    const [saveButtonState, setSaveButtonState] = useState<TSaveButtonState>('Save');

    const mutation = useMutation({
        mutationFn: async (formData: TNewSpending) => {
            const response = await fetch(spendingURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        },
        onSuccess: () => {
            resetForm();
            triggerRefetch();
        },
        onError: () => {
            setSaveButtonState('Error');
            toast.error('An error occured while saving the spending. Try again later.', { ...toastSettings, toastId: 'error' });
            setTimeout(() => {
                setSaveButtonState('Save');
            }, 2000);
        }
    });

    function resetForm() {
        setFormData((prevState) => ({
            ...prevState,
            description: '',
            amount: '0',
        }));
        setSaveButtonState('Save');
    }

    const handleChange = (key: keyof TNewSpendingEntry) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (key === 'description') {
            if (event.target.value.length === 200) {
                toast.info('The description can at most be 200 characters long.', { ...toastSettings, toastId: 'description' });
                return;
            }
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: event.target.value,
        }));
    };

    const saveSpending = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (saveButtonState !== 'Save') return;
        const postData = {
            ...formData,
            amount: parseFloat(formData.amount),
            spent_at: new Date(),
        }

        setSaveButtonState('loading');

        mutation.mutate(postData);
    }

    const { description, amount, currency } = formData;

    return (
        <form onSubmit={saveSpending} className='spending-display__new-spending-form'>
            <div className='new-spending-form__inputs'>
                <input
                    id='description'
                    type='text'
                    className='inputs__description'
                    value={description}
                    placeholder='description'
                    maxLength={200}
                    onChange={handleChange('description')}
                    required
                />
                <div className="inputs__wrapper">
                    <input
                        id='amount'
                        type='number'
                        className='wrapper__amount'
                        step='0.01'
                        min='0.01'
                        value={amount}
                        onChange={handleChange('amount')}
                        required
                    />

                    <select
                        id='currency'
                        className='wrapper__currency'
                        value={currency}
                        onChange={handleChange('currency')}
                    >
                        {Object.keys(CurrencyEnum).map((key) => {
                            return <option key={key} value={key}>{key}</option>;
                        })}
                    </select>

                </div>
            </div>

            <button type='submit' className={classNames('new-spending-form__submit', { 'error': saveButtonState === 'Error' })}>
                {saveButtonState === 'loading' ?
                    <span className='loader' />
                    :
                    saveButtonState}
            </button>

            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </form>
    );
}

export default NewSpendingForm;