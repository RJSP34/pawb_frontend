import { logoutDelete } from "../services/auth";

const logout = async () => {
    const response = await logoutDelete();
    sessionStorage.removeItem("token");
    return response;
};

export default logout;
