import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { getItem } from '../../../utils/storage';
import { sortChargesByClientName, sortChargesById, sortChargesByStatus } from '../../../utils/ChangeOrderCharges';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../../../services/api';
import SortIcon from '../../../assets/sort-icon.svg';
import LineChargesTable from '../LineChargesTable/LineChargesTable';
import FilterNotFound from '../../FilterNotFound/FilterNotFound';
import '../../../styles/DetailTablesHome.css';
import '../../../styles/ChargesTables.css';

function ChargesTable({ status, setIsLoading, searchData }) {
    const { reloadTable, setReloadTable } = useDataContext();
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const listCharges = async () => {
        try {
            let statusValue = '';
            if (status) {
                if (status === 'paidTable') {
                    statusValue = 'Paid';
                } else if (status === 'overdueTable') {
                    statusValue = 'Defeated';
                } else {
                    statusValue = 'Expected';
                }
            }
            const token = getItem('token');
            const startTime = Date.now();

            const response = await api.get(
                `/charges/${searchData ? `?search=${searchData}` : '?search='}${
                    status ? `&status=${statusValue}` : ''
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(response.data.charges);
            const endTime = Date.now();
            const durationLoadData = endTime - startTime;
            const remainingTime = Math.max(0, 2500 - durationLoadData);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);

            return;
        } catch (error) {
            console.error(error);
        }
    };

    const changeNameOrder = () => {
        const sortedName = sortChargesByClientName([...data], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setData(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const changeIdOrder = () => {
        const sortedName = sortChargesById([...data], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setData(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const changeStatusOrder = () => {
        const sortedCharges = sortChargesByStatus([...data], sortOrder);
        setData(sortedCharges);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        listCharges();
        setReloadTable(false);
    }, [searchData, reloadTable]);

    return (
        <TableContainer className="container-table container-charges-table">
            <Table className="detail-charge-table">
                <TableHead>
                    <TableRow className="container-detail-header">
                        <TableCell>
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeNameOrder} />
                                <h3 className="detail-tables-header">Client</h3>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeIdOrder} />
                                <h3 className="detail-tables-header">Charge ID</h3>
                            </div>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Amount</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Overdue Date</h3>
                        </TableCell>
                        <TableCell>
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeStatusOrder} />
                                <h3 className="detail-tables-header">Status</h3>
                            </div>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Description</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header"></h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map(charge => <LineChargesTable key={charge.id} chargeData={charge} />)
                    ) : searchData ? (
                        <FilterNotFound />
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

export default ChargesTable;
