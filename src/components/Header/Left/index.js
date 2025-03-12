import React from "react";
import { LeftContainer, LogoLink } from "./styles";
import logo from "../../../assets/logo.svg";

function Left() {
    return (
        <LeftContainer>
            <LogoLink to="/app" id="headerLogo">
                <img style={{ width: "90px" }} src={logo} alt="Logo" />
            </LogoLink>
        </LeftContainer>
    );
}

export default Left;
