import React, { useState, useEffect } from "react";
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

import { addNewAsset } from "../../Services/Service";

import "./CustomForm.css";

const CustomForm = (props) => {
  const [form] = Form.useForm();
  const formFields = [
    "documentLink",
    "documentType",
    "projectStage",
    "documentSize",
    "mainContent",
  ];

  const onFinish = async (values) => {
    props.setLoading(true);
    try {
      //   console.log(state["user"]);
      values["userName"] = props.user;
      values["org"] = props.org;
      const data = await addNewAsset(values);

      props.setAssets([...props.assets, data.data.additionalPayload]);

      if (typeof data.data.additionalPayload === "string") {
        notification.error({
          message: "Error",
          description: data.data.additionalPayload,
          placement: "bottomRight",
        });
        props.setLoading(false);
      } else {
        notification.success({
          message: "Success",
          description: "Successfully added asset",
          placement: "bottomRight",
        });

        form.resetFields();
        props.setLoading(false);
        props.setModVisibility(false);
        // window.location.reload();
      }
    } catch (error) {
      props.setLoading(false);
      props.setModVisibility(false);
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        marginLeft: "25%",
      }}
    >
      <Form.Item
        name="documentNo"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Document Number" />
      </Form.Item>

      {props.params !== "Delete" &&
        formFields.map((item, index) => {
          return (
            <Form.Item
              key={index}
              name={item}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder={item} />
            </Form.Item>
          );
        })}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {props.params}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
