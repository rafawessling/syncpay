import { useEffect, useState } from 'react';
import { useDataContext } from '../../context/DataContext';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import ContainerCardsHome from '../../components/Cards/ContainerCardsHome/ContainerCardsHome';
import Header from '../../components/Header/Header';
import LoadingData from '../../components/LoadingData/LoadingData';
import ModalUpdateUser from '../../components/ModalUpdateUser/ModalUpdateUser';
import NavBar from '../../components/NavBar/NavBar';
import SuccessUpdateUser from '../../components/SuccessUpdateUser/SuccessUpdateUser';
import ContainerDetailChargesHome from '../../components/Tables/ContainerDetailChargesHome/ContainerDetailChargesHome';
import ContainerDetailClientsHome from '../../components/Tables/ContainerDetailClientsHome/ContainerDetailClientsHome';
import './Home.css';

function Home() {
    const { updateUser } = useDataContext();
    const { showSuccessUpdate } = useModalWindowContext();
    const [chargesData, setChargesData] = useState([
        {
            id: null,
            description: '',
            due_date: '',
            status: null,
            value: null,
        },
    ]);
    const [clientsData, setCliensData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const token = getItem('token');
            const startTime = Date.now();

            const responseCharges = await api.get('/charges', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseClients = await api.get('/listClients', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataCharges = responseCharges.data.charges;
            const dataClients = responseClients.data.clients;
            setChargesData(dataCharges);
            setCliensData(dataClients);

            const endTime = Date.now();
            const durationLoadData = endTime - startTime;
            const remainingTime = Math.max(0, 2500 - durationLoadData);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="main-home">
            <NavBar />
            <article className="container-content-home">
                <Header title="Charges Summary" className="header-home" />
                <ContainerCardsHome chargesData={chargesData} />
                <ContainerDetailChargesHome chargesData={chargesData} />
                <ContainerDetailClientsHome dataClients={clientsData} />
                {updateUser && <ModalUpdateUser />}
                {showSuccessUpdate && <SuccessUpdateUser />}
                {isLoading && <LoadingData isLoading={isLoading} page="home" />}
            </article>
        </main>
    );
}

export default Home;
