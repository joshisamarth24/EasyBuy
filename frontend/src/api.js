import axios from "axios"

const BASE_URL = 'https://easybuy-gl09.onrender.com/api';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU4Zjg2ZDgzZDllODExODRmYjAyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDQzNTM2MywiZXhwIjoxNzA0NDQ2MTYzfQ.Lyi0hhKH5jVXOYPWDGnklbcR7OvWLCxpf-lUhLNKNa0'

export const publicRequest = axios.create({
    baseURL:BASE_URL
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token: `Bearer ${TOKEN}`}
})