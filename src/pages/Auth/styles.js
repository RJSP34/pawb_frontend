import { Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 60px 80px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledButton = styled(Button)`
    margin: 10px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
`;
