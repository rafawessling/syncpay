import { useState } from 'react';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { useDataContext } from '../../context/DataContext';
import { useClientsContext } from '../../context/clientsContext';
import { Link, useLocation } from 'react-router-dom';
import ClientsIcon from '../../assets/clients-icon.svg';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import LoadingData from '../../components/LoadingData/LoadingData';
import ModalClient from '../../components/ModalClient/ModalClient';
import ModalCharge from '../../components/ModalCharge/ModalCharge';
import ModalUpdateUser from '../../components/ModalUpdateUser/ModalUpdateUser';
import NavBar from '../../components/NavBar/NavBar';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import SuccessUpdateUser from '../../components/SuccessUpdateUser/SuccessUpdateUser';
import ClientsTable from '../../components/Tables/ClientsTable/ClientsTable';
import './Clients.css';

function Clients() {
    const { showSuccessUpdate, registerCharge, showSuccessClient, showSuccessCharge } = useModalWindowContext();
    const { updateUser } = useDataContext();
    const { registerClient } = useClientsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    return (
        <main className="main-clients">
            <NavBar />
            <article className="container-content-clients">
                <Header
                    title={
                        <Link to={'/clients'}>
                            <span className="clients">Clients</span>
                        </Link>
                    }
                />
                <HeaderDashboard title="Clients" icon={ClientsIcon} setSearchData={setSearchData} />
                <ClientsTable status={status} setIsLoading={setIsLoading} searchData={searchData} />
                {registerClient && <ModalClient />}
                {registerCharge && <ModalCharge />}
                {updateUser && <ModalUpdateUser />}
                {showSuccessUpdate && <SuccessUpdateUser />}
                {showSuccessClient && <SuccessMessage message="Client registered successfully!" />}
                {showSuccessCharge && <SuccessMessage message="Charge registered successfully!" />}
                {isLoading && <LoadingData isLoading={isLoading} page="clients" />}
            </article>
        </main>
    );
}

export default Clients;
