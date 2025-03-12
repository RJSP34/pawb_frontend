import React, { memo, useState } from "react";
import { Layout as LayoutAntd, notification } from "antd";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = memo(() => {
    const { Header: HeaderAntd, Content } = LayoutAntd;
    const [alert, setAlert] = useState({ message: "", type: "" });

    if (alert.message) {
        notification[alert.type]({
            message: alert.message,
            onClose: () => setAlert({ message: "", type: "" }),
        });
    }

    return (
        <LayoutAntd style={{ minHeight: "100vh", height: "100%" }}>
            <HeaderAntd>
                <Header />
            </HeaderAntd>
            <LayoutAntd hasSider>
                <Sidebar />
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </LayoutAntd>
        </LayoutAntd>
    );
});

export default Layout;
