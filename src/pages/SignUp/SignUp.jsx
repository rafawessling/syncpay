import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StepDone from '../../assets/StepDone.svg';
import Line from '../../assets/Line.svg';
import StepNotDone from '../../assets/StepNotDone.svg';
import BtnAction from '../../components/BtnAction/BtnAction';
import InputField from '../../components/InputField/InputField';
import ThreeStepSlider from '../../components/ThreeStepSlider/ThreeStepSlider';
import StepCheck from '../../assets/StepCheck.svg';
import Done from '../../assets/Done.svg';
import SignUpValidation from '../../formsValidation/SignUpValidation';
import '../../styles/Error.css';
import './SignUp.css';

const totalSteps = 3;

export default function Main() {
    const [stepStates, setStepStates] = useState(['StepDone', 'StepNotDone', 'StepNotDone']);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErros] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const ClickNext = () => {
        if (currentStep < totalSteps - 1) {
            const updatedStates = [...stepStates];
            updatedStates[currentStep] = 'StepCheck';
            updatedStates[currentStep + 1] = 'StepDone';
            setStepStates(updatedStates);
            setCurrentStep(currentStep + 1);
        }
    };

    const SignUpFormSubmit = async e => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = form;
        const formattedName = name.trim();
        const lowerCaseEmail = email.toLowerCase().trim();

        try {
            const validation = await SignUpValidation(
                formattedName,
                lowerCaseEmail,
                password,
                confirmPassword,
                currentStep
            );
            if (Object.keys(validation).length > 0) {
                setErros(validation);
                return;
            } else {
                setErros({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            }
            if (currentStep === 0) {
                ClickNext();
            }
            if (currentStep === 1) {
                const register = await api.post('/user', { name: formattedName, email: lowerCaseEmail, password });
                ClickNext();
                return register.data.message;
            }
            if (currentStep === 2) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const SignUpChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setPasswordMatch(true);
    };

    return (
        <main className="signup-container">
            <article className="information-side">
                <section className="information-square">
                    <section className="steps">
                        {currentStep === 0 && (
                            <>
                                <img src={StepDone} />
                                <img src={Line} />
                                <img src={StepNotDone} />
                                <img src={Line} />
                                <img src={StepNotDone} />
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                <img src={StepCheck} />
                                <img src={Line} />
                                <img src={StepDone} />
                                <img src={Line} />
                                <img src={StepNotDone} />
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <img src={StepCheck} />
                                <img src={Line} />
                                <img src={StepCheck} />
                                <img src={Line} />
                                <img src={StepCheck} />
                            </>
                        )}
                    </section>

                    <section className="information-texts">
                        <div className="group-texts-steps">
                            <h3 className="title-texts-steps">Register</h3>
                            <p className="text-steps">Please write your name and email</p>
                        </div>

                        <div className="group-texts-steps">
                            <h3 className="title-texts-steps">Choose a password</h3>
                            <p className="text-steps">Choose a secure password</p>
                        </div>

                        <div className="group-texts-steps">
                            <h3 className="title-texts-steps">Registration completed successfully</h3>
                            <p className="text-steps">Email and password successfully registered</p>
                        </div>
                    </section>
                </section>
            </article>

            <article className="form-side-register">
                <section className="form-side-square-register">
                    {currentStep == 0 && (
                        <form className="slide-form" onSubmit={SignUpFormSubmit}>
                            <h2 className="title-forms-register">Add your data</h2>
                            <InputField
                                name="name"
                                type="text"
                                text="Name *"
                                value={form.name}
                                placeholder="Enter your name"
                                onChange={SignUpChange}
                            />
                            {errors.name && <p className="error">{errors.name}</p>}
                            <InputField
                                name="email"
                                type="email"
                                text="Email *"
                                value={form.email}
                                placeholder="Enter your email"
                                onChange={SignUpChange}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}

                            <BtnAction color="btn-pink btn-form-register" name="Continue" type="submit" />
                            <p className="text-redirect-login">
                                Already have an account?
                                <Link to="/">
                                    <span> Login</span>
                                </Link>
                            </p>
                            {/*make redirect*/}
                        </form>
                    )}
                    {currentStep == 1 && (
                        <form className="slide-form" onSubmit={SignUpFormSubmit}>
                            <h2 className="title-forms-register">Choose a password</h2>
                            <InputField
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                text="Password *"
                                value={form.password}
                                placeholder="Enter your password"
                                onChange={SignUpChange}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}

                            <InputField
                                name="confirmPassword"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                text="Password Confirmation *"
                                value={form.confirmPassword}
                                placeholder="Enter your password confirmation"
                                onChange={SignUpChange}
                                showPassword={showPasswordConfirmation}
                                setShowPassword={setShowPasswordConfirmation}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            <BtnAction color="btn-pink btn-form-register" name="Complete" type="submit" />
                            <p className="text-redirect-login">
                                Already have an account?
                                <Link to="/">
                                    <span> Login</span>
                                </Link>
                            </p>
                        </form>
                    )}
                    {currentStep == 2 && (
                        <section className="container-finish">
                            <div className="square-finish-register">
                                <img src={Done} className="success-icon" />
                                <h2 className="text-finish-register">Registration completed successfully!</h2>
                            </div>
                        </section>
                    )}
                    {currentStep == 2 && (
                        <Link to="/">
                            <BtnAction color="btn-pink btn-form-register" name="Redirect to login" />
                        </Link>
                    )}
                    <ThreeStepSlider stepStates={stepStates} />
                </section>
            </article>
        </main>
    );
}
