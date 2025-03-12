import React, { useEffect, useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Form, Select, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getAllClinicians, getAllowedClinicians, getProfile, updateAllowedClinicians } from "../../services/user";
import getRole from "../../utils/getRole";
import dayjs from "dayjs";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [clinicians, setClinicians] = useState([]);
    const [allowedClinicians, setAllowedClinicians] = useState();

    const mapRoleDescription = (role) => {
        switch (role) {
            case "user":
                return "Patient";
            case "clinician":
                return "Clinician";
            case "admin":
                return "Administrator";
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userRes = await getProfile();
                const profile = userRes.data.profile;
                const roleDescription = mapRoleDescription(profile.role_description);
                const formattedCreatedAt = dayjs(profile.created_at).format("YYYY-MM-DD");
                setUserInfo({ ...profile, role_description: roleDescription, created_at: formattedCreatedAt });
            } catch (err) {
                console.error(err);
                notification.error({ message: err.message });
            }
        };
        const fetchClinicians = async () => {
            try {
                const cliniciansRes = await getAllClinicians();
                const cliniciansList = cliniciansRes.data.clinicians;

                const options = cliniciansList.map((clinician) => ({
                    label: clinician.name,
                    value: clinician.id,
                    key: clinician.id,
                }));
                setClinicians(options);
            } catch (error) {
                console.error(error);
                notification.error({ message: error.message });
            }
        };

        const fetchAllowedClinicians = async () => {
            try {
                const allowedCliniciansRes = await getAllowedClinicians();
                const allowedCliniciansList = allowedCliniciansRes.data.clinicians;
                const clinicianIds = allowedCliniciansList.map((clinician) => clinician.id);

                setAllowedClinicians(clinicianIds);
            } catch (error) {
                console.error(error);
                notification.error({ message: error.message });
            }
        };
        fetchProfile();
        if (getRole() === "user") {
            fetchClinicians();
            fetchAllowedClinicians();
        }
    }, []);

    const handleCliniciansChange = (clinicians) => {
        setAllowedClinicians(clinicians);
    };

    const handleSubmitNewClinicians = async () => {
        try {
            const values = allowedClinicians.map((clinician) => ({
                clinician_id: clinician,
            }));
            const response = await updateAllowedClinicians(values);
            if (response?.status !== 200) {
                throw new Error("Failed to update your list of clinicians");
            }
            notification.success({ message: "List of allowed clinicians updated successfully" });
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        }
    };
    return (
        <>
            <Avatar
                src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
            />
            <Descriptions column={1}>
                <Descriptions.Item label="Registered since">{userInfo?.created_at}</Descriptions.Item>
                <Descriptions.Item label="Name">{userInfo?.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{userInfo?.email}</Descriptions.Item>
                <Descriptions.Item label="Role type">{userInfo?.role_description}</Descriptions.Item>
            </Descriptions>
            {getRole() === "user" && (
                <>
                    <h1>Your clinicians</h1>
                    {allowedClinicians && (
                        <>
                            <Form onFinish={handleSubmitNewClinicians}>
                                <Form.Item>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: "50%" }}
                                        placeholder="Please select a clinician"
                                        defaultValue={allowedClinicians}
                                        onChange={handleCliniciansChange}
                                        options={clinicians}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginLeft: "10px", background: "green" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            size="xl"
                                            color="white"
                                            style={{ marginRight: "10px" }}
                                        />
                                        Update Clinicians
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default UserProfile;
