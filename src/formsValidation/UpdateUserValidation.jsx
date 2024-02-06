import validator from 'validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import api from '../services/api';

export default async function UpdateUserValidation(currentUser) {
    const { name, email, cpf, phoneNumber, password, passwordConfirmation } = currentUser;
    const errors = {};
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
    }

    if (cpf) {
        if (!cpfValidator.isValid(cpf)) {
            errors.cpf = 'Invalid CPF';
        }
    }

    if (phoneNumber) {
        if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
            errors.phoneNumber = 'Invalid phone number';
        }
    }

    if (password) {
        if (!validator.isLength(password, { min: 6 })) {
            errors.password =
                'Password must be at least 6 characters long and contain at least one letter and one number';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            errors.password =
                'Password must be at least 6 characters long and contain at least one letter and one number';
        }
    }

    if (password !== passwordConfirmation) {
        errors.passwordConfirmation = 'Passwords do not match';
    }

    return errors;
}
