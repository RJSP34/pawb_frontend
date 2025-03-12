import React from "react";
import Left from "./Left";
import Right from "./Right";
// import Center from "./Center";
import { HeaderContainer } from "./styles";

const Header = () => {
    return (
        <HeaderContainer>
            <Left />
            {/* <Center /> */}
            <Right />
        </HeaderContainer>
    );
};

export default Header;
