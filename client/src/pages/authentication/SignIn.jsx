import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setLoading, userSignIn } from "../../redux/authSlice";

const SignIn = () => {
  const [errorMsg, setErrorMSg] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setErrorMSg("");
      dispatch(setLoading(true));
      const result = await userSignIn(values.email, values.password);

      if (result.user) {
        navigate("/");
      }
    } catch (error) {
      setErrorMSg(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="max-w-xl border border-black mx-auto">
        <p className="bg-black text-white text-center text-xl font-semibold py-2">
          Sign-in with email
        </p>

        <div className="flex  justify-center items-center px-4 my-4">
          <Form onFinish={onFinish} layout="vertical" className="w-full ">
            <Form.Item
              name={"email"}
              label="Email"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please Provide an email",
                },
              ]}
            >
              <Input placeholder="Please enter your email" ref={emailRef} />
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
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {errorMsg && (
              <Form.Item label={null}>
                <p className="text-xs text-red-600">{errorMsg}</p>
              </Form.Item>
            )}

            <Form.Item label={null}>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="w-full bg-primary"
              >
                Sign-in
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Link
                to={"/auth/sign-up"}
                style={{ color: "black", textDecoration: "underline" }}
              >
                New Here? Please Create an account.
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
