import Axios from "axios";

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const uploadImagePost = async (values) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.post(`${API_URL}/user/images/submit`, values, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};

export const getMyImages = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/user/images`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const deleteImagePost = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.delete(`${API_URL}/user/images/${id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};

export const getImage = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/user/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const updateImageDescription = async (values) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.patch(`${API_URL}/user/images`, values, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};

export const getFeedbackByImageId = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/feedback/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const getImageAsClinician = async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/clinicians/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, status: response.status };
};

export const submitFeedback = async (values) => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.post(`${API_URL}/clinicians/feedback`, values, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data, status: response.status };
};
