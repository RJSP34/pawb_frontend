import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    function handleGoHome() {
        navigate("/app");
    }
    return (
        <div>
            <h1>Not Found</h1>
            <Button onClick={handleGoHome}>Go Home!</Button>
        </div>
    );
};

export default NotFound;
