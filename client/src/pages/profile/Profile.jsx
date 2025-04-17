import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const Profile = () => {
  const handleProfileUpdate = () => {};

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
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
        >
          <Form.Item name={"name"} label="Name" className="w-full lg:col-span-2">
            <Input placeholder="Please enter your full name" />
          </Form.Item>
          <Form.Item name={"email"} label="Email" className="w-full lg:col-span-2">
            <Input placeholder="Please your Email" />
          </Form.Item>
          <Form.Item name={"something"} label="Need to set" className="w-full lg:col-span-2">
            <Input placeholder="This input need to add" />
          </Form.Item>
          <Form.Item name={"address"} label="Address" className="w-full lg:col-span-2">
            <Input placeholder="Please enter your address" />
          </Form.Item>

          <Form.Item name={"gender"} label="Gender" className="w-full lg:col-span-2">
            <Input />
          </Form.Item>

          <Form.Item name={"photoURL"} label="Image" className="lg:col-span-2">
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
