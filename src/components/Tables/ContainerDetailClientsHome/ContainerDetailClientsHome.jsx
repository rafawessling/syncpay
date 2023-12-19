import DetailClientsHome from '../DetailClientsHome/DetailClientsHome';
import './ContainerDetailClientsHome.css';

function ContainerDetailClientsHome({dataClients}) {
    return (
        <section className="conteiner-tables-clients-home">
            <DetailClientsHome client="defaulter" dataClients = {dataClients}/>
            <DetailClientsHome client="correct" dataClients = {dataClients} />
        </section>
    );
}

export default ContainerDetailClientsHome;
