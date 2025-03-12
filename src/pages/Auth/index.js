import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ButtonContainer, StyledButton } from "./styles";

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token != null) navigate("/app", { replace: true });
        // eslint-disable-next-line
    }, []);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <Container>
            <ButtonContainer>
                <StyledButton type="primary" onClick={handleLogin}>
                    Login
                </StyledButton>
                <StyledButton onClick={handleRegister}>Register</StyledButton>
            </ButtonContainer>
        </Container>
    );
};

export default Auth;
