import React from "react";
import "../styles/Register.css";
import { useState } from "react";
import { Button, Form, Input, Space, Modal, Checkbox } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import axios from "../api";

function Register() {
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values.username);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleNewUser = async () => {
    console.log("register", username, password, password2);
    const {
      data: { message, status },
    } = await axios.post("/newUser", {
      username,
      password,
      password2,
    });

    console.log(message, status);
    if (status === "Error") {
      Modal.error({
        title: "This is an error message!",
        content: message,
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Reg-Image-Background">
      {/* <h1 className="Reg-Reg-Text"> Create Account </h1> */}
      <div className="Reg-header"></div>
      <div className="Reg-Form-Container">
        <div className="Reg-Form-Background">
          <h1 className="Reg-Form-Header"> Register </h1>
          <Form
            className="Reg-Forms-Frame"
            name="basic"
            form={form}
            // wrapperCol={{
            //   span: 16,
            // }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="Reg-Form-Frame"
              name="username"
              label={<h2 className="Reg-Form-Name">Username</h2>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="Reg-Form-Box"
                // prefix={<UserOutlined className="Reg-site-form-item-icon" />}
                // placeholder="Username"
                // size="large"
                onChange={handleChange(setUsername)}
              />
            </Form.Item>
            <Form.Item
              className="Reg-Form-Frame"
              name="password"
              label={<h2 className="Reg-Form-Name">Password</h2>}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="Reg-Form-Box"
                type="password"
                // prefix={<LockOutlined className="Reg-site-form-item-icon" />}
                // placeholder="Password"
                // size="large"
                onChange={handleChange(setPassword)}
              />
            </Form.Item>
            <Form.Item
              className="Reg-Form-Frame"
              name="password2"
              label={<h2 className="Reg-Form-Name">Confirm Password</h2>}
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Please re-input your password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Please make sure your passwords match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="Reg-Form-Box"
                type="password"
                // prefix={<LockOutlined className="Reg-site-form-item-icon" />}
                // placeholder="Confirm password"
                // size="large"
                onChange={handleChange(setPassword2)}
              />
            </Form.Item>
            <Form.Item className="Reg-Footer-Form-Frame">
              <Space direction="vertical" size={1}>
                <MyLinks to="/login" className="Reg-Form-Footer-Name-2">
                  Already have an account? Sign in here!
                </MyLinks>
                <Form.Item style={{ display: "inline" }}></Form.Item>
              </Space>
            </Form.Item>

            <Form.Item
              className="Reg-Button"
              // wrapperCol={{
              //   offset: 10,
              //   span: 20,
              // }}
            >
              <Button
                className="Reg-Button-Color"
                type="primary"
                block
                htmlType="submit"
                size="large"
                // style={{ background: "#5A3E1E" }}
                onClick={handleNewUser}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="Reg-footer"></div>
    </div>
  );
}

function MyLinks({ to, className, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

export default Register;
