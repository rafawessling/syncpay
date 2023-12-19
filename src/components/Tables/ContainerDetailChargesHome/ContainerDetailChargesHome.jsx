import DetailChargesHome from '../DetailChargesHome/DetailChargesHome';
import './ContainerDetailChargesHome.css';

function ContainerDetailChargesHome({chargesData}) {
    return (
        <section className="conteiner-tables-charges-home">
            <DetailChargesHome charge="paidTable" chargesData = {chargesData} />
            <DetailChargesHome charge="overdueTable" chargesData = {chargesData}/>
            <DetailChargesHome charge="upcomingTable" chargesData = {chargesData} />
        </section>
    );
}

export default ContainerDetailChargesHome;
