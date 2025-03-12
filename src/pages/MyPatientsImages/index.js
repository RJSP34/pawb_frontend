import React, { useEffect, useRef, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateSorter, stringSorter } from "../../utils/sorter";
import dayjs from "dayjs";
import { getColumnSearchProps } from "../../utils/tableUtils";
import { getMyPatientsImages } from "../../services/clinicians";

const MyPatientsImages = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const tableColumns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => <img src={text} alt={record.description} width="150" />,
            width: "20%",
        },
        {
            title: "Patient",
            dataIndex: "patient_info",
            key: "patient_info",
            ...getColumnSearchProps(
                "patient_info",
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput
            ),
            sorter: (a, b) => stringSorter(a.patient_info, b.patient_info),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Body Part",
            dataIndex: "body_part",
            key: "body_part",
            ...getColumnSearchProps("body_part", searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            sorter: (a, b) => stringSorter(a.body_part, b.body_part),
            sortDirections: ["descend", "ascend"],
            width: "10%",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps(
                "description",
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput
            ),
            sorter: (a, b) => stringSorter(a.description, b.description),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Date of Submission",
            dataIndex: "created_at",
            key: "created_at",
            ...getColumnSearchProps("created_at", searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            sorter: (a, b) => dateSorter(a.created_at, b.created_at),
            sortDirections: ["descend", "ascend"],
            width: "15%",
            defaultSortOrder: "descend",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => navigate(`/app/image/${record.key}`)}>
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
                const response = await getMyPatientsImages();
                const imagesRes = response.data.images;
                if (imagesRes == null) {
                    setIsLoading(false);
                    return;
                }
                const data = imagesRes.map((value) => ({
                    key: value.id,
                    patient_info: `${value.patient_name} - ${value.patient_email}`,
                    image: `data:${value.image.mime};base64,${value.image.data}`,
                    body_part: value.body_part,
                    created_at: dayjs(value.created_at).format("YYYY-MM-DD HH:mm:ss"),
                    description: value.description,
                    link: `/images/${value.id}`,
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
            <h1>My Patients' Images</h1>
            <Table dataSource={tableData} columns={tableColumns} loading={isLoading} />
        </>
    );
};

export default MyPatientsImages;
