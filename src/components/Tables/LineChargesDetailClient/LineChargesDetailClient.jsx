import { useDataContext } from '../../../context/DataContext';
import { useModalWindowContext } from '../../../context/ModalWindowContext';
import { FormatDate, FormatMoney } from '../../../utils/FormatInputForms';
import { TableCell, TableRow } from '@mui/material';
import EditCharge from '../../../assets/edit-charge.svg';
import RemoveCharge from '../../../assets/remove-charge.svg';
import '../../../styles/LineCharges.css';

function LineChargesDetailClient({ chargeData }) {
    const { setChargeData, setUpdateCharge } = useDataContext();
    const { setShowCharge, setAlertDelete } = useModalWindowContext();
    const { id, due_date, value, description } = chargeData;
    let { status } = chargeData;

    const currentDate = new Date().toISOString().split('T')[0];
    const chargeDate = new Date(due_date).toISOString().split('T')[0];

    if (status === 0) {
        if (chargeDate < currentDate) {
            status = 'Overdue';
        } else {
            status = 'Pending';
        }
    } else if (status === 1) {
        status = 'Paid';
    }

    const handleDetailsClick = () => {
        setChargeData({
            name: chargeData.client_name,
            amount: FormatMoney(value),
            id,
            due_date: chargeDate,
            status,
            description,
        });
        setShowCharge(true);
    };

    const handleEditClick = () => {
        setChargeData({
            name: chargeData.client_name,
            amount: FormatMoney(value),
            id,
            due_date: chargeDate,
            status,
            description,
        });
        setUpdateCharge(true);
    };

    const handleDeleteClick = () => {
        setChargeData({
            name: chargeData.client_name,
            amount: FormatMoney(value),
            id,
            due_date: chargeDate,
            status,
            description,
        });
        setAlertDelete(true);
    };

    return (
        <TableRow className="container-detail-charges-data-client" key={id}>
            <TableCell className="content-charges-client-cell" onClick={handleDetailsClick}>
                <h4 className="detail-tables-data">{id}</h4>
            </TableCell>
            <TableCell className="content-charges-client-cell" onClick={handleDetailsClick}>
                <h4 className="detail-tables-data">{FormatDate(due_date)}</h4>
            </TableCell>
            <TableCell className="content-charges-client-cell" onClick={handleDetailsClick}>
                <h4 className="detail-tables-data">{FormatMoney(value)}</h4>
            </TableCell>
            <TableCell className="content-charges-client-cell" onClick={handleDetailsClick}>
                <h4
                    className={`detail-tables-data charge-status ${status === 'Overdue' && 'status-overdue'} ${
                        status === 'Pending' && 'status-pending'
                    } ${status === 'Paid' && 'status-paid'}`}
                >
                    {status}
                </h4>
            </TableCell>
            <TableCell
                className="content-charges-client-cell container-charge-description-client"
                onClick={handleDetailsClick}
            >
                <h4 className="detail-tables-data charge-description">{description}</h4>
            </TableCell>
            <TableCell className="content-charges-client-cell icons">
                <img className="edit-charge-icon" src={EditCharge} alt="Edit icon" onClick={handleEditClick} />
                <img className="remove-charge-icon" src={RemoveCharge} alt="Remove icon" onClick={handleDeleteClick} />
            </TableCell>
        </TableRow>
    );
}

export default LineChargesDetailClient;
