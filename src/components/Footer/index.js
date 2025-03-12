import { ContainerFooter } from "./styles";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <ContainerFooter>
            <p>Made with ♥ using React © {year}</p>
        </ContainerFooter>
    );
};

export default Footer;
