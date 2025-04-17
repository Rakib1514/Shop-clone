import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, userSignUp } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const SignUp = () => {
  const [errorMsg, setErrorMSg] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const firstNameRef = useRef(null);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setErrorMSg("");
      dispatch(setLoading(true));
      const { user } = await userSignUp(values.email, values.password);

      const newUser = {
        name: values.firstName + " " + values.lastName,
        userId: user?.uid,
        email: user?.email,
      };

      const res = await createUserToDB(newUser);

      if (!res.success) {
        throw new Error("User Creation at db failed");
      }

      alert("User created to db");

      navigate("/");
    } catch (error) {
      setErrorMSg(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createUserToDB = async (userInfo) => {
    try {
      const res = await axios.post("/api/users", userInfo);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="max-w-xl border border-black mx-auto">
        <p className="bg-black text-white text-center text-xl font-semibold py-2">
          Register with email
        </p>

        <div className="flex  justify-center items-center px-4 my-4">
          <Form
            onFinish={onFinish}
            // labelCol={{ span:  }}
            // wrapperCol={{ span: 14 }}
            layout="vertical"
            className="w-full "
          >
            <div className="flex gap-4">
              <Form.Item
                name={"firstName"}
                label="First Name"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name",
                  },
                ]}
              >
                <Input ref={firstNameRef} />
              </Form.Item>
              <Form.Item name={"lastName"} label="Last Name" className="w-full">
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name={"email"}
              label="Email"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please Provide an email",
                },
                {
                  type: "email",
                  message: "Please input a valid email",
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>

            <Form.Item
              name={"password"}
              label="Password"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
                {
                  max: 32,
                  message: "Password must be no more than 32 characters",
                },
                {
                  pattern: /[0-9]/,
                  message: "Password must include at least one number",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {errorMsg === "Firebase: Error (auth/email-already-in-use)." && (
              <Form.Item label={null}>
                <p className="text-xs text-red-600">
                  Email already Registered. Please Sign-in
                </p>
              </Form.Item>
            )}

            <Form.Item label={null}>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="w-full bg-primary"
              >
                Create Account
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Link
                to={"/auth/sign-in"}
                style={{ color: "black", textDecoration: "underline" }}
              >
                Already Have an account? Sign-in here
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
