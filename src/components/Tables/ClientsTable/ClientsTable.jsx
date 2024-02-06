import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { getItem } from '../../../utils/storage';
import { sortClientsByName, sortClientsByStatus } from '../../../utils/ChangeOrderClients';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../../../services/api';
import SortIcon from '../../../assets/sort-icon.svg';
import LineClientsTable from '../LineClientsTable/LineClientsTable';
import FilterNotFound from '../../FilterNotFound/FilterNotFound';
import '../../../styles/DetailTablesHome.css';
import './ClientsTable.css';

function ClientsTable({ status, setIsLoading, searchData }) {
    const { reloadTable, setReloadTable } = useDataContext();
    const [dataClients, setDataClients] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const listClients = async () => {
        const token = getItem('token');
        const startTime = Date.now();

        let statusValue = '';
        if (status) {
            statusValue = status === 'correct' ? 'Paid' : 'Pending';
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.get(
                `/listClients/${searchData ? `?search=${searchData}` : '?search='}${
                    status ? `&status=${statusValue}` : ''
                }`,
                config
            );

            setDataClients(response.data.clients);

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

    useEffect(() => {
        const fetchData = async () => {
            listClients();
            setReloadTable(false);
        };

        fetchData();
    }, [reloadTable, setReloadTable, searchData]);

    const changeNameOrder = () => {
        const sortedName = sortClientsByName([...dataClients], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setDataClients(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    const changeStatusOrder = () => {
        const sortedName = sortClientsByStatus([...dataClients], sortOrder);
        const orderedClients = sortOrder === 'asc' ? sortedName : sortedName.reverse();
        setDataClients(orderedClients);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <TableContainer className="container-table container-clients-table">
            <Table className="detail-tables-home">
                <TableHead>
                    <TableRow className="container-detail-clients-header">
                        <TableCell>
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="Two arrows down and up" onClick={changeNameOrder} />
                                <h3 className="detail-tables-header">Client</h3>
                            </div>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">CPF</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Email</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Phone Number</h3>
                        </TableCell>
                        <TableCell>
                            <div className="cell-with-icon">
                                <img src={SortIcon} alt="" onClick={changeStatusOrder} />
                                <h3 className="detail-tables-header">Status</h3>
                            </div>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Create Charge</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataClients.length > 0 ? (
                        dataClients.map(client => <LineClientsTable key={client.id} clientData={client} />)
                    ) : searchData ? (
                        <FilterNotFound />
                    ) : (
                        <TableRow className="container-detail-clients-data">
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

export default ClientsTable;
