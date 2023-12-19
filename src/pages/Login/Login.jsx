import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/storage';
import api from '../../services/api';
import BtnAction from '../../components/BtnAction/BtnAction';
import InputField from '../../components/InputField/InputField';
import LoginValidation from '../../formsValidation/LoginValidation';
import './Login.css';

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [errors, setErros] = useState({
        email: '',
        password: '',
        login: '',
    });
    const navigate = useNavigate();
    const { email, password } = form;
    const [showPassword, setShowPassword] = useState(false);

    const handleChangeInputValue = event => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setErros({
            email: '',
            password: '',
            login: '',
        });

        try {
            const lowerCaseEmail = email.toLocaleLowerCase().trim();
            const validation = await LoginValidation(lowerCaseEmail, password);
            if (Object.keys(validation).length > 0) {
                setErros(validation);
                return;
            } else {
                setErros({
                    email: '',
                    password: '',
                    login: '',
                });
            }

            const response = await api.post('/login', { email: lowerCaseEmail, password });

            if (response.status === 200) {
                const { token, user } = response.data;
                setItem('token', token);
                setItem('userName', user.name);

                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErros({
                    ...errors,
                    login: error.response.data.message,
                });
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <main className="signup-container">
            <div className="login-information-side">
                <h2 className="text-login-page">Manage all your company's payments in one place.</h2>
            </div>
            <section className="container-form-login">
                <article className="content-form-login">
                    <h2 className="title-login-form">Login here!</h2>
                    <form className="form-login" onSubmit={handleSubmit}>
                        <InputField
                            type="text"
                            name="email"
                            text="Email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleChangeInputValue}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            text="Password"
                            text2="Forgot you password?"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChangeInputValue}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                        {errors.login && <p className="error">{errors.login}</p>}

                        <BtnAction color="btn-pink btn-form-login" type="submit" name="Login" />
                    </form>

                    <p className="text-redirect-register">
                        Do not have an account yet?
                        <Link to="/signup">
                            <span> Register</span>
                        </Link>
                    </p>
                </article>
            </section>
        </main>
    );
}
