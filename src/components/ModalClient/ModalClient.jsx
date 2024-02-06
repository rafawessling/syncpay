import { useState } from 'react';
import { useClientsContext } from '../../context/clientsContext.jsx';
import { useModalWindowContext } from '../../context/ModalWindowContext.jsx';
import { useDataContext } from '../../context/DataContext.jsx';
import {
    FormatInputFormsEmail,
    FormatInputFormsNumber,
    FormatInputFormsText,
    FormatPhoneInput,
} from '../../utils/FormatInputForms.jsx';
import { getItem } from '../../utils/storage.jsx';
import { StyledModal } from '../../utils/StyledModal.jsx';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import api from '../../services/api.js';
import InputMask from 'react-input-mask';
import ClientsIcon from '../../assets/clients-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import RegisterClientValidation from '../../formsValidation/RegisterClientValidation.jsx';
import '../../styles/ModalForms.css';

const defaultClient = {
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    cep: '',
    district: '',
    address: '',
    address2: '',
    city: '',
    state: '',
};

function ModalClient() {
    const { clientData, updateClient, setUpdateClient, registerClient, setRegisterClient } = useClientsContext();
    const { setShowSuccessClient } = useModalWindowContext();
    const { setReloadTable } = useDataContext();

    const [form, setForm] = useState({
        ...(updateClient
            ? {
                  name: clientData.name,
                  email: clientData.email,
                  cpf: clientData.cpf,
                  phoneNumber: clientData.phone_number,
                  cep: clientData.zip_code,
                  district: clientData.district,
                  address: clientData.address,
                  address2: clientData.address2,
                  city: clientData.city,
                  state: clientData.state,
              }
            : defaultClient),
    });

    const { name, email, cpf, phoneNumber, cep, district, address, address2, city, state } = form;

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        cpf: '',
        phoneNumber: '',
        cep: '',
    });

    const handleCepChange = async () => {
        if (cep) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { bairro, logradouro, localidade, uf, complemento } = response.data;

                setForm(prevForm => ({
                    ...prevForm,
                    district: bairro || '',
                    address: logradouro || '',
                    city: localidade || '',
                    state: uf || '',
                    address2: complemento || '',
                }));
            } catch (error) {
                console.error('Error fetching address information from ViaCEP', error);
            }
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const token = getItem('token');

        setErrors({
            name: '',
            email: '',
            cpf: '',
            phoneNumber: '',
            cep: '',
        });

        try {
            const validation = await RegisterClientValidation(
                FormatInputFormsText(name),
                FormatInputFormsEmail(email),
                FormatInputFormsNumber(phoneNumber),
                FormatInputFormsNumber(cpf),
                FormatInputFormsNumber(cep)
            );

            if (Object.keys(validation).length > 0) {
                setErrors(prevErrors => ({ ...prevErrors, ...validation }));
                return;
            } else {
                setErrors({
                    name: '',
                    email: '',
                    cpf: '',
                    phoneNumber: '',
                    cep: '',
                });
            }

            const cloneForm = {
                name,
                email: FormatInputFormsEmail(email),
                cpf: FormatInputFormsNumber(cpf),
                phone_number: FormatInputFormsNumber(phoneNumber),
                ...(cep && { zip_code: FormatInputFormsNumber(cep) }),
                ...(district && { district: FormatInputFormsText(district) }),
                ...(address && { address: FormatInputFormsText(address) }),
                ...(address2 && { address2: FormatInputFormsText(address2) }),
                ...(city && { city: FormatInputFormsText(city) }),
                ...(state && { state: FormatInputFormsText(state) }),
            };

            if (updateClient) {
                await api.put(`/client/${clientData.id}`, cloneForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await api.post('/registerClient', cloneForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            !updateClient && setReloadTable(true);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message.cpf && error.response.data.message.email) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        cpf: 'CPF already registered',
                        email: 'Email already registered',
                    }));
                    return;
                } else if (error.response.data.message.cpf) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        cpf: 'CPF already registered',
                    }));
                    return;
                } else if (error.response.data.message.email) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: 'Email already registered',
                    }));
                    return;
                }
            } else {
                console.error(error);
            }
        }

        handleCloseModal();

        setTimeout(() => {
            setShowSuccessClient(true);
        }, 1000);
    };

    const handleChangeInputValue = event => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleCloseModal = () => {
        if (updateClient) {
            setUpdateClient(false);
        } else {
            setRegisterClient(false);
            setForm({ ...defaultClient });
            setErrors({
                name: '',
                email: '',
                cpf: '',
                phoneNumber: '',
                cep: '',
            });
        }
    };

    return (
        <StyledModal open={registerClient || updateClient}>
            <Box className="container-modal-register client">
                <img className="close-icon-modal" src={CloseIcon} alt="Black X" onClick={() => handleCloseModal()} />

                <section className="title-modal-register client">
                    <img src={ClientsIcon} alt="Clients icon" />
                    <h2>{updateClient ? 'Edit Client' : 'Register Client'}</h2>
                </section>

                <form className="form-register" onSubmit={handleSubmit}>
                    <section className={`form-group-register ${errors.name && 'error-input'}`}>
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter the name"
                            value={name}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    {errors.name && <p className="error">{errors.name}</p>}

                    <section className={`form-group-register ${errors.email && 'error-input'}`}>
                        <label htmlFor="email">Email *</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter the email"
                            value={email}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <section className="form-group-register container-small-input-register">
                        <div className={`form-group-register small-input-register ${errors.cpf && 'error-input'}`}>
                            <label htmlFor="cpf">CPF *</label>
                            <InputMask
                                mask="999.999.999-99"
                                maskChar=" "
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Enter the CPF"
                                value={cpf}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                        <div
                            className={`form-group-register small-input-register ${
                                errors.phoneNumber && 'error-input'
                            }`}
                        >
                            <label htmlFor="phoneNumber">Phone Number *</label>
                            <InputMask
                                mask={FormatPhoneInput(phoneNumber)}
                                maskChar=" "
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter the phone number"
                                value={phoneNumber}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                    </section>
                    {(errors.cpf || errors.phoneNumber) && (
                        <section className="section-error-small-input">
                            <p className="error error-small-input">{errors.cpf}</p>
                            <p className="error error-small-input">{errors.phoneNumber}</p>
                        </section>
                    )}

                    <section className="form-group-register container-small-input-register">
                        <div className={`form-group-register small-input-register ${errors.cep && 'error-input'}`}>
                            <label htmlFor="cep">CEP</label>
                            <InputMask
                                mask="99999-999"
                                maskChar=" "
                                type="text"
                                id="cep"
                                name="cep"
                                placeholder="Enter the CEP"
                                value={cep}
                                onChange={handleChangeInputValue}
                                onBlur={handleCepChange}
                            />
                        </div>
                        <div className="form-group-register small-input-register">
                            <label htmlFor="district">District</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder="Enter the district"
                                value={district}
                                onChange={handleChangeInputValue}
                            ></input>
                        </div>
                    </section>
                    {errors.cep && (
                        <section className="section-error-cep">
                            <p className="error">{errors.cep}</p>
                        </section>
                    )}

                    <section className="form-group-register">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter the address"
                            value={address}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    <section className="form-group-register">
                        <label htmlFor="address2">Address 2</label>
                        <input
                            type="text"
                            id="address2"
                            name="address2"
                            placeholder="Enter the address 2"
                            value={address2}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    <section className="form-group-register container-small-input-register">
                        <div className="form-group-register small-input-register input-city">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter the city"
                                value={city}
                                onChange={handleChangeInputValue}
                            ></input>
                        </div>
                        <div className="form-group-register small-input-register input-uf">
                            <label htmlFor="state">UF</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter the state"
                                value={state}
                                onChange={handleChangeInputValue}
                            ></input>
                        </div>
                    </section>
                    <section className="container-btns-register">
                        <Button
                            className="btn-cancel-register"
                            variant="contained"
                            type="button"
                            onClick={() => handleCloseModal()}
                        >
                            Cancel
                        </Button>
                        <Button className="btn-submit-register" variant="contained" type="submit">
                            {updateClient ? 'Update' : 'Apply'}
                        </Button>
                    </section>
                </form>
            </Box>
        </StyledModal>
    );
}

export default ModalClient;
