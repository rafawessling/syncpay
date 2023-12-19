import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ClientsProvider } from '../context/clientsContext.jsx';
import { ModalWindowProvider } from '../context/ModalWindowContext.jsx';
import { DataProvider } from '../context/DataContext.jsx';
import { getItem } from '../utils/storage.jsx';
import Clients from '../pages/Clients/Clients';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import SignUp from '../pages/SignUp/SignUp.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import Charges from '../pages/Charges/Charges.jsx';
import ClientDetails from '../pages/ClientDetails/ClientDetails.jsx';

function ProtectedRoutes({ redirect }) {
    const logged = getItem('token');
    return logged ? <Outlet /> : <Navigate to={redirect} />;
}
function NotProtectedRoutes({ redirect }) {
    const logged = getItem('token');
    return logged ? <Navigate to={redirect} /> : <Outlet />;
}

export default function MainRoutes() {
    return (
        <ClientsProvider>
            <ModalWindowProvider>
                <DataProvider>
                    <Routes>
                        <Route element={<NotProtectedRoutes redirect={'/home'} />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Route>
                        <Route element={<ProtectedRoutes redirect={'/'} />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/charges" element={<Charges />} />
                            <Route path="/client-details/:id" element={<ClientDetails />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </DataProvider>
            </ModalWindowProvider>
        </ClientsProvider>
    );
}
