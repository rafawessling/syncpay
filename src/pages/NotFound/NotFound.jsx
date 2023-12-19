import { Link } from 'react-router-dom';
import NotFoundIcon from '../../assets/not-found.svg';
import './NotFound.css';

function NotFound() {
    return (
        <main className="container-not-found">
            <img src={NotFoundIcon} alt="" />
            <h2 className="title-not-found">Do not know where you are?</h2>
            <h4 className="text-not-found">We really have no idea either!</h4>

            <Link to="/home">
                <button className="btn-not-found">Go Home</button>
            </Link>
        </main>
    );
}

export default NotFound;
