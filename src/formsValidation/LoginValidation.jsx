import validator from 'validator';


export default async function LoginValidation(email, password) {
    let errors = {};

    if (!email.trim()) {
        errors.email = 'Email is required'; 
    } else if (!validator.isEmail(email)) {
        errors.email = 'Invalid email';
    }

    if (!password) {
        errors.password = 'Password is required';
    } 
    return errors;
}