import validator from 'validator';
import api from '../services/api';

const checkEmailAvailable = async (email) => {
    try {
        const response = await api.get(`/users/email?email=${encodeURIComponent(email)}`);
        return response.data.message === 'email available' ;
    } catch (error) {
            console.error('Error when checking email availability', error.message)
            return false;
    }
};

export default async function SignUpValidation(name, email, password, confirmPassword, step) {
    let errors = {};

    if (step === 0) {
        if (!name.trim()) {
            errors.name = 'Name is required';
        } else if (!validator.isLength(name, { min: 3, max: 100 })) {
            errors.name = 'Name must be between 3 and 100 characters and cannot contain special characters or numbers';
        } else if (!validator.isAlpha(name, 'pt-BR', { ignore: ' ' })) {
            errors.name = 'Name must be between 3 and 100 characters and cannot contain special characters or numbers';
        }

        if (!email.trim()) {
            errors.email = 'Email is required'; 
        } else if (!validator.isEmail(email)) {
            errors.email = 'Invalid email';
        } else {
            const isEmailAvailable = await checkEmailAvailable(email.trim());
            if (!isEmailAvailable) {
                errors.email = 'This email is already in use';
            }
        }

        return errors;
    }

    if (step === 1) {
        if (!password) {
            errors.password = 'Password is required';
        } else if (!validator.isLength(password, { min: 6 })) {
            errors.password = 'Password must be at least 6 characters long and contain at least one letter and one number';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            errors.password = 'Password must be at least 6 characters long and contain at least one letter and one number';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    }
}
 