import ChargesHome from '../ChargesHome/ChargesHome';
import './ContainerCardsHome.css';

function ContainerCardsHome({chargesData}) {
    return (
        <section className="conteiner-cards-home">
            <ChargesHome charge="paid" chargesData = {chargesData}/>
            <ChargesHome charge="overdue" chargesData = {chargesData} />
            <ChargesHome charge="upcoming" chargesData = {chargesData} />
        </section>
    );
}

export default ContainerCardsHome;
