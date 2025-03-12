import React, { useEffect, useRef, useState } from "react";
import { deleteImagePost, getMyImages } from "../../services/images";
import { Table, Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateSorter, stringSorter } from "../../utils/sorter";
import dayjs from "dayjs";
import { getColumnSearchProps } from "../../utils/tableUtils";

const MyImages = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingImageId, setDeletingImageId] = useState(null);

    const tableColumns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => <img src={text} alt={record.description} width="150" />,
            width: "20%",
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
                    <Button type="link" onClick={() => handleDeleteImage(record.key)}>
                        <FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "#ce0000" }} />
                    </Button>
                </>
            ),
            width: "10%",
        },
    ];

    const handleDeleteImage = (id) => {
        setDeletingImageId(id);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteImagePost(deletingImageId);
            if (response.status !== 200) {
                throw new Error("Failed to delete image.");
            }
            notification.success({ message: "Image deleted successfully" });
            setTableData(tableData.filter((image) => image.key !== deletingImageId));
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        } finally {
            setDeletingImageId(null);
            setDeleteModalVisible(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getMyImages();
                const imagesRes = response.data.images;
                if (imagesRes == null) {
                    setIsLoading(false);
                    return;
                }
                const data = imagesRes.map((value) => ({
                    key: value.id,
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
            <h1>My Images</h1>
            <Table dataSource={tableData} columns={tableColumns} loading={isLoading} />
            <Modal
                title="Delete Image"
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onOk={handleConfirmDelete}
                okText="Delete"
                cancelText="Cancel"
                okType="primary"
                okButtonProps={{ danger: true }}
                centered
            >
                <p>Are you sure you want to delete this image?</p>
            </Modal>
        </>
    );
};

export default MyImages;
