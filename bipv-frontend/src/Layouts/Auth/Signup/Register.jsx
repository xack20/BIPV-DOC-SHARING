import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

import {
  Layout,
  Menu,
  Breadcrumb,
  Space,
  Form,
  Input,
  Button,
  Empty,
  Select,
  Spin,
  notification,
} from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { addUser, registerUser } from "../../../Services/Service";

import "./Register.css";

const { Option } = Select;

const Register = (props) => {
    //history
    const history = useNavigate();

    const onFinish = async(values) => {
      console.log("Received values of form: ", values);

      const { username, password, organization } = values;

      const res = await addUser({ username, password, organization });

      if (res.status === 201) {
        notification.success({
          message: "Success",
          description: "User added successfully",
          placement: "bottomRight",
        });
        history("/login");
      } else {
        notification.error({
          message: "Error",
          description: "User not added",
          placement: "bottomRight",
        });
      }
    };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="organization"
          rules={[
            {
              required: true,
              message: "Please Select and Org!",
            },
          ]}
        >
          <Select
            // defaultValue="org2"
            style={{ width: "100%" }}
            placeholder="Select Org"
          >
            <Option value="org1">
              Taizhou Haineng New Energy Group Co., Ltd.
            </Option>
            <Option value="org2">Fanzai</Option>
          </Select>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or <Link to="/login">Login Now</Link>
      </Form.Item>
    </Form>
  );
};

export default Register;
