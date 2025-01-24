import { Api } from './Api';


export const api = new Api({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
}); 