import api from '../services/api.js';

export const logedUser = async token => {
    try {
        const user = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return user.data.name;
    } catch (error) {
        return console.error('Server error', error.message);
    }
};

export const loadUserData = async (token, setUserName) => {
    try {
        const name = await logedUser(token);
        setUserName(name);
    } catch (error) {
        console.error('Error loading user data:', error.message);
    }
};
