import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [fileList, setFileList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleProfileUpdate = async (values) => {
    const { image, ...rest } = values;

    try {
      setBtnLoading(true);
      const res = await axios.patch(
        `/api/users/${user.userId}`,
        rest
      );

      if (!res.data.success) {
        throw new Error(res.message);
      }
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
      console.log(error)
    } finally {
      setBtnLoading(false);
    }
  };

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    fileList, // Use fileList state here
    onChange(info) {
      setFileList(info.fileList); // Update fileList state
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="bg-base-100 p-4 rounded-xs">
      <div className="border border-gray-300 p-4 rounded-xs">
        <p className="font-semibold mb-4">Account Information</p>
        <Form
          onFinish={handleProfileUpdate}
          layout="vertical"
          className="w-full grid lg:grid-cols-4 grid-cols-1 gap-4"
          initialValues={user}
        >
          <Form.Item
            name={"name"}
            label="Name"
            className="w-full lg:col-span-2"
          >
            <Input placeholder="Please enter your full name" />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            className="w-full lg:col-span-2"
          >
            <Input placeholder="Please your Email" />
          </Form.Item>
          <Form.Item label="Need to set" className="w-full lg:col-span-2">
            <Input placeholder="This input need to add" disabled />
          </Form.Item>
          <Form.Item
            name={"address"}
            label="Address"
            className="w-full lg:col-span-2"
          >
            <Input placeholder="Please enter your address" />
          </Form.Item>

          <Form.Item
            name={"gender"}
            label="Gender"
            className="w-full lg:col-span-2"
          >
            <Input />
          </Form.Item>

          <Form.Item name={"image"} label="Image" className="lg:col-span-2">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* {errorMsg && (
            <Form.Item label={null}>
              <p className="text-xs text-red-600">{errorMsg}</p>
            </Form.Item>
          )} */}

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary"
              loading={btnLoading}
              disabled={btnLoading}
            >
              Update Information
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
