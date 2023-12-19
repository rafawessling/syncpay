import { useEffect } from 'react';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import Alert from '@mui/material/Alert';
import CloseIcon from '../../assets/close-icon.svg';
import './SuccessMessage.css';

function SuccessMessage({ message }) {
    const { showSuccess, setShowSuccess } = useModalWindowContext();
    useEffect(() => {
        if (showSuccess) {
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [showSuccess]);
    return (
        <Alert variant="filled" severity="success" className={`success-message ${showSuccess && 'show-success'}`}>
            {message}
            <img className="close-success-message " src={CloseIcon} alt="Blue X" onClick={setShowSuccess(false)} />
        </Alert>
    );
}

export default SuccessMessage;
