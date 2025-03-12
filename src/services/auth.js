import Axios from "axios";

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const loginPost = async (values) => {
    const response = await Axios.post(`${API_URL}/auth/login`, values, {
        headers: { "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};

export const registerPost = async (values) => {
    const response = await Axios.post(`${API_URL}/auth/register`, values, {
        headers: { "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};

export const logoutDelete = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await Axios.delete(`${API_URL}/auth/logout`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { data: response.data, status: response.status };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("token");
        } else {
            console.error("An error occurred:", error);
        }
        return { data: error.response.data, status: error.response.status };
    }
};
