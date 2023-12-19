import { useClientsContext } from '../../../context/clientsContext';
import { Button } from '@mui/base';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormatCPF, FormatPhone, FormatCEP } from '../../../utils/FormatInputForms';
import EditIconBtn from '../../../assets/edit-icon-btn.svg';
import '../../../styles/DetailTablesHome.css';
import '../../../styles/ChargesTables.css';
import './ClientData.css';

function ClientData({ setUpdateClient }) {
    const { clientData } = useClientsContext();
    const { email, phone_number, cpf, address, district, address2, zip_code, city, state } = clientData;

    return (
        <TableContainer className="container-table container-client-data">
            <section className="container-charges-client-title">
                <h2 className="charges-client-title">Client Data</h2>
                <Button className="btn-edit-client" variant="contained" onClick={() => setUpdateClient(true)}>
                    <img src={EditIconBtn} alt="Edit icon" />
                    Update Client
                </Button>
            </section>
            <Table className="detail-charges-client-table first-client-data">
                <TableHead>
                    <TableRow className="header-client-data">
                        <TableCell className="content-client-data-header col-1-client-data">
                            <h3 className="detail-tables-header client-data-header">Email</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header col-2-client-data">
                            <h3 className="detail-tables-header client-data-header">Phone Number</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header">
                            <h3 className="detail-tables-header client-data-header">CPF</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className="body-client-data">
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{email}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{FormatPhone(phone_number || '')}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{FormatCPF(cpf || '')}</h3>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table className="detail-charges-client-table client-data-table">
                <TableHead>
                    <TableRow className="header-client-data">
                        <TableCell className="content-client-data-header col-1-client-address">
                            <h3 className="detail-tables-header client-data-header">Address</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header col-2-client-address">
                            <h3 className="detail-tables-header client-data-header ">District</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header">
                            <h3 className="detail-tables-header client-data-header">Address 2</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header">
                            <h3 className="detail-tables-header client-data-header">CEP</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header">
                            <h3 className="detail-tables-header client-data-header">City</h3>
                        </TableCell>
                        <TableCell className="content-client-data-header">
                            <h3 className="detail-tables-header client-data-header">State</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className="body-client-data">
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{address}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{district}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{address2}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{FormatCEP(zip_code || '')}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{city}</h3>
                        </TableCell>
                        <TableCell className="content-client-data-cell">
                            <h3 className="detail-tables-data client-data-body">{state}</h3>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ClientData;
