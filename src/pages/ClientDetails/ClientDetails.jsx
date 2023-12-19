import { useEffect, useState } from 'react';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { useDataContext } from '../../context/DataContext';
import { useClientsContext } from '../../context/clientsContext';
import { Link, useParams } from 'react-router-dom';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import ClientsIcon from '../../assets/clients-icon.svg';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import ModalClient from '../../components/ModalClient/ModalClient';
import ModalCharge from '../../components/ModalCharge/ModalCharge';
import ModalUpdateUser from '../../components/ModalUpdateUser/ModalUpdateUser';
import NavBar from '../../components/NavBar/NavBar';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import ChargesDetailClient from '../../components/Tables/ChargesDetailClient/ChargesDetailClient';
import ClientData from '../../components/Tables/ClientData/ClientData';
import LoadingData from '../../components/LoadingData/LoadingData';
import SuccessUpdateUser from '../../components/SuccessUpdateUser/SuccessUpdateUser';
import ModalAlertDeleteCharge from '../../components/ModalAlertDeleteCharge/ModalAlertDeleteCharge';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ModalChargeDetail from '../../components/ModalChargeDetail/ModalChargeDetail';
import './ClientDetails.css';

function ClientDetails() {
    const {
        showSuccessClient,
        showSuccessUpdate,
        showSuccessCharge,
        showSuccessUpdateCharge,
        showSuccessDeleteCharge,
        alertDelete,
        showError,
        showCharge,
        registerCharge,
    } = useModalWindowContext();
    const { updateUser, updateCharge } = useDataContext();
    const { clientData, setClientData, updateClient, setUpdateClient } = useClientsContext();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await clientDetail();
        };
        fetchData();
    }, []);

    const clientDetail = async () => {
        try {
            const token = getItem('token');
            const startTime = Date.now();

            const clients = await api.get(`clients/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClientData(clients.data.client[0]);

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

    return (
        <main className="main-client-details">
            <NavBar />
            <article className="container-content-client-details">
                <Header
                    title={
                        <section className="title-client-details">
                            <Link to={'/clients'}>
                                <span>Clients</span>
                            </Link>
                            <div className="highlight-title-header">
                                <p>{'>'}</p>
                                <p>Client Details</p>
                            </div>
                        </section>
                    }
                />
                <HeaderDashboard title={clientData.name} icon={ClientsIcon} />
                <ClientData setUpdateClient={setUpdateClient} clientData={clientData} />
                <ChargesDetailClient setIsLoading={setIsLoading} />
                {updateUser && <ModalUpdateUser />}
                {showSuccessUpdate && <SuccessUpdateUser />}
                {registerCharge && <ModalCharge />}
                {updateClient && <ModalClient />}
                {showSuccessClient && <SuccessMessage message="Client updated successfully!" />}
                {showSuccessCharge && <SuccessMessage message="Charge registered successfully!" />}
                {updateCharge && <ModalCharge />}
                {showSuccessUpdateCharge && <SuccessMessage message="Charge updated successfully!" />}
                {alertDelete && <ModalAlertDeleteCharge />}
                {showSuccessDeleteCharge && <SuccessMessage message="Charge deleted successfully!" />}
                {showError && <ErrorMessage message="This charge cannot be deleted!" />}
                {showCharge && <ModalChargeDetail />}
                {isLoading && <LoadingData isLoading={isLoading} page="clients" />}
            </article>
        </main>
    );
}

export default ClientDetails;
