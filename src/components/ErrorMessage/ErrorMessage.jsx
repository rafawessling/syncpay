import { useEffect } from 'react';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import Alert from '@mui/material/Alert';
import CloseIcon from '../../assets/close-icon-error.svg';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
    const { showError, setShowError } = useModalWindowContext();
    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }, [showError]);

    return (
        <Alert variant="filled" severity="error" className={`error-message ${showError && 'show-error'}`}>
            {message}
            <img className="close-error-message " src={CloseIcon} alt="" onClick={() => setShowError(false)} />
        </Alert>
    );
}

export default ErrorMessage;
