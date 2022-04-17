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
import { Tab } from "@material-ui/core";

import {
  addNewAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../../Services/Service";

import "./Body.css";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const PrevBody = (props) => {
  const formRef = React.createRef();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    user: "User1",
    channel: "channel1",
    peer: "peer0",
    org: "org1",
    opt: "create",
  });

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

  const channelChange = (value) => {
    setState({ ...state, channel: value });
  };
  const userChange = (value) => {
    setState({ ...state, user: value });
  };

  const orgChange = (value) => {
    setState({ ...state, org: value });
  };
  const peerChange = (value) => {
    setState({ ...state, peer: value });
  };

  const chaincodeAction = (value) => {
    if (value === "create") setComp(post);
    if (value === "update") setComp(put);
    if (value === "delete") setComp(del);
    setState({ ...state, opt: value });
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const data = await getAllAssets(state.user);
        const assets = data.data.additionalPayload;
        setAssets((ASSET) => assets);
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Successfully retrieved assets",
          placement: "bottomRight",
        });
        setLoading(false);
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
      }
    };
    getData();
  }, [state.user]);

  const onFinish = async (values) => {
    console.log(state["opt"]);

    if (state["opt"] === "create") {
      setLoading(true);
      try {
        console.log(state["user"]);
        values["userName"] = state["user"];
        const data = await addNewAsset(values);

        if (typeof data.data.additionalPayload === "string") {
          notification.error({
            message: "Error",
            description: data.data.additionalPayload,
            placement: "bottomRight",
          });
          setLoading(false);
        } else {
          setAssets((ASSET) => data.data.additionalPayload);
          formRef.current.resetFields();
          setLoading(false);

          notification.success({
            message: "Success",
            description: "Successfully added asset",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
      }
    } else if (state["opt"] === "update") {
      setLoading(true);
      try {
        console.log(state["user"]);
        values["userName"] = state["user"];
        const data = await updateAsset(values);

        if (typeof data.data.additionalPayload === "string") {
          notification.error({
            message: "Error",
            description: data.data.additionalPayload,
            placement: "bottomRight",
          });
          setLoading(false);
        } else {
          setAssets((ASSET) => data.data.additionalPayload);
          formRef.current.resetFields();
          setLoading(false);

          notification.success({
            message: "Success",
            description: "Asset Update Successful",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
      }
    } else if (state["opt"] === "delete") {
      setLoading(true);
      try {
        console.log(state["user"]);
        values["userName"] = state["user"];
        const data = await deleteAsset(values);

        if (typeof data.data.additionalPayload === "string") {
          notification.error({
            message: "Error",
            description: data.data.additionalPayload,
            placement: "bottomRight",
          });
          setLoading(false);
        } else {
          setAssets((ASSET) => data.data.additionalPayload);
          formRef.current.resetFields();
          setLoading(false);

          notification.success({
            message: "Success",
            description: "Asset Successfully Deleted!",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createForm = (params) => {
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        {params !== "Delete" &&
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {params}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  let post = createForm("Create");
  let put = createForm("Update");
  let del = createForm("Delete");

  const [comp, setComp] = useState(post);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={"key1"}>Menu</Menu.Item>
        </Menu>
      </Header>
      <Spin
        spinning={loading}
        size="large"
        tip="loading..."
        style={{ marginTop: "10%" }}
      >
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            Select Channel Name : <Space />
            <Select
              defaultValue="channel1"
              style={{ width: 120 }}
              onChange={channelChange}
            >
              <Option value="channel1">channel1</Option>
              <Option value="channel2">channel2</Option>
              <Option value="channel3" disabled>
                channel3
              </Option>
            </Select>
            <Tab />
            Select an User : <Space />
            <Select
              defaultValue="User1"
              style={{ width: 120 }}
              onChange={userChange}
            >
              <Option value="Admin">Admin</Option>
              <Option value="User1">User1</Option>
              <Option value="User2">User2</Option>
            </Select>
            <Tab />
            Select an Org : <Space />
            <Select
              defaultValue="org1"
              style={{ width: 120 }}
              onChange={orgChange}
            >
              <Option value="org1">Org1</Option>
              <Option value="org2">Org2</Option>
              <Option value="org3" disabled>
                Org3
              </Option>
            </Select>
            <Tab />
            Select an Peer : <Space />
            <Select
              defaultValue="peer0"
              style={{ width: 120 }}
              onChange={peerChange}
            >
              <Option value="peer0">Peer0</Option>
              <Option value="peer1">Peer1</Option>
              <Option value="peer2" disabled>
                Peer2
              </Option>
            </Select>
          </div>

          <div className="site-layout-content-again">
            <div className="site-layout-content-inside">
              <div style={{ marginLeft: "30%" }}>
                Select an option : <Space />
                <Select
                  defaultValue="create"
                  style={{ width: 120 }}
                  onChange={chaincodeAction}
                >
                  <Option value="create">Create</Option>
                  <Option value="update">Update</Option>
                  <Option value="delete">Delete</Option>
                </Select>
              </div>
              <br />
              <br />
              <div style={{ marginLeft: "20%" }}>{comp}</div>
            </div>
            <div className="site-layout-content-inside">
              {" "}
              {assets.length ? (
                <pre className="language-bash">
                  {JSON.stringify(assets, null, 2)}
                </pre>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ marginTop: "20%" }}
                />
              )}
            </div>
          </div>
        </Content>
      </Spin>
      <Footer style={{ textAlign: "center" }}>
        BIPV-Document-Sharing ©2022 Created by BIPV
      </Footer>
    </Layout>
  );
};

export default PrevBody;
