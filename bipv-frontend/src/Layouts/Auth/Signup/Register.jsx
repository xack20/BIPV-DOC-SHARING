import React from "react";
import { useNavigate } from "react-router-dom";


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

import {
  // EyeInvisibleOutlined,
  // EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import { addUser, checkUser } from "../../../Services/Service";
import "./Register.css";

const { Option } = Select;

const Register = (props) => {
  //history
  const history = useNavigate();

  // const [channel , setChannel] = React.useState("channel1");

  // const ORGS = {
  //   org1: "Taizhou Haineng New Energy Group Co. Ltd.",
  //   org2: "Fanzai (Design consultant)",
  //   org3: "Jiangsu Haichi Construction Co., Ltd. (Contractor)",
  //   org4: "PV Storage System Suppliers Company (PV Storage System Suppliers)",
  //   org5: "FM Company (Facilities Manager)",
  // };

  // const orgs = {
  //   "channel1": [
  //     {
  //       value: "org1",
  //       label: "Org1",
  //     },
  //     {
  //       value: "org2",
  //       label: "Org2",
  //     },
  //   ],
  //   "channel2": [
  //     {
  //       value: "org1",
  //       label: "Org1",
  //     },
  //     {
  //       value: "org2",
  //       label: "Org2",
  //     },
  //     {
  //       value: "org3",
  //       label: "Org3",
  //     }
  //   ],
  //   "channel3": [
  //     {
  //       value: "org2",
  //       label: "Org2",
  //     },
  //     {
  //       value: "org4",
  //       label: "Org4",
  //     },
  //   ],
  //   "channel4": [
  //     {
  //       value: "org1",
  //       label: "Org1",
  //     },
  //     {
  //       value: "org5",
  //       label: "Org5",
  //     }
  //   ]
  // }

  const chan = {
    org1: ["channel1", "channel2", "channel4"],
    org2: ["channel1", "channel2", "channel3"],
    org3: ["channel2"],
    org4: ["channel3"],
    org5: ["channel4"],
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const { username, password ,organization} = values;

    const channel = chan[organization]

    console.log("channel: ", channel);

    const org =
      ((values.organization === "org4" || values.organization === "org5")
        ? (values.organization === "org4"
          ? "org1"
          : "org2")
        : values.organization);


    const usrArray = await checkUser({username});

    console.log(usrArray.data.length);

    if (usrArray.data.length !== 0) {
      notification.error({
        message: "Error",
        description: "Username already exists",
        placement: "bottomRight",
      });
      return;
    }


    const res = await addUser({ username, password, organization, channel, org });

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
          allowClear
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
          allowClear
          // iconRender={(visible) =>
          //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          // }
        />
      </Form.Item>
      <Form.Item>
        {/* <Form.Item
          name="channel"
          rules={[
            {
              required: true,
              message: "Please Select an Channel!",
            },
          ]}
        >
          <Select
            // defaultValue="org2"
            style={{ width: "100%" }}
            placeholder="Select Channel"
            onChange={(value) => {
              setChannel(value);
            }}
          >
            <Option value="channel1">Channel 1</Option>
            <Option value="channel2">Channel 2</Option>
            <Option value="channel3">Channel 3</Option>
            <Option value="channel4">Channel 4</Option>
          </Select>
        </Form.Item> */}

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
            placeholder="Select Organization"
          >
            {/* {orgs[channel].map((org) => {
              return <Option value={org.value}>{ORGS[org.value]}</Option>;
            })} */}
            <Option value="org1">
              Taizhou Haineng New Energy Group Co. Ltd.
            </Option>
            <Option value="org2">FanPower (Design consultant)</Option>
            <Option value="org3">
              Jiangsu Haichi Construction Co., Ltd. (Contractor)
            </Option>
            <Option value="org4">
              PV Storage System Suppliers Company (PV Storage System
              Suppliers)
            </Option>
            <Option value="org5">FM Company (Facilities Manager)</Option>
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
