import * as api from './api.js';
import * as utils from '../utils.js';

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export const login = async (email, password) => {
    const result = await api.post(endPoints.login, {email, password});
    utils.setUserData(result);
    return result;
}

export const register = async (email, password) => {
    const result = await api.post(endPoints.register, {email, password});
    utils.setUserData(result);
    return result;
}

export const logout = () => {
    api.get(endPoints.logout);
    utils.clearUserData();
}
