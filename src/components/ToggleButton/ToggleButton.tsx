import './ToggleButton.scss';

type ToggleButtonProps = {
    toggleFn: () => void;
    value: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ toggleFn, value }) => {
    return (
        <>
            <input className="tgl tgl-flip" id="cb5" type="checkbox" checked={value} onChange={toggleFn} />
            <label className="tgl-btn" data-tg-off="Server side filtering" data-tg-on="Client side filtering" htmlFor="cb5"></label>
        </>
    );
}

export default ToggleButton;