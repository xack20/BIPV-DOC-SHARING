import React from "react";
import {
  // Layout,
  // Menu,
  // Breadcrumb,
  // Space,
  Form,
  Input,
  Button,
  // Empty,
  // Select,
  // Spin,
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
    "transferMessage"
  ];

  const onFinish = async (values) => {
    props.setLoading(true);
    try {
      //   console.log(state["user"]);
      values["userName"] = props.user;
      values["org"] = props.org;
      values["channel"] = props.user_state.channel;
      values["chaincode"] = props.user_state.chaincode;
      
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
        {props.oprtn === 1 && <Input placeholder="Document Number" />}
      </Form.Item>

      {props.params !== "Delete" &&
        formFields.map((item, index) => {
          return (
            item !== "transferMessage" && (
              <Form.Item
                key={index}
                name={item}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {props.oprtn === 1 || props.editable ? (
                  <Input placeholder={item} />
                ) : (
                  <div style={{ display: "flex" }}>
                    <h3 style={{ marginRight: "10px", fontWeight: "bold" }}>
                      {item.charAt(0).toUpperCase() +
                        item.replace(/([A-Z])/g, " $1").slice(1) +
                        ":   "}
                    </h3>
                    {item === "documentLink" ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={"https://" + props.assets[props.assetID][item]}
                      >
                        {props.assets[props.assetID][item]}
                      </a>
                    ) : (
                      props.assets[props.assetID][item]
                    )}
                  </div>
                )}
              </Form.Item>
            )
          );
        })}

      <Form.Item>
        {(props.oprtn === 1 || props.editable) && (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {props.params}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
