import { NavLink } from 'react-router-dom';
import ChargesIcon from '../../assets/charges-navbar.svg';
import ChargesIconActive from '../../assets/charges-navbar-active.svg';
import ClientsIconActive from '../../assets/clients-navbar-active.svg';
import ClientsIcon from '../../assets/clients-navbar.svg';
import HomeIconActive from '../../assets/home-navbar-active.svg';
import HomeIcon from '../../assets/home-navbar.svg';
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <section className="content-navbar">
                <NavLink to="/home">
                    {({ isActive }) => (
                        <div className={`icon-navbar ${isActive ? 'active' : ''}`}>
                            <img src={isActive ? HomeIconActive : HomeIcon} alt="Home icon" />
                            <span>Home</span>
                        </div>
                    )}
                </NavLink>
                <NavLink to="/clients">
                    {({ isActive }) => (
                        <div
                            className={`icon-navbar ${isActive ? 'active' : ''} ${
                                location.pathname.startsWith('/client-details') ? 'active-details' : ''
                            }`}
                        >
                            <img
                                src={location.pathname.startsWith('/client') ? ClientsIconActive : ClientsIcon}
                                alt="Clients icon"
                            />
                            <span>Clients</span>
                        </div>
                    )}
                </NavLink>
                <NavLink to="/charges">
                    {({ isActive }) => (
                        <div className={`icon-navbar ${isActive ? 'active' : ''}`}>
                            <img src={isActive ? ChargesIconActive : ChargesIcon} alt="Charges icon" />
                            <span>Charges</span>
                        </div>
                    )}
                </NavLink>
            </section>
        </nav>
    );
}

export default NavBar;
