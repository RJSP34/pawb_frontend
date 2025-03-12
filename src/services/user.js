import Axios from "axios";

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const getProfile = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const getAllowedClinicians = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/user/allowed_clinicians`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const getAllClinicians = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/user/clinicians`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const updateAllowedClinicians = async (values) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.put(`${API_URL}/user/clinicians`, values, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};
