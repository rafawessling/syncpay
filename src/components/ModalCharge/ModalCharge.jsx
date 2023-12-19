import { useState } from 'react';
import { useDataContext } from '../../context/DataContext.jsx';
import { useModalWindowContext } from '../../context/ModalWindowContext.jsx';
import { useClientsContext } from '../../context/clientsContext.jsx';
import { getItem } from '../../utils/storage.jsx';
import { Box, Button, FormControlLabel, RadioGroup } from '@mui/material';
import { FormatInputFormsNumber, FormatInputFormsText, FormatMoney } from '../../utils/FormatInputForms.jsx';
import { StyledModal } from '../../utils/StyledModal.jsx';
import api from '../../services/api.js';
import ChargesIcon from '../../assets/charges-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import ChargesValidation from '../../formsValidation/ChargesValidation.jsx';
import StyledRadio from '../../utils/StyledRadio.jsx';
import '../../styles/ModalForms.css';
import './ModalCharge.css';

const defaultCharge = {
    name: '',
    description: '',
    due_date: '',
    amount: '',
};

const allStatus = [
    {
        id: 1,
        name: 'Paid Charge',
    },
    {
        id: 2,
        name: 'Pending Charge',
    },
];

function ModalCharge() {
    const { chargeData, updateCharge, setUpdateCharge, setReloadTable } = useDataContext();
    const { setShowSuccessUpdateCharge, registerCharge, setRegisterCharge, setShowSuccessCharge } =
        useModalWindowContext();
    const { clientCharge } = useClientsContext();

    const [status, setStatus] = useState(
        updateCharge ? (chargeData.status === 'Paid' ? allStatus[0] : allStatus[1]) : allStatus[0]
    );

    const [form, setForm] = useState({
        ...(updateCharge
            ? {
                  name: chargeData.name,
                  description: chargeData.description,
                  due_date: chargeData.due_date,
                  amount: chargeData.amount,
              }
            : defaultCharge),
    });

    const { description, due_date, amount } = form;

    const [errors, setErrors] = useState({
        description: '',
        due_date: '',
        amount: '',
    });

    const handleCloseModal = () => {
        if (updateCharge) {
            setUpdateCharge(false);
        } else {
            setRegisterCharge(false);
            setForm({ ...defaultCharge });
            setStatus(allStatus[0]);
            setErrors({
                description: '',
                due_date: '',
                amount: '',
            });
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const token = getItem('token');
            const validation = await ChargesValidation(description, due_date, FormatInputFormsNumber(amount));
            if (Object.keys(validation).length > 0) {
                setErrors(validation);
                return;
            } else {
                setErrors({
                    description: '',
                    due_date: '',
                    amount: '',
                });
            }

            const chargeFormated = {
                description: FormatInputFormsText(description),
                due_date,
                value: parseFloat(FormatInputFormsNumber(amount)),
                status: status.id === 2 ? 0 : 1,
            };

            if (updateCharge) {
                await api.put(`/charges/${chargeData.id}`, chargeFormated, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await api.post(`/clients/${clientCharge.id}/charges`, chargeFormated, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setReloadTable(true);
            handleCloseModal();

            setTimeout(() => {
                setShowSuccessCharge(true);
                setShowSuccessUpdateCharge(true);
            }, 1000);

            return;
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInputValue = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleChangeStatus = event => {
        const currStatus = allStatus.find(status => status.id === parseInt(event.target.value));

        if (!currStatus) {
            return;
        }
        setStatus({ ...currStatus });
    };

    return (
        <StyledModal open={registerCharge || updateCharge}>
            <Box className="container-modal-register charge">
                <img className="close-icon-modal" src={CloseIcon} alt="Black X" onClick={() => handleCloseModal()} />

                <section className="title-modal-register charge">
                    <img src={ChargesIcon} alt="Charges icon" />
                    <h2>{updateCharge ? 'Edit Charge' : 'Register Charge'}</h2>
                </section>

                <form className="form-register" onSubmit={handleSubmit}>
                    <section className={`form-group-register ${errors.name && 'error-input'}`}>
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updateCharge ? form.name : clientCharge.name}
                            readOnly
                        ></input>
                    </section>

                    <section
                        className={`form-group-register form-description-charge ${errors.description && 'error-input'}`}
                    >
                        <label htmlFor="description">Description *</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter the description"
                            value={description}
                            onChange={handleChangeInputValue}
                        ></input>
                    </section>
                    {errors.description && <p className="error error-register-charge">{errors.description}</p>}

                    <section className="form-group-register container-small-input-register">
                        <div className={`form-group-register small-input-register ${errors.due_date && 'error-input'}`}>
                            <label htmlFor="due_date">Due date *</label>
                            <input
                                type="date"
                                id="due_date"
                                name="due_date"
                                placeholder="Enter the due date"
                                value={due_date}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                        <div className={`form-group-register small-input-register  ${errors.amount && 'error-input'}`}>
                            <label htmlFor="amount">Amount *</label>
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                placeholder="Enter the amount"
                                value={FormatMoney(FormatInputFormsNumber(amount))}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                    </section>
                    {(errors.due_date || errors.amount) && (
                        <section className="section-error-small-input error-register-charge">
                            <p className="error">{errors.due_date}</p>
                            <p className="error">{errors.amount}</p>
                        </section>
                    )}

                    <section className="form-group-register container-status-charge">
                        <label htmlFor="status">Status *</label>
                        <RadioGroup
                            id="status"
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={status.id.toString()}
                            name="radio-buttons-group"
                            onChange={handleChangeStatus}
                        >
                            {allStatus.map(status => (
                                <FormControlLabel
                                    key={status.id}
                                    value={status.id.toString()}
                                    control={<StyledRadio />}
                                    label={status.name}
                                />
                            ))}
                        </RadioGroup>
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
                            Apply
                        </Button>
                    </section>
                </form>
            </Box>
        </StyledModal>
    );
}

export default ModalCharge;
