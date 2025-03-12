import jwtDecode from "jwt-decode";

export default function getRole() {
    return sessionStorage.getItem("token") && jwtDecode(sessionStorage.getItem("token")).role;
}
