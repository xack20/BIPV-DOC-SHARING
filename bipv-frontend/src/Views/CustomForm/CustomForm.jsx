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

import {
  addNewAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../../Services/Service";

import "./CustomForm.css";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const CustomForm = (props) => {

    const formRef = React.createRef();
//   const onFinish = async (values) => {
//     console.log(state["opt"]);

//     if (state["opt"] === "create") {
//       setLoading(true);
//       try {
//         console.log(state["user"]);
//         values["userName"] = state["user"];
//         const data = await addNewAsset(values);

//         if (typeof data.data.additionalPayload === "string") {
//           notification.error({
//             message: "Error",
//             description: data.data.additionalPayload,
//             placement: "bottomRight",
//           });
//           setLoading(false);
//         } else {
//           setAssets((ASSET) => data.data.additionalPayload);
//           formRef.current.resetFields();
//           setLoading(false);

//           notification.success({
//             message: "Success",
//             description: "Successfully added asset",
//             placement: "bottomRight",
//           });
//         }
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: error.message,
//           placement: "bottomRight",
//         });
//       }
//     } else if (state["opt"] === "update") {
//       setLoading(true);
//       try {
//         console.log(state["user"]);
//         values["userName"] = state["user"];
//         const data = await updateAsset(values);

//         if (typeof data.data.additionalPayload === "string") {
//           notification.error({
//             message: "Error",
//             description: data.data.additionalPayload,
//             placement: "bottomRight",
//           });
//           setLoading(false);
//         } else {
//           setAssets((ASSET) => data.data.additionalPayload);
//           formRef.current.resetFields();
//           setLoading(false);

//           notification.success({
//             message: "Success",
//             description: "Asset Update Successful",
//             placement: "bottomRight",
//           });
//         }
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: error.message,
//           placement: "bottomRight",
//         });
//       }
//     } else if (state["opt"] === "delete") {
//       setLoading(true);
//       try {
//         console.log(state["user"]);
//         values["userName"] = state["user"];
//         const data = await deleteAsset(values);

//         if (typeof data.data.additionalPayload === "string") {
//           notification.error({
//             message: "Error",
//             description: data.data.additionalPayload,
//             placement: "bottomRight",
//           });
//           setLoading(false);
//         } else {
//           setAssets((ASSET) => data.data.additionalPayload);
//           formRef.current.resetFields();
//           setLoading(false);

//           notification.success({
//             message: "Success",
//             description: "Asset Successfully Deleted!",
//             placement: "bottomRight",
//           });
//         }
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: error.message,
//           placement: "bottomRight",
//         });
//       }
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
const formFields = [
  "documentLink",
  "documentType",
  "dateReceived",
  "projectStage",
  "documentSize",
  "sentBy",
  "receivedBy",
  "mainContent",
];

  return (
    <Form
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
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      autoComplete="off"
      ref={formRef}
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
