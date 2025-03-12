import Axios from "axios";

const API_URL = process.env.REACT_APP_API_DOMAIN;

export const getBodyParts = async () => {
    const token = sessionStorage.getItem("token");
    const response = await Axios.get(`${API_URL}/body_parts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { data: response.data, status: response.status };
};
