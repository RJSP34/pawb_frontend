import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ContainerFormLogin, FormLogin, StyledButton } from "./styles";
import { loginPost } from "../../../services/auth";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token != null) navigate("/app", { replace: true });
        // eslint-disable-next-line
    }, []);

    async function handleLogin(values) {
        try {
            const { email, password } = values;
            const response = await loginPost({ email, password });
            sessionStorage.setItem("token", response.data.token);
            navigate("/app");
        } catch (err) {
            console.error(err);
            sessionStorage.removeItem("token");
            setError(err.response.data.error || "An unknown error occurred.");
        }
    }

    function handleGoBack() {
        navigate("/");
    }

    return (
        <ContainerFormLogin>
            <FormLogin name="login-form" className="login-form" onFinish={handleLogin}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address",
                        },
                        { min: 6 },
                        { max: 254 },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                            min: 6,
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Form.Item>
                    <StyledButton type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </StyledButton>
                    <StyledButton htmlType="button" className="login-form-button" onClick={handleGoBack}>
                        Go back
                    </StyledButton>
                </Form.Item>
            </FormLogin>
        </ContainerFormLogin>
    );
};

export default Login;
