import { Button, Form } from "antd";
import styled from "styled-components";

export const ContainerFormLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const StyledButton = styled(Button)`
    margin: 10px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
`;

export const FormLogin = styled(Form)`
    margin: 40px 0px;
    background: #ffffff;
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 60px 80px;
`;
