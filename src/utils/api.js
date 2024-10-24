import axios from 'axios';
//PROXY추가 함으로써 https에서 호출해도에러 안나게 조율
const api = axios.create({
    baseURL: `${process.env.REACT_APP_BECKEND_PROXY}/api`,
    headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
    (config) => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
    },
    (error) => {
        console.error('REQUEST ERROR', error.message);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    function (error) {
        error = error.response.data;
        console.log('RESPONSE ERROR', error.message);
        return Promise.reject(error);
    }
);

export default api;
