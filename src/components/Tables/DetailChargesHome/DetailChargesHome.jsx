import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormatMoney } from '../../../utils/FormatInputForms';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../../../styles/DetailTablesHome.css';

function DetailChargesHome({ charge, chargesData }) {
    const [clientsData, SetClientsData] = useState({
        paidTable: [],
        overdueTable: [],
        upcomingTable: [],
    });

    const [chargeData, setChargeData] = useState({
        paidTable: {
            title: 'Paid Charges',
            count: 0,
        },
        overdueTable: {
            title: 'Overdue Charges',
            count: 0,
        },
        upcomingTable: {
            title: 'Upcoming Charges',
            count: 0,
        },
    });

    const filterPaidClients = () => {
        return chargesData.filter(charge => {
            return charge.status === 1;
        });
    };

    const filterPendingClients = () => {
        const currentDate = Date.now();
        return chargesData.filter(charge => {
            const dueDate = new Date(charge.due_date).getTime();
            return charge.status === 0 && dueDate < currentDate;
        });
    };

    const filterExpectedClients = () => {
        const currentDate = Date.now();
        return chargesData.filter(charge => {
            const dueDate = new Date(charge.due_date).getTime();
            return charge.status === 0 && dueDate > currentDate;
        });
    };

    useEffect(() => {
        const paidClients = filterPaidClients();
        const pendingClients = filterPendingClients();
        const expectedClients = filterExpectedClients();

        const countCharges = {
            paidCount: paidClients.length,
            overdueCount: pendingClients.length,
            upcomingCount: expectedClients.length,
        };
        const clientsDataLocal = {
            paidTable: paidClients.slice(0, 4),
            overdueTable: pendingClients.slice(0, 4),
            upcomingTable: expectedClients.slice(0, 4),
        };
        updateChargeData(countCharges);
        SetClientsData(clientsDataLocal);
    }, [chargesData]);

    const updateChargeData = countCharges => {
        const updateCount = {
            ...chargeData,
            paidTable: { ...chargeData.paidTable, count: countCharges.paidCount.toString().padStart(2, '0') },
            overdueTable: { ...chargeData.overdueTable, count: countCharges.overdueCount.toString().padStart(2, '0') },
            upcomingTable: {
                ...chargeData.upcomingTable,
                count: countCharges.upcomingCount.toString().padStart(2, '0'),
            },
        };
        setChargeData(updateCount);
    };

    return (
        <TableContainer className="container-table charges-table-home">
            <Table className="detail-tables-home">
                <TableHead>
                    <TableRow className="container-detail-tables-title">
                        <TableCell align="center" colSpan={2}>
                            <h2 className="detail-tables-title">{chargeData[charge].title}</h2>
                        </TableCell>
                        <TableCell align="right" colSpan={3}>
                            <h3 className={`count-tables ${charge}`}>{chargeData[charge].count}</h3>
                        </TableCell>
                    </TableRow>
                    <TableRow className="container-detail-tables-header">
                        <TableCell>
                            <h3 className="detail-tables-header">Client</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Charge ID</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Amount</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientsData[charge].length > 0 ? (
                        clientsData[charge].map(({ client_name, id, value }) => (
                            <TableRow className="container-detail-tables-data" key={id}>
                                <TableCell>
                                    <h4 className="detail-tables-data">{client_name}</h4>
                                </TableCell>
                                <TableCell className="cell-detail-tables-charge-id">
                                    <h4 className="detail-tables-data detail-tables-charge-id">{id}</h4>
                                </TableCell>
                                <TableCell>
                                    <h4 className="detail-tables-data">{FormatMoney(value)}</h4>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="container-detail-tables-data">
                            <TableCell colSpan={3} align="center">
                                <h4 className="detail-tables-data">No content</h4>
                            </TableCell>
                        </TableRow>
                    )}

                    {clientsData[charge].length > 0 &&
                        clientsData[charge].length < 4 &&
                        Array.from({ length: 4 - clientsData[charge].length }).map((_, index) => (
                            <TableRow className="container-detail-tables-data" key={`empty-row-${index}`}>
                                <TableCell colSpan={3}>&nbsp;</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Link to={`/charges?status=${charge}`} className="view-all">
                View all
            </Link>
        </TableContainer>
    );
}

export default DetailChargesHome;
