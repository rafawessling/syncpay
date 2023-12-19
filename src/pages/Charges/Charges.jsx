import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useModalWindowContext } from '../../context/ModalWindowContext';
import { useDataContext } from '../../context/DataContext';
import ChargesIcon from '../../assets/charges-icon.svg';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import LoadingData from '../../components/LoadingData/LoadingData';
import ModalUpdateUser from '../../components/ModalUpdateUser/ModalUpdateUser';
import NavBar from '../../components/NavBar/NavBar';
import SuccessUpdateUser from '../../components/SuccessUpdateUser/SuccessUpdateUser';
import ChargesTable from '../../components/Tables/ChargesTable/ChargesTable';
import ModalAlertDeleteCharge from '../../components/ModalAlertDeleteCharge/ModalAlertDeleteCharge';
import ModalCharge from '../../components/ModalCharge/ModalCharge';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ModalChargeDetail from '../../components/ModalChargeDetail/ModalChargeDetail';
import './Charges.css';

function Charges() {
    const { showSuccessUpdate, showSuccessUpdateCharge, showSuccessDeleteCharge, showError, showCharge, alertDelete } =
        useModalWindowContext();
    const { updateUser, updateCharge } = useDataContext();
    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    return (
        <main className="main-charges">
            <NavBar />
            <article className="container-content-charges">
                <Header title="Charges" />
                <HeaderDashboard title="Charges" icon={ChargesIcon} setSearchData={setSearchData} />
                <ChargesTable status={status} setIsLoading={setIsLoading} searchData={searchData} />
                {updateUser && <ModalUpdateUser />}
                {showSuccessUpdate && <SuccessUpdateUser />}
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

export default Charges;
