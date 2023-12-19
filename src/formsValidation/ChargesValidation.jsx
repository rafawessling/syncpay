import validator from 'validator';


export default function ChargesValidation (description, due_date, amount) {
    let errors = {};

    if (!description.trim()) {
        errors.description = 'Description is required'; 
    }

    if (!due_date.trim()) {
        errors.due_date = 'Date is required';
    }else if (!validator.isISO8601(due_date)) {
        errors.due_date = 'Invalid date'
    }

    if (!amount){
        errors.amount  = 'Amount is required'
    } else if (parseInt(amount) < 1) {
        errors.amount  = 'The amount must be greater than zero'
    }
    
    return errors;
}
