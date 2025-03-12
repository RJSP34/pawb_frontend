import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { ContainerFormRegister, FormRegister, StyledButton } from "./styles";
import { registerPost } from "../../../services/auth";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token != null) navigate("/app", { replace: true });
        // eslint-disable-next-line
    }, []);

    async function handleRegister(values) {
        try {
            const { name, email, password, confirmPassword } = values;
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }
            const response = await registerPost({ name, email, password });
            sessionStorage.setItem("token", response.data.token);
            navigate("/app");
        } catch (err) {
            console.error(err);
            sessionStorage.removeItem("token");
            setError(err.response?.data?.error || err.message || "An unknown error occurred.");
        }
    }

    function handleGoBack() {
        navigate("/");
    }

    return (
        <ContainerFormRegister>
            <FormRegister name="register-form" onFinish={handleRegister}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name" },
                        { type: "string", message: "Please enter a valid name" },
                        { min: 2 },
                        { max: 100 },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email" },
                        { type: "email", message: "Please enter a valid email address" },
                        { min: 6 },
                        { max: 254 },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Please input your password", min: 6 }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item name="confirmPassword" rules={[{ required: true, message: "Please confirm your password" }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Form.Item>
                    <StyledButton type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </StyledButton>
                    <StyledButton htmlType="button" className="login-form-button" onClick={handleGoBack}>
                        Go back
                    </StyledButton>
                </Form.Item>
            </FormRegister>
        </ContainerFormRegister>
    );
};

export default Register;
