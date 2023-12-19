import axios from 'axios';

export default axios.create({
    baseURL: 'https://project-the-walking-devs.cyclic.app',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});
