import { createContext, useContext, useState } from 'react';

const ClientsContext = createContext();

const ClientsProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [clientData, setClientData] = useState({});
    const [clientCharge, setClientCharge] = useState({});
    const [updateClient, setUpdateClient] = useState(false);
    const [registerClient, setRegisterClient] = useState(false);

    const contextValue = {
        userName,
        setUserName,
        clientData,
        setClientData,
        clientCharge,
        setClientCharge,
        updateClient,
        setUpdateClient,
        registerClient,
        setRegisterClient,
    };

    return <ClientsContext.Provider value={contextValue}>{children}</ClientsContext.Provider>;
};

const useClientsContext = () => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error('useClientsContext deve ser usado dentro de um ClientesProvider');
    }
    return context;
};

export { ClientsProvider, useClientsContext };
