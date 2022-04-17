import React from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./SignIn.css"
import { Link } from "react-router-dom";
import { enrollAdmin, getUser, registerUser } from "../../../Services/Service";

const SignIn = () => {
  
  const onFinish = async(values) => {
    console.log("Received values of form: ", values);
    
    const { username, organization } = values;
    
    const {data} = await getUser(values);
    if(data.length > 0){
      localStorage.setItem("user", JSON.stringify(data[0]));

      await enrollAdmin();
      await registerUser({"userName" : username, "org" : organization});
      
      window.location.href = "/home";
    }
    else{
      alert("Invalid Credentials");
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">Register Now</Link>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
