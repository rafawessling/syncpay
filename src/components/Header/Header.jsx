import { useEffect, useState } from 'react';
import { useClientsContext } from '../../context/clientsContext';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { getItem } from '../../utils/storage';
import ExpandIcon from '../../assets/expand-icon.svg';
import TitleHeader from '../TitleHeader/TitleHeader';
import SuspenseMenuHeader from '../SuspenseMenuHeader/SuspenseMenuHeader';
import './Header.css';

function Header({ title }) {
    const { userName, setUserName } = useClientsContext();
    const { showSuspenseMenu, setShowSuspenseMenu } = useModalWindowContext();

    const [initials, setInitials] = useState('');

    useEffect(() => {
        const getName = getItem('userName');

        if (getName) {
            const name = getName.split(' ');

            setUserName(name[0]);

            const firstInitial = name[0][0].toUpperCase();

            const lastInitial = name.length > 1 && name[name.length - 1][0].toUpperCase();

            if (lastInitial && firstInitial) {
                setInitials(`${firstInitial}${lastInitial}`);
            } else if (firstInitial) {
                setInitials(firstInitial);
            }
        }
    }, [userName]);

    return (
        <header className="container-header">
            <article className="content-header">
                <TitleHeader title={title} />
                <section className="profile-icons">
                    <div className="initial-letters">{initials}</div>
                    <span>{userName || ''}</span>
                    <img
                        src={ExpandIcon}
                        alt="Small arrow directed downwards"
                        onClick={() => setShowSuspenseMenu(!showSuspenseMenu)}
                    />
                </section>
                {showSuspenseMenu && <SuspenseMenuHeader />}
            </article>
        </header>
    );
}

export default Header;
