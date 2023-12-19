import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { useClientsContext } from '../../../context/clientsContext';
import { useModalWindowContext } from '../../../context/ModalWindowContext';
import { getItem } from '../../../utils/storage';
import { Button } from '@mui/base';
import { sortChargesById, sortChargesByDate, sortChargesByStatus } from '../../../utils/ChangeOrderCharges';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../../../services/api';
import SortIcon from '../../../assets/sort-icon.svg';
import LineChargesDetailClient from '../LineChargesDetailClient/LineChargesDetailClient';
import '../../../styles/ChargesTables.css';
import '../../../styles/DetailTablesHome.css';
import './ChargesDetailClient.css';

function ChargesDetailClient({ setIsLoading }) {
    const { clientData } = useClientsContext();
    const { reloadTable, setReloadTable } = useDataContext();
    const { setRegisterCharge } = useModalWindowContext();
    const [data, setData] = useState([]);
    const { id } = clientData;
    const [sortOrder, setSortOrder] = useState('asc');

    const getChargeClient = async () => {
        try {
            const token = getItem('token');
            const startTime = Date.now();

            if (id) {
                const response = await api.get(`clients/${id}/charges`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.charges);

                const endTime = Date.now();
                const durationLoadData = endTime - startTime;
                const remainingTime = Math.max(0, 2500 - durationLoadData);

                setTimeout(() => {
                    setIsLoading(false);
                }, remainingTime);
            }
            return;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getChargeClient();
            setReloadTable(false);
        };
        fetchData();
    }, [clientData, reloadTable]);

    const changeIdOrder = () => {
        const sortedName = sortChargesById([...data], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setData(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const changeDateOrder = () => {
        const sortedName = sortChargesByDate([...data], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setData(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const changeStatusOrder = () => {
        const sortedCharges = sortChargesByStatus([...data], sortOrder);
        setData(sortedCharges);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <TableContainer className="container-table container-charges-detail-client">
            <section className="container-charges-client-title">
                <h2 className="charges-client-title">Client Charges</h2>
                <Button className="btn-add-charge" variant="contained" onClick={() => setRegisterCharge(true)}>
                    + New Charge
                </Button>
            </section>
            <Table className="detail-charges-client-table">
                <TableHead>
                    <TableRow className="container-detail-header header-client-details">
                        <TableCell className="content-charges-client-header">
                            <div className="cell-with-icon ">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeIdOrder} />
                                <h3 className="detail-tables-header">Charge ID</h3>
                            </div>
                        </TableCell>
                        <TableCell className="content-charges-client-header">
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeDateOrder} />
                                <h3 className="detail-tables-header">Overdue Date</h3>
                            </div>
                        </TableCell>
                        <TableCell className="content-charges-client-header">
                            <h3 className="detail-tables-header">Amount</h3>
                        </TableCell>
                        <TableCell className="content-charges-client-header">
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeStatusOrder} />
                                <h3 className="detail-tables-header">Status</h3>
                            </div>
                        </TableCell>
                        <TableCell className="content-charges-client-header">
                            <h3 className="detail-tables-header">Description</h3>
                        </TableCell>
                        <TableCell className="content-charges-client-header">
                            <h3 className="detail-tables-header"></h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-body-charge-client">
                    {data.length > 0 ? (
                        data.map(charge => <LineChargesDetailClient key={charge.id} chargeData={charge} />)
                    ) : (
                        <TableRow className="container-detail-charges-data">
                            <TableCell colSpan={7}>
                                <h4 className="detail-tables-data empty-text">No content</h4>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ChargesDetailClient;
