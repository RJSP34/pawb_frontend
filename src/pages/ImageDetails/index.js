import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Descriptions, Input, List, notification } from "antd";
import {
    getFeedbackByImageId,
    getImage,
    getImageAsClinician,
    submitFeedback,
    updateImageDescription,
} from "../../services/images";
import dayjs from "dayjs";
import { faCheck, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getRole from "../../utils/getRole";

const ImageDetails = () => {
    const [imageData, setImageData] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [newFeedback, setNewFeedback] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const handleEditDescriptionButtonClick = () => {
        setNewDescription(imageData.description);
        setIsEditingDescription(true);
    };

    const handleSaveDescriptionButtonClick = async () => {
        try {
            let values = {
                id: imageData.id,
                description: newDescription,
            };
            const response = await updateImageDescription(values);
            if (response?.status !== 200) {
                throw new Error("Failed to update description");
            }
            const newImageData = {
                ...imageData,
                description: newDescription,
            };
            setImageData(newImageData);
            notification.success({ message: "Description updated successfully" });
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        } finally {
            setIsEditingDescription(false);
        }
    };

    const handleCancelDescriptionEditButtonClick = () => {
        setIsEditingDescription(false);
    };

    const handleDescriptionInputChange = (event) => {
        setNewDescription(event.target.value);
    };

    const handleFeedbackInputChange = (event) => {
        setNewFeedback(event.target.value);
    };

    const handleSubmitFeedback = async () => {
        try {
            const values = {
                image_id: parseInt(id),
                feedback: newFeedback,
            };
            if (newFeedback.length <= 0) {
                throw new Error("You did not write any feedback yet.");
            }
            const response = await submitFeedback(values);

            if (response.status !== 201) {
                throw new Error(response.data);
            }

            notification.success({ message: "Feedback added!" });

            fetchFeedback();
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        }
    };

    const fetchFeedback = async () => {
        try {
            const response = await getFeedbackByImageId(id);
            setFeedback(response.data.feedback || []);
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
        }
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let userRole = getRole();
                let imageRes;
                if (userRole === "user") {
                    imageRes = await getImage(id);
                } else if (userRole === "clinician") {
                    imageRes = await getImageAsClinician(id);
                } else {
                    navigate("/404");
                }

                if (imageRes.status !== 200) {
                    throw Error("Failed to get image!");
                }
                let image = {
                    ...imageRes.data.image,
                    created_at: dayjs(imageRes.data.image.created_at).format("YYYY-MM-DD HH:mm:ss"),
                    image: `data:${imageRes.data.image.image.mime};base64,${imageRes.data.image.image.data}`,
                };
                setImageData(image);
                setNewDescription(image.description);
            } catch (err) {
                console.error(err);
                notification.error({ message: err.message });
            }
        };
        fetchImage();
        fetchFeedback();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex" - "start" }}>
                <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                    {imageData && <img style={{ height: "600px" }} src={imageData.image} alt={imageData.description} />}
                </div>
                <div style={{ flex: "1", width: "100%", marginRight: "80px" }}>
                    {imageData && (
                        <>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Date of Submission">{imageData.created_at}</Descriptions.Item>
                                <Descriptions.Item label="Body Part">{imageData.body_part}</Descriptions.Item>
                                <Descriptions.Item label="Description">
                                    {isEditingDescription && getRole() === "user" ? (
                                        <Input
                                            value={newDescription}
                                            onChange={handleDescriptionInputChange}
                                            onPressEnter={handleSaveDescriptionButtonClick}
                                        />
                                    ) : (
                                        <>{imageData.description}</>
                                    )}
                                </Descriptions.Item>
                            </Descriptions>
                            {getRole() === "user" && (
                                <>
                                    {isEditingDescription ? (
                                        <>
                                            <Button
                                                type="text"
                                                style={{ marginLeft: "10px" }}
                                                onClick={handleSaveDescriptionButtonClick}
                                            >
                                                <FontAwesomeIcon icon={faCheck} size="xl" color="green" />
                                            </Button>
                                            <Button
                                                type="text"
                                                style={{ marginLeft: "10px" }}
                                                onClick={handleCancelDescriptionEditButtonClick}
                                            >
                                                <FontAwesomeIcon icon={faXmark} size="xl" color="red" />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            type="text"
                                            style={{ marginLeft: "10px" }}
                                            onClick={handleEditDescriptionButtonClick}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                                        </Button>
                                    )}
                                </>
                            )}

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <h3>Clinical Feedback</h3>
                                {getRole() === "clinician" && (
                                    <div>
                                        <Input.TextArea
                                            placeholder="Enter your feedback"
                                            rows={1}
                                            onChange={handleFeedbackInputChange}
                                            autoSize
                                        />
                                        <Button style={{ marginTop: "10px" }} onClick={handleSubmitFeedback} type="primary">
                                            Submit Feedback
                                        </Button>
                                    </div>
                                )}
                                <List
                                    pagination={{
                                        hideOnSinglePage: true,
                                        pageSize: 3,
                                        position: "top",
                                    }}
                                    dataSource={feedback}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                                    />
                                                }
                                                title={item.clinician_name}
                                                description={item.feedback}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageDetails;
