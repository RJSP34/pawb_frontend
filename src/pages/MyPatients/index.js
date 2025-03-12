import React, { useEffect, useRef, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stringSorter } from "../../utils/sorter";
import { getColumnSearchProps } from "../../utils/tableUtils";
import { getMyPatients } from "../../services/clinicians";

const MyPatients = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const tableColumns = [
        {
            title: "Name",
            dataIndex: "patient_name",
            key: "patient_name",
            ...getColumnSearchProps(
                "patient_name",
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput
            ),
            sorter: (a, b) => stringSorter(a.patient_name, b.patient_name),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "patient_email",
            key: "patient_email",
            ...getColumnSearchProps(
                "patient_email",
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput
            ),
            sorter: (a, b) => stringSorter(a.patient_email, b.patient_email),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => navigate(`/app/clinician/patient/${record.key}`)}>
                        <FontAwesomeIcon icon={faImage} size="xl" style={{ color: "#1677ff" }} />
                    </Button>
                </>
            ),
            width: "10%",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getMyPatients();
                const tableData = response.data.patients;

                if (tableData == null) {
                    setIsLoading(false);
                    return;
                }
                const data = tableData.map((value) => ({
                    key: value.patient_id,
                    patient_name: value.patient_name || "Name placeholder",
                    patient_email: value.patient_email || "Email placeholder",
                }));
                setTableData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>My Patients</h1>
            <Table dataSource={tableData} columns={tableColumns} loading={isLoading} />
        </>
    );
};

export default MyPatients;
