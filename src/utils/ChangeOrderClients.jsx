export const sortClientsByName = clients => {
    return clients.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        return nameA.localeCompare(nameB);
    });
};

export const sortClientsByStatus = clients => {
    return clients.sort((a, b) => {
        const nameA = a.status.toString();
        const nameB = b.status.toString();

        return nameA.localeCompare(nameB);
    });
};
