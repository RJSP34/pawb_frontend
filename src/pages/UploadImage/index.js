import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Select, Upload, message, notification } from "antd";
import { getBodyParts } from "../../services/body_parts";
import { uploadImagePost } from "../../services/images";
import { useNavigate } from "react-router-dom";

const UploadImage = () => {
    const navigate = useNavigate();
    const { TextArea } = Input;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBodyParts = async () => {
            try {
                const bodyPartsRes = await getBodyParts();
                setBodyParts(bodyPartsRes.data.body_parts);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBodyParts();
    }, []);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const beforeUpload = (file) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`${file.name} is not a png, jpeg, or webp file`);
        }
        return isAllowedType || Upload.LIST_IGNORE;
    };

    const asyncRequest = async ({ _, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleSubmit = async (values) => {
        try {
            let valuesJson = {
                ...values,
                image: {
                    mime: values.image[0].type,
                    data: values.image[0].thumbUrl.split(",")[1],
                },
            };
            const response = await uploadImagePost(valuesJson);
            if (response.status !== 201) {
                throw new Error("Failed to upload image");
            }
            notification.success({ message: "Image uploaded successfully" });
            navigate("/app/user/myimages");
        } catch (err) {
            console.error(err);
            notification.error({ message: err.message });
            setError(err.response.data.error || "An unknown error occurred.");
        }
    };

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="body_part_id"
                    label="Body part"
                    rules={[
                        {
                            required: true,
                            message: "You must choose a body part",
                        },
                    ]}
                >
                    <Select allowClear>
                        {bodyParts &&
                            bodyParts.map((bodyPart) => (
                                <Select.Option key={bodyPart.id} value={bodyPart.id}>
                                    {bodyPart.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: "You must include a description",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    required
                    rules={[
                        {
                            validator: () => {
                                const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
                                const isAllowedType = fileList.some((file) => allowedTypes.includes(file.type));
                                if (!isAllowedType) {
                                    return Promise.reject("You must upload a png, jpeg, or webp file");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        customRequest={asyncRequest}
                    >
                        {fileList.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload an image
                                </div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
                {error && <div style={{ color: "red" }}>{error}</div>}
            </Form>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default UploadImage;
