import { createContext, useContext, useState } from 'react';

const ModalWindowContext = createContext();

const ModalWindowProvider = ({ children }) => {
    const [showError, setShowError] = useState(false);
    const [showCharge, setShowCharge] = useState(false);
    const [alertDelete, setAlertDelete] = useState(false);
    const [showSuccessClient, setShowSuccessClient] = useState(false);
    const [showSuccessCharge, setShowSuccessCharge] = useState(false);
    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
    const [showSuccessUpdateCharge, setShowSuccessUpdateCharge] = useState(false);
    const [showSuccessDeleteCharge, setShowSuccessDeleteCharge] = useState(false);
    const [showSuspenseMenu, setShowSuspenseMenu] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [registerCharge, setRegisterCharge] = useState(false);

    setTimeout(() => {
        setShowSuccessClient(false);
        setShowSuccessCharge(false);
        setShowSuccessUpdateCharge(false);
        setShowSuccessDeleteCharge(false);
    }, 2800);

    const contextValue = {
        showError,
        showCharge,
        showSuccess,
        alertDelete,
        setShowError,
        setShowCharge,
        setAlertDelete,
        setShowSuccess,
        showSuspenseMenu,
        showSuccessClient,
        showSuccessCharge,
        showSuccessUpdate,
        setShowSuspenseMenu,
        setShowSuccessClient,
        setShowSuccessCharge,
        setShowSuccessUpdate,
        showSuccessUpdateCharge,
        showSuccessDeleteCharge,
        setShowSuccessUpdateCharge,
        setShowSuccessDeleteCharge,
        registerCharge,
        setRegisterCharge,
    };

    return <ModalWindowContext.Provider value={contextValue}>{children}</ModalWindowContext.Provider>;
};

const useModalWindowContext = () => {
    const context = useContext(ModalWindowContext);
    if (!context) {
        throw new Error('useClientsContext deve ser usado dentro de um ClientesProvider');
    }
    return context;
};

export { ModalWindowProvider, useModalWindowContext };
