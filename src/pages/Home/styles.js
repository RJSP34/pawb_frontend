import styled from "styled-components";

export const ContainerFormLogin = styled.div`
    display: flex;
    justify-content: center;
`;

export const FormLogin = styled.form`
    margin: 40px 0px;
    background: #ffffff;
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 60px 80px;
`;

export const InputProfile = styled.input`
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.1));
    border: none;
    margin-bottom: 10px;
    outline: none;
    box-sizing: border-box;
    font-size: 18px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;

    &::placeholder {
        color: #000;
        opacity: 30%;
        justify-content: center;
    }
`;

export const ContainerAllButtons = styled.div`
    margin-top: 15%;
`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
`;

export const ButtonLogin = styled.button`
    border: none;
    color: #fff;
    padding: 8px 64px;
    background: #fdc544;
    border-radius: 4px;
    font-size: 18px;

    &:hover {
        -webkit-transform: scale(1.4);
        transform: scale(1.1);
    }
`;

export const ButtonRegister = styled.button`
    margin-top: 8px;
    border: none;
    color: #fdc544;
    padding: 8px 54px;
    background: #fff5d4;
    border-radius: 4px;
    font-size: 18px;

    &:hover {
        -webkit-transform: scale(1.4);
        transform: scale(1.1);
    }
`;
