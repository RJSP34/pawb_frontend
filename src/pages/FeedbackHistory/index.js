import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, notification, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { faImage, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateSorter, stringSorter } from "../../utils/sorter";
import dayjs from "dayjs";
import { getColumnSearchProps } from "../../utils/tableUtils";
import { deleteFeedback, getMyFeedback, patchUpdateFeedback } from "../../services/clinicians";

const FeedbackHistory = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingFeedbackId, setDeletingFeedbackId] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingFeedbackId, setEditingFeedbackId] = useState(null);
    const [editFeedbackText, setEditFeedbackText] = useState("");

    const tableColumns = [
        {
            title: "Image",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => navigate(`/app/${record.link}`)}>
                        <FontAwesomeIcon icon={faImage} size="xl" style={{ color: "#1677ff" }} />
                    </Button>
                </>
            ),
            width: "10%",
        },
        {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at",
            ...getColumnSearchProps("created_at", searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            sorter: (a, b) => dateSorter(a.created_at, b.created_at),
            sortDirections: ["descend", "ascend"],
            width: "15%",
            defaultSortOrder: "descend",
        },
        {
            title: "Feedback",
            dataIndex: "feedback",
            key: "feedback",
            ...getColumnSearchProps("feedback", searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            sorter: (a, b) => stringSorter(a.feedback, b.feedback),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEditFeedback(record.key)}>
                        <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#1677ff" }} />
                    </Button>
                    <Button type="link" onClick={() => handleDeleteFeedback(record.key)}>
                        <FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "#ce0000" }} />
                    </Button>
                </>
            ),
            width: "10%",
        },
    ];

    const handleDeleteFeedback = (id) => {
        setDeletingFeedbackId(id);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteFeedback(deletingFeedbackId);
            if (response.status !== 200) {
                throw new Error("Failed to delete feedback.");
            }
            notification.success({ message: "Feedback deleted successfully" });
            setTableData(tableData.filter((feedback) => feedback.key !== deletingFeedbackId));
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        } finally {
            setDeletingFeedbackId(null);
            setDeleteModalVisible(false);
        }
    };

    const handleEditFeedback = (id) => {
        const feedbackToEdit = tableData.find((feedback) => feedback.key === id);
        if (feedbackToEdit) {
            setEditingFeedbackId(id);
            setEditFeedbackText(feedbackToEdit.feedback);
            setEditModalVisible(true);
        }
    };

    const handleConfirmEdit = async () => {
        try {
            const updatedFeedback = { feedback_id: editingFeedbackId, feedback: editFeedbackText };
            const response = await patchUpdateFeedback(updatedFeedback);
            if (response.status !== 200) {
                throw new Error("Failed to edit feedback.");
            }
            notification.success({ message: "Feedback edited successfully" });
            const updatedTableData = tableData.map((feedback) => {
                if (feedback.key === editingFeedbackId) {
                    return {
                        ...feedback,
                        feedback: editFeedbackText,
                    };
                }
                return feedback;
            });
            setTableData(updatedTableData);
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        } finally {
            setEditingFeedbackId(null);
            setEditModalVisible(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getMyFeedback();
                const feedbackHistRes = response.data.feedback;
                if (feedbackHistRes == null) {
                    setIsLoading(false);
                    return;
                }
                const data = feedbackHistRes.map((value) => ({
                    key: value.feedback_id,
                    created_at: dayjs(value.created_at).format("YYYY-MM-DD HH:mm:ss"),
                    feedback: value.feedback,
                    link: `image/${value.image_id}`,
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
            <h1>My Feedback History</h1>
            <Table dataSource={tableData} columns={tableColumns} loading={isLoading} />
            <Modal
                title="Delete Feedback"
                open={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onOk={handleConfirmDelete}
                okText="Delete"
                cancelText="Cancel"
                okType="primary"
                okButtonProps={{ danger: true }}
                centered
            >
                <p>Are you sure you want to delete your feedback?</p>
            </Modal>
            <Modal
                title="Edit Feedback"
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={handleConfirmEdit}
                okText="Submit"
                cancelText="Cancel"
                okType="primary"
                centered
            >
                <Input.TextArea
                    value={editFeedbackText}
                    onChange={(e) => setEditFeedbackText(e.target.value)}
                    placeholder="Enter your feedback"
                    rows={4}
                />
            </Modal>
        </>
    );
};

export default FeedbackHistory;
