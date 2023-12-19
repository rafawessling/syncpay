import { Box } from '@mui/material';
import { useDataContext } from '../../context/DataContext.jsx';
import { useModalWindowContext } from '../../context/ModalWindowContext.jsx';
import { StyledModal } from '../../utils/StyledModal.jsx';
import { FormatDate } from '../../utils/FormatInputForms.jsx';
import ChargesIcon from '../../assets/charges-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import '../../styles/ModalForms.css';
import './ModalChargeDetail.css';

function ModalChargeDetail() {
    const { chargeData } = useDataContext();
    const { showCharge, setShowCharge } = useModalWindowContext();

    return (
        <StyledModal open={showCharge}>
            <Box className="container-modal-charge-detail">
                <img className="close-icon-modal" src={CloseIcon} alt="Black X" onClick={() => setShowCharge(false)} />

                <section className="title-modal-charge-detail">
                    <img src={ChargesIcon} alt="Charges icon" />
                    <h2>Charge Detail</h2>
                </section>
                <section className="content-modal-charge-detail">
                    <h4 className="label-charge-detail">Name</h4>
                    <h4 className="value-charge-detail charge-detail-name">{chargeData.name}</h4>
                    <h4 className="label-charge-detail">Description</h4>
                    <h4 className="value-charge-detail charge-detail-description">{chargeData.description}</h4>
                    <section>
                        <div className="small-field-charge-detail">
                            <h4 className="label-charge-detail">Due Date</h4>
                            <h4 className="value-charge-detail charge-detail-due-date">
                                {FormatDate(chargeData.due_date)}
                            </h4>
                        </div>
                        <div className="small-field-charge-detail">
                            <h4 className="label-charge-detail">Amount</h4>
                            <h4 className="value-charge-detail charge-detail-amount">{chargeData.amount}</h4>
                        </div>
                    </section>
                    <section>
                        <div className="small-field-charge-detail">
                            <h4 className="label-charge-detail">Charge ID</h4>
                            <h4 className="value-charge-detail charge-detail-id">{chargeData.id}</h4>
                        </div>
                        <div className="small-field-charge-detail">
                            <h4 className="label-charge-detail">Status</h4>
                            <h4
                                className={`value-charge-detail charge-detail-status ${
                                    chargeData.status === 'Overdue' && 'status-overdue'
                                } ${chargeData.status === 'Pending' && 'status-pending'} ${
                                    chargeData.status === 'Paid' && 'status-paid'
                                }`}
                            >
                                {chargeData.status}
                            </h4>
                        </div>
                    </section>
                </section>
            </Box>
        </StyledModal>
    );
}

export default ModalChargeDetail;
