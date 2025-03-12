import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../../utils/logout";
import { RightContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Right() {
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();
        await logout();
        navigate("/login");
    }

    return (
        <RightContainer>
            <Link onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} color="white" size="xl" />
            </Link>
        </RightContainer>
    );
}

export default Right;
