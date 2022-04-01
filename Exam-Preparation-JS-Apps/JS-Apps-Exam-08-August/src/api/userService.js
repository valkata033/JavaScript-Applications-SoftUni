import * as api from './api.js';
import * as util from '../util.js';

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export const login = async (email, password) => {
    const result = await api.post(endPoints.login, {email, password});
    util.setUserData(result);
    return result;
}

export const register = async (email, password) => {
    const result = await api.post(endPoints.register, {email, password});
    util.setUserData(result);
    return result;
}

export const logout = () => {
    api.get(endPoints.logout);
    util.clearUserData();
}
