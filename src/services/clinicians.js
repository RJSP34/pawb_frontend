import Axios from "axios";

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const getMyPatients = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/clinicians/patient`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};

export const getPatientImages = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/clinicians/patient/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};

export const getMyPatientsImages = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/clinicians/images`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};

export const getMyFeedback = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/clinicians/myfeedback`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};

export const patchUpdateFeedback = async (values) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.patch(`${API_URL}/clinicians/feedback`, values, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};

export const deleteFeedback = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.delete(`${API_URL}/clinicians/feedback/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};
