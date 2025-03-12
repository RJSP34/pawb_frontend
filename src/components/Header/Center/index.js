import React from "react";
import { CenterContainer, LogoLink } from "./styles";
import logo from "../../../assets/logo.svg";

function Center() {
    return (
        <CenterContainer>
            <LogoLink to="/app" id="headerLogo">
                <img style={{ height: "80px", width: "80px" }} src={logo} alt="Logo" />
            </LogoLink>
        </CenterContainer>
    );
}

export default Center;
