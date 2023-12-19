import ShowPassword from '../../assets/show-password.svg';
import HidePassword from '../../assets/hide-password.svg';
import './InputField.css';

export default function InputField({
    type,
    placeholder,
    text,
    text2,
    name,
    value,
    onChange,
    showPassword,
    setShowPassword,
}) {
    return (
        <div className="container-input-field">
            <div className="label-container">
                <label htmlFor={name} className="text-input-field">
                    {text}
                </label>
                {text2 && (
                    <label htmlFor={name} className="text-input-field text2-label">
                        {text2}
                    </label>
                )}
            </div>
            {name === 'password' || name === 'confirmPassword' ? (
                <div className="input-password">
                    <input
                        id={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className="input-field"
                        autoComplete="on"
                    />
                    <img
                        src={showPassword ? ShowPassword : HidePassword}
                        alt="Black eye to show or hide password"
                        onClick={() => setShowPassword(!showPassword)}
                        className={showPassword ? '' : 'hide-password'}
                    />
                </div>
            ) : (
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="input-field"
                    type={type}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}
