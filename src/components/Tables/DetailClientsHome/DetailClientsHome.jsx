import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CorrectIcon from '../../../assets/correct-clients-icon.svg';
import DefaulterIcon from '../../../assets/defaulter-clients-icon.svg';
import '../../../styles/DetailTablesHome.css';
import './DetailClientsHome.css';

function DetailClientsHome({ client, dataClients }) {
    const [clientsData, setClientsData] = useState({
        defaulter: [],
        correct: [],
    });

    const [data, setData] = useState({
        defaulter: {
            icon: DefaulterIcon,
            title: 'Defaulter Clients',
            count: 0,
        },
        correct: {
            icon: CorrectIcon,
            title: 'Correct Clients',
            count: 0,
        },
    });

    const filterCorrectClients = () => {
        return dataClients.filter(client => {
            return client.status === 1;
        });
    };

    const filterDefaulterClients = () => {
        return dataClients.filter(client => {
            return client.status === 0;
        });
    };

    useEffect(() => {
        const correctClients = filterCorrectClients();
        const defaulterClients = filterDefaulterClients();
        const countClients = {
            paidCount: correctClients.length,
            pendingCount: defaulterClients.length,
        };
        const clientsDataLocal = {
            defaulter: defaulterClients.slice(0, 4),
            correct: correctClients.slice(0, 4),
        };
        updateClientData(countClients);
        setClientsData(clientsDataLocal);
    }, [dataClients]);

    const updateClientData = countClients => {
        const updateCount = {
            ...data,
            correct: { ...data.correct, count: countClients.paidCount.toString().padStart(2, '0') },
            defaulter: { ...data.defaulter, count: countClients.pendingCount.toString().padStart(2, '0') },
        };
        setData(updateCount);
    };

    return (
        <TableContainer className="container-table clients-table-home">
            <Table className="detail-tables-home">
                <TableHead>
                    <TableRow className="container-detail-tables-title">
                        <TableCell align="center" colSpan={2}>
                            <div className="title-clients-table-home">
                                <img src={data[client].icon} alt={data[client].title} />
                                <h2 className="detail-tables-title">{data[client].title}</h2>
                            </div>
                        </TableCell>
                        <TableCell align="right" colSpan={3}>
                            <h3 className={`count-tables count-tables-clients ${client}`}>{data[client].count}</h3>
                        </TableCell>
                    </TableRow>
                    <TableRow className="container-detail-tables-header">
                        <TableCell>
                            <h3 className="detail-tables-header client-name-table">Client</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">Client ID</h3>
                        </TableCell>
                        <TableCell>
                            <h3 className="detail-tables-header">CPF</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientsData[client].length > 0 ? (
                        clientsData[client].map(({ name, id, cpf }) => (
                            <TableRow className="container-detail-tables-data" key={id}>
                                <TableCell>
                                    <h4 className="detail-tables-data client-name-table">{name}</h4>
                                </TableCell>
                                <TableCell>
                                    <h4 className="detail-tables-data client-id-table">{id}</h4>
                                </TableCell>
                                <TableCell>
                                    <h4 className="detail-tables-data">{cpf}</h4>
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

                    {clientsData[client].length > 0 &&
                        clientsData[client].length < 4 &&
                        Array.from({ length: 4 - clientsData[client].length }).map((_, index) => (
                            <TableRow className="container-detail-tables-data" key={`empty-row-${index}`}>
                                <TableCell colSpan={3}>&nbsp;</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Link to={`/clients?status=${client}`} className="view-all">
                View all
            </Link>
        </TableContainer>
    );
}

export default DetailClientsHome;
