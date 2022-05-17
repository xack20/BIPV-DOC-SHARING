import React from "react";
import {useNavigate} from 'react-router-dom'

import {
  // Layout,
  // Menu,
  // Breadcrumb,
  // Space,
  Form,
  Input,
  Button,
  // Empty,
  Select,
  // Spin,
  notification,
} from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { addUser } from "../../../Services/Service";

import "./Register.css";

const { Option } = Select;

const Register = (props) => {
    //history
    const history = useNavigate();

    const onFinish = async(values) => {
      console.log("Received values of form: ", values);

      const { username, password } = values;
      const organization =
        values.organization !== "org3" && values.organization !== "org4"
          ? values.organization
          : ((values.organization === "org4") ? "org2" : "org1");

      const channel =
        values.organization !== "org3" && values.organization !== "org4"
          ? "channel1"
          : "channel2" ;

      const res = await addUser({ username, password, organization, channel });

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
              Taizhou Haineng New Energy Group Co. Ltd.(Channel 1)
            </Option>
            <Option value="org2">Fanzai (Design consultant)(Channel 1)</Option>
            <Option value="org3"> Fanzai (Design consultant)(Channel 2)</Option>
            <Option value="org4">
              Jiangsu Haichi Construction Co., Ltd. (Contractor)(Channel 2)
            </Option>
          </Select>
        </Form.Item>

        <Link className="login-form-forgot" to="#">
          Forgot password
        </Link>
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
