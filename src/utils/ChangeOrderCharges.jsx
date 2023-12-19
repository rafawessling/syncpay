export const sortChargesByClientName = charges => {
    return charges.sort((a, b) => {
        const nameA = a.client_name.toLowerCase();
        const nameB = b.client_name.toLowerCase();

        return nameA.localeCompare(nameB);
    });
};

export const sortChargesById = charges => {
    return charges.sort((a, b) => {
        const nameA = a.id.toLowerCase();
        const nameB = b.id.toLowerCase();

        return nameA.localeCompare(nameB);
    });
};

export const sortChargesByDate = charges => {
    return charges.sort((a, b) => {
        const nameA = a.due_date;
        const nameB = b.due_date;

        return nameA.localeCompare(nameB);
    });
};

const getStatusValue = (status, dueDate) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const chargeDate = new Date(dueDate).toISOString().split('T')[0];

    if (status === 0) {
        return chargeDate < currentDate ? 'Overdue' : 'Pending';
    } else if (status === 1) {
        return 'Paid';
    }
};

export const sortChargesByStatus = (charges, sortOrder) => {
    return charges.sort((a, b) => {
        const statusA = getStatusValue(a.status, a.due_date);
        const statusB = getStatusValue(b.status, b.due_date);

        return sortOrder === 'asc' ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
    });
};
