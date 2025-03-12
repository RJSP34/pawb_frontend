import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.img`
    height: 50px;
`;

export const ContainerLinks = styled.nav`
    margin: 0px 20px;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SearchIcon = styled.img`
    margin-right: 30px;

    &:hover {
        -webkit-transform: scale(1.4);
        transform: scale(1.3);
    }
`;

export const ProfileIcon = styled.img`
    height: 50px;
    margin-left: 30px;

    &:hover {
        -webkit-transform: scale(1.4);
        transform: scale(1.3);
    }
`;

export const Row = styled.hr`
    border: 1px solid #fdc544;
    margin-bottom: 0;
`;

export const ContainerMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: 20px;
`;

export const LinkHome = styled(Link)`
    padding: 8px 20px;
    margin: 8px;

    &:hover {
        color: #fdc544;
        opacity: 100%;
        -webkit-transform: scale(1.4);
        transform: scale(1.3);
    }
`;

export const ButtonLogout = styled.button`
    padding: 8px 20px;
    margin: 8px;
    font-family: "Anton", sans-serif;
    color: #000;
    background-color: #fff;
    border: none;
    font-size: 18px;

    &:hover {
        color: #fdc544;
        opacity: 100%;
        -webkit-transform: scale(1.4);
        transform: scale(1.2);
    }
`;

export const ButtonLogin = styled.button`
    padding: 8px 0px;
    margin: 10px;
    font-family: "Anton", sans-serif;
    color: #000;
    background-color: #fff;
    border: none;
    font-size: 18px;

    &:hover {
        color: #fdc544;
        opacity: 100%;
        -webkit-transform: scale(1.4);
        transform: scale(1.2);
    }
`;

export const Button = styled.button`
    padding: 8px 0px;
    margin: 10px;
    font-family: "Anton", sans-serif;
    color: #000;
    background-color: #fff;
    border: none;
    font-size: 18px;

    &:hover {
        color: #fdc544;
        opacity: 100%;
        -webkit-transform: scale(1.4);
        transform: scale(1.2);
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    line-height: 0;
`;
