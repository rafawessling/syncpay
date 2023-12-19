import { Link } from 'react-router-dom';
import { useClientsContext } from '../../../context/clientsContext';
import { useModalWindowContext } from '../../../context/ModalWindowContext';
import { FormatCPF, FormatPhone } from '../../../utils/FormatInputForms';
import { TableCell, TableRow } from '@mui/material';
import CreateCharge from '../../../assets/create-charge.svg';
import './LineClientsTable.css';

function LineClientsTable({ clientData }) {
    const { setRegisterCharge } = useModalWindowContext();
    const { setClientCharge } = useClientsContext();
    const { id, name, cpf, email, phone_number, status } = clientData;

    return (
        <TableRow className="container-detail-clients-data" key={id}>
            <TableCell>
                <Link to={`/client-details/${id}`}>
                    <h4 className="detail-tables-data detail-client-name">{name}</h4>
                </Link>
            </TableCell>
            <TableCell>
                <h4 className="detail-tables-data">{FormatCPF(cpf)}</h4>
            </TableCell>
            <TableCell>
                <h4 className="detail-tables-data">{email}</h4>
            </TableCell>
            <TableCell>
                <h4 className="detail-tables-data">{FormatPhone(phone_number)}</h4>
            </TableCell>
            <TableCell>
                <h4 className={`detail-tables-data client-status ${status ? 'status-correct' : 'status-defaulter'}`}>
                    {status ? 'Correct' : 'Defaulter'}
                </h4>
            </TableCell>
            <TableCell>
                <img
                    className="create-charge-icon"
                    src={CreateCharge}
                    alt="Register charge icon"
                    onClick={() => {
                        setRegisterCharge(true);
                        setClientCharge(clientData);
                    }}
                />
            </TableCell>
        </TableRow>
    );
}

export default LineClientsTable;
