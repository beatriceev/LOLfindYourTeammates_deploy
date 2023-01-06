import React from "react";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Space, Modal } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import axios from "../api";
import { useHook } from "../hooks/useHook";

function Login({ onLogin }) {
  const LOCALSTORAGE_KEY_USERNAME = "saved-username";
  const LOCALSTORAGE_KEY_PASSWORD = "saved-password";

  const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY_USERNAME);
  const savedPassword = localStorage.getItem(LOCALSTORAGE_KEY_PASSWORD);
  const {
    rememberMe,
    setRememberMe,
    username,
    setUsername,
    password,
    setPassword,
  } = useHook();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    localStorage.setItem("username", values.username);
    console.log("Success:", values.username);
    if (rememberMe) {
      localStorage.setItem(LOCALSTORAGE_KEY_USERNAME, username);
      localStorage.setItem(LOCALSTORAGE_KEY_PASSWORD, password);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY_USERNAME, "");
      localStorage.setItem(LOCALSTORAGE_KEY_PASSWORD, "");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleCheckbox = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleUserLogin = async () => {
    const {
      data: { message, status },
    } = await axios.get("/userLogin", {
      params: {
        username: savedUsername || username,
        password: savedPassword || password,
      },
    });

    console.log(message, status);
    if (status === "Error") {
      Modal.error({
        title: "This is an error message!",
        content: message,
      });
    } else {
      localStorage.setItem("authentication", true);
      navigate(`/search`);
      window.location.reload();
    }
  };

  return (
    <div className="Image-Background">
      {/* <h1 className="Reg-Text"> Create Account </h1> */}
      {/* <div className="header"></div> */}
      <div className="Form-Container">
        <div className="Form-Background">
          <h1 className="Form-Header"> Log in </h1>
          <Form
            className="Forms-Frame"
            name="basic"
            form={form}
            // wrapperCol={{
            //   span: 16,
            // }}
            initialValues={{
              remember: rememberMe,
              username: savedUsername,
              password: savedPassword,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="Form-Frame"
              name="username"
              label={<h2 className="Form-Name">Username</h2>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="Form-Box"
                // prefix={<UserOutlined className="site-form-item-icon" />}
                // placeholder="Username"
                // size="large"
                onChange={handleChange(setUsername)}
              />
            </Form.Item>
            <Form.Item
              className="Form-Frame"
              name="password"
              label={<h2 className="Form-Name">Password</h2>}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="Form-Box"
                // prefix={<LockOutlined className="site-form-item-icon" />}
                // type="password"
                // placeholder="Password"
                // size="large"
                onChange={handleChange(setPassword)}
              />
            </Form.Item>
            <Form.Item className="Footer-Form-Frame">
              {/* <Space direction="horizontal" size={100}> */}
              <Form.Item
                className="Footer-Form"
                name="remember"
                valuePropName="checked"
                // nostyle="true"
              >
                <Checkbox
                  className="Form-Footer-Name"
                  checked={rememberMe}
                  onChange={handleCheckbox}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <MyLinks to="/register" className="Form-Footer-Name-2">
                  Don't have an account? Create account here!
                </MyLinks>
              </Form.Item>
            </Form.Item>
            <Form.Item
              className="Button"
              // wrapperCol={{
              //   offset: 10,
              //   span: 20,
              // }}
            >
              <Button
                className="Button-Color"
                type="primary"
                block
                htmlType="submit"
                size="large"
                // style={{ background: "#5A3E1E" }}
                onClick={handleUserLogin}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <div className="Footer"></div> */}
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

export default Login;
