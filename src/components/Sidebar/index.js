import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import getRole from "../../utils/getRole";
import { faHouse, faUpload, faImages, faUsers, faBookMedical, faGear } from "@fortawesome/free-solid-svg-icons";

const Sidebar = memo(() => {
    const { Sider } = Layout;
    const location = useLocation();
    const role = getRole();

    const sidebarMenus = [
        {
            key: "/app",
            title: "Home",
            roles: ["user", "clinician"],
            icon: <FontAwesomeIcon icon={faHouse} />,
        },
        // USER
        {
            key: "/app/user/upload",
            title: "Upload Image",
            roles: ["user"],
            icon: <FontAwesomeIcon icon={faUpload} />,
        },
        {
            key: "/app/user/myimages",
            title: "My Images",
            roles: ["user"],
            icon: <FontAwesomeIcon icon={faImages} />,
        },
        // CLINICIAN
        {
            key: "/app/clinician/mypatients",
            title: "My Patients",
            roles: ["clinician"],
            icon: <FontAwesomeIcon icon={faUsers} />,
        },
        {
            key: "/app/clinician/images",
            title: "Images",
            roles: ["clinician"],
            icon: <FontAwesomeIcon icon={faImages} />,
        },
        {
            key: "/app/clinician/feedbackhistory",
            title: "Feedback History",
            roles: ["clinician"],
            icon: <FontAwesomeIcon icon={faBookMedical} />,
        },
        {
            key: "/app/profile",
            title: "Configure Profile",
            roles: ["user", "clinician"],
            icon: <FontAwesomeIcon icon={faGear} />,
        },
    ];

    const getPermittedMenus = (menus, userRole) => menus.filter((menu) => menu.roles.includes(userRole));

    const permittedMenus = getPermittedMenus(sidebarMenus, role);

    return (
        <Sider id="sidebar">
            <Menu mode="inline" defaultSelectedKeys={[location.pathname]} theme="dark">
                {permittedMenus.map((menu) => (
                    <Menu.Item style={{ height: 42 }} icon={menu.icon} key={menu.key}>
                        <Link style={{ color: "white" }} to={menu.key}>
                            {menu.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
});

export default Sidebar;
