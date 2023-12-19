import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [chargeData, setChargeData] = useState({});
    const [updateCharge, setUpdateCharge] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);

    const contextValue = {
        chargeData,
        setChargeData,
        updateCharge,
        setUpdateCharge,
        reloadTable,
        setReloadTable,
        updateUser,
        setUpdateUser,
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext deve ser usado dentro de um ClientesProvider');
    }
    return context;
};

export { DataProvider, useDataContext };
