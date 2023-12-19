import { Link } from 'react-router-dom';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { useDataContext } from '../../context/DataContext';
import { clear } from '../../utils/storage';
import Arrow from '../../assets/arrow-suspense-menu.svg';
import EditIcon from '../../assets/edit-icon.svg';
import LogoutIcon from '../../assets/logout-icon.svg';
import './SuspenseMenuHeader.css';

function SuspenseMenuHeader() {
    const { setShowSuspenseMenu } = useModalWindowContext();
    const { setUpdateUser } = useDataContext();

    const handleOpenEditUser = () => {
        setUpdateUser(true);
        setShowSuspenseMenu(false);
    };

    const handleLogoutUser = () => {
        clear();
    };

    return (
        <article className="container-suspense-menu-header">
            <img className="arrow-suspense-menu" src={Arrow} alt="Arrow down" />
            <section className="content-suspense-menu">
                <div className="icon-menu-header" onClick={handleOpenEditUser}>
                    <img src={EditIcon} alt="Edit icon" />
                    <h3 className="text-edit">Edit</h3>
                </div>
                <div className="icon-menu-header" onClick={handleLogoutUser}>
                    <Link to="/">
                        <img src={LogoutIcon} alt="Logout icon" />
                        <h3 className="text-logout">Logout</h3>
                    </Link>
                </div>
            </section>
        </article>
    );
}

export default SuspenseMenuHeader;
