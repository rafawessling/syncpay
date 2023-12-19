import { useModalWindowContext } from '../../context/ModalWindowContext.jsx';
import { useDataContext } from '../../context/DataContext.jsx';
import { getItem } from '../../utils/storage.jsx';
import { Box, Button } from '@mui/material';
import { StyledModal } from '../../utils/StyledModal.jsx';
import api from '../../services/api.js';
import CloseIcon from '../../assets/close-icon.svg';
import AlertIcon from '../../assets/alert-icon.svg';
import '../../styles/ModalForms.css';
import './ModalAlertDeleteCharge.css';

function ModalAlertDeleteCharge() {
    const { setShowError, alertDelete, setAlertDelete, setShowSuccessDeleteCharge } = useModalWindowContext();
    const { chargeData, setReloadTable } = useDataContext();

    const handleSubmit = async () => {
        if (chargeData.status === 'Pending') {
            try {
                const token = getItem('token');
                await api.delete(`/charges/${chargeData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setShowSuccessDeleteCharge(true);
                setReloadTable(true);
            } catch (error) {
                console.error(error);
                setShowError(true);
            }
        } else {
            setShowError(true);
        }

        setAlertDelete(false);
        return;
    };

    return (
        <StyledModal open={alertDelete}>
            <Box className="container-modal-delete-charge">
                <img className="close-icon-modal" src={CloseIcon} alt="Black X" onClick={() => setAlertDelete(false)} />
                <img src={AlertIcon} alt="" />
                <span className="text-confirm-delete-charge">Are you sure you want to delete this charge?</span>
                <section className="btns-delete-charge">
                    <Button className="btn-delete-charge-no" variant="contained" onClick={() => setAlertDelete(false)}>
                        No
                    </Button>
                    <Button className="btn-delete-charge-yes" variant="contained" onClick={handleSubmit}>
                        Yes
                    </Button>
                </section>
            </Box>
        </StyledModal>
    );
}

export default ModalAlertDeleteCharge;
