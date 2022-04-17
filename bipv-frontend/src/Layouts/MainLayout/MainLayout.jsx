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

import {Link} from 'react-router-dom'




import {
  addNewAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../../Services/Service";



import "./MainLayout.css";


const { Header, Content, Footer } = Layout;
const { Option } = Select;



const Body = (props) => {
  

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={"key1"}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <div className="options">
          <Button>All Data</Button>
          <Button>Create Asset</Button>
          <Button>Transfer Asset</Button>
        </div>

        <div className="content">

        </div>

      </Content>
      <Footer style={{ textAlign: "center" }}>
        BIPV-Document-Sharing ©2022 Created by BIPV
      </Footer>
    </Layout>
  );
};

export default Body;
