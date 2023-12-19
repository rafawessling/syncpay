import validator from 'validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export default async function RegisterClientValidation(name, email, phone, cpf, cep) {
    let errors = {};

    if (!name) {
        errors.name = 'Name is required';
    } else if (!validator.isLength(name, { min: 3, max: 100 })) {
        errors.name = 'Name must be between 3 and 100 characters and Name cannot contain special characters or numbers';
    } else if (!validator.isAlpha(name, 'pt-BR', { ignore: ' ' })) {
        errors.name ='Name must be between 3 and 100 characters and Name cannot contain special characters or numbers';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!validator.isEmail(email.toLowerCase().trim())) {
        errors.email = 'Invalid email';
    }

    if (!phone) {
        errors.phoneNumber = 'Phone number is required';
    } else if (phone.length !== 10 && phone.length !== 11) {
        errors.phoneNumber = 'Invalid phone number';
    }

    if (!cpf) {
        errors.cpf = 'CPF is required';
    } else if (!cpfValidator.isValid(cpf)) {
        errors.cpf = 'Invalid CPF';
    }

    if (cep && (!validator.isNumeric(cep) || !validator.isLength(cep, { min: 8, max: 8 }))) {
        errors.cep = 'Invalid CEP';
    }

    return errors;
}
