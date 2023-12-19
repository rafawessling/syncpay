export const FormatInputFormsNumber = input => {
    if (input) {
        return input.trim().replace(/\D/g, '');
    }
};

export const FormatInputFormsText = input => {
    if (input) {
        return input.trim();
    }
    return;
};

export const FormatInputFormsEmail = input => {
    if (input) {
        return input.trim().toLowerCase();
    }
    return;
};

export const FormatPhoneInput = phoneNumber => {
    if (phoneNumber) {
        const phone = FormatInputFormsNumber(phoneNumber);
        if (phone.length === 11) {
            return '(99) 99999-9999';
        } else {
            return '(99) 9999-99999';
        }
    }
    return;
};

export const FormatDate = date => {
    if (date) {
        const [dateFormated] = date.split('T');

        const [year, month, day] = dateFormated.split('-');

        const newDateFormat = `${day}/${month}/${year}`;

        return newDateFormat;
    }
    return;
};

export const FormatPhone = phone => {
    if (phone.length === 11) {
        return phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '$1 $2 $3 $4');
    } else if (phone.length === 10) {
        return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2 $3');
    }
};

export function FormatCPF(cpf) {
    const numericCPF = cpf.replace(/\D/g, '');
    const formatedCPF = numericCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1 $2 $3 $4');

    return formatedCPF;
}

export const FormatMoney = money => {
    if (!money || money < 1) {
        return 'R$ 0,00';
    }

    money = `${money}`;
    money = money.replace(/^0+/, '');

    if (money.length === 1) {
        return `R$ 0,0${money}`;
    }

    const noCents = money.slice(0, -2);

    const cents = money.slice(-2);

    const value = noCents.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const formatValue = `R$ ${value ? value : 0},${cents}`;

    return formatValue;
};

export const FormatCEP = zip_code => {
    const cleaned = ('' + zip_code).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{3})$/);
    if (match) {
        return `${match[1]}-${match[2]}`;
    }
    return zip_code;
};
