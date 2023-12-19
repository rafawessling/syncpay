import { useEffect } from 'react';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { Box } from '@mui/material';
import { StyledModal } from '../../utils/StyledModal';
import SuccessIcon from '../../assets/success-icon.svg';
import './SuccessUpdateUser.css';

function SuccessUpdateUser() {
    const { showSuccessUpdate, setShowSuccessUpdate } = useModalWindowContext();

    useEffect(() => {
        if (showSuccessUpdate) {
            setTimeout(() => {
                setShowSuccessUpdate(false);
            }, 2000);
        }
    }, [showSuccessUpdate]);
    return (
        <StyledModal open={showSuccessUpdate}>
            <Box className="container-success-update">
                <img className="success-icon" src={SuccessIcon} alt="Blue X" />
                <h2 className="text-success-update">Registration updated successfully</h2>
            </Box>
        </StyledModal>
    );
}

export default SuccessUpdateUser;
