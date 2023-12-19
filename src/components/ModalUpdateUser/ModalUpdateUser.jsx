import { useEffect, useState } from 'react';
import { useClientsContext } from '../../context/clientsContext.jsx';
import { useModalWindowContext } from '../../context/ModalWindowContext.jsx';
import { useDataContext } from '../../context/DataContext.jsx';
import { getItem, setItem } from '../../utils/storage.jsx';
import { Box, Button } from '@mui/material';
import { StyledModal } from '../../utils/StyledModal.jsx';
import api from '../../services/api.js';
import CloseIcon from '../../assets/close-icon.svg';
import HidePassword from '../../assets/hide-password.svg';
import ShowPassword from '../../assets/show-password.svg';
import UpdateUserValidation from '../../formsValidation/UpdateUserValidation.jsx';
import '../../styles/Error.css';
import '../../styles/ModalForms.css';
import ReactInputMask from 'react-input-mask';

function ModalUpdateUser() {
    const { setUserName } = useClientsContext();
    const { updateUser, setUpdateUser } = useDataContext();
    const { setShowSuccessUpdate } = useModalWindowContext();
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        password: '',
        passwordConfirmation: '',
    });

    const { id, name, email, cpf, phoneNumber, password, passwordConfirmation } = currentUser;
    const [errorsMessage, setErrorsMessage] = useState({});
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        loadUser(token);
    }, []);

    const loadUser = async tokenLocal => {
        try {
            const loggedInUser = await api.get('/user', {
                headers: {
                    Authorization: `Bearer ${tokenLocal}`,
                },
            });

            const currentUserLocal = {
                id: loggedInUser.data.id,
                email: loggedInUser.data.email,
                name: loggedInUser.data.name,
                cpf: loggedInUser.data.cpf || '',
                phoneNumber: loggedInUser.data.phone_number || '',
                password: '',
                passwordConfirmation: '',
            };

            setLoggedInUserEmail(loggedInUser.data.email);
            setCurrentUser(currentUserLocal);
        } catch (error) {
            return console.error('Server error', error.message);
        }
    };

    const handleChangeInputValue = event => {
        const { name, value } = event.target;

        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const validation = await UpdateUserValidation(currentUser, loggedInUserEmail);

        setErrorsMessage(validation);

        if (Object.keys(validation).length) {
            return;
        }
        if (!(await saveUserChanges())) return;
        setUpdateUser(false);

        setTimeout(() => {
            setShowSuccessUpdate(true);
        }, 800);

        setItem('userName', name);
        setUserName(getItem('userName'));
    };

    const saveUserChanges = async () => {
        const data = {
            name,
            email,
        };
        if (password) {
            data['password'] = password;
        }
        if (phoneNumber) {
            data['phone_number'] = phoneNumber.replace(/[^\d]/g, '');
        }
        if (cpf) {
            data['cpf'] = cpf.replace(/[^\d]/g, '');
        }

        try {
            await api.put(`/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return true;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message.cpf && error.response.data.message.email) {
                    setErrorsMessage(prevErrors => ({
                        ...prevErrors,
                        cpf: 'CPF already registered',
                        email: 'Email already registered',
                    }));
                    return false;
                } else if (error.response.data.message.cpf) {
                    setErrorsMessage(prevErrors => ({
                        ...prevErrors,
                        cpf: 'CPF already registered',
                    }));
                    return false;
                } else if (error.response.data.message.email) {
                    setErrorsMessage(prevErrors => ({
                        ...prevErrors,
                        email: 'Email already registered',
                    }));
                    return false;
                }
            } else {
                console.error(error);
                return false;
            }
        }
    };

    return (
        <StyledModal open={updateUser}>
            <Box className="container-modal-update-user">
                <img className="close-icon-modal" src={CloseIcon} alt="Black X" onClick={() => setUpdateUser(false)} />
                <h2 className="title-modal-update-user">Edit your registration</h2>

                <form className="form-update-user" onSubmit={handleSubmit}>
                    <section className={`form-group-update-user ${errorsMessage.name && 'error-input'}`}>
                        <label htmlFor="name">Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter the name"
                            value={name}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    {errorsMessage.name && <p className="error">{errorsMessage.name}</p>}

                    <section className={`form-group-update-user ${errorsMessage.email && 'error-input'}`}>
                        <label htmlFor="email">Email*</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter the email"
                            value={email}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    {errorsMessage.email && <p className="error">{errorsMessage.email}</p>}

                    <section className="form-group-update-user container-small-input-update-user">
                        <div
                            className={`form-group-update-user small-input-update-user ${
                                errorsMessage.cpf && 'error-input'
                            }`}
                        >
                            <label htmlFor="cpf">CPF</label>
                            <ReactInputMask
                                mask="999.999.999-99"
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Enter the CPF"
                                value={cpf}
                                onChange={handleChangeInputValue}
                            ></ReactInputMask>
                        </div>
                        <div
                            className={`form-group-update-user small-input-update-user ${
                                errorsMessage.phoneNumber && 'error-input'
                            }`}
                        >
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <ReactInputMask
                                mask="(99) 99999-9999"
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter the phone number"
                                value={phoneNumber}
                                onChange={handleChangeInputValue}
                            ></ReactInputMask>
                        </div>
                    </section>
                    {(errorsMessage.cpf || errorsMessage.phoneNumber) && (
                        <section className="section-error-small-input">
                            <p className="error error-small-input">{errorsMessage.cpf}</p>
                            <p className="error error-small-input">{errorsMessage.phoneNumber}</p>
                        </section>
                    )}

                    <section className={`form-group-update-user ${errorsMessage.password && 'error-input'}`}>
                        <label htmlFor="password">Password</label>
                        <div className="input-password">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter the password"
                                value={password}
                                onChange={handleChangeInputValue}
                                autoComplete="on"
                            />
                            <img
                                src={showPassword ? ShowPassword : HidePassword}
                                alt="Black eye to show or hide password"
                                onClick={() => setShowPassword(!showPassword)}
                                className={showPassword ? '' : 'hide-password'}
                            />
                        </div>
                    </section>
                    {errorsMessage.password && <p className="error">{errorsMessage.password}</p>}

                    <section
                        className={`form-group-update-user ${errorsMessage.passwordConfirmation && 'error-input'}`}
                    >
                        <label htmlFor="passwordConfirmation">Password Confirmation</label>
                        <div className="input-password">
                            <input
                                id="passwordConfirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                name="passwordConfirmation"
                                placeholder="Enter the password confirmation"
                                value={passwordConfirmation}
                                onChange={handleChangeInputValue}
                                autoComplete="on"
                            />{' '}
                            <img
                                src={showPasswordConfirmation ? ShowPassword : HidePassword}
                                alt="Black eye to show or hide password"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                className={showPasswordConfirmation ? '' : 'hide-password'}
                            />
                        </div>
                    </section>
                    {errorsMessage.passwordConfirmation && (
                        <p className="error">{errorsMessage.passwordConfirmation}</p>
                    )}

                    <Button className="btn-submit-update-user" variant="contained" type="submit">
                        Apply
                    </Button>
                </form>
            </Box>
        </StyledModal>
    );
}

export default ModalUpdateUser;
