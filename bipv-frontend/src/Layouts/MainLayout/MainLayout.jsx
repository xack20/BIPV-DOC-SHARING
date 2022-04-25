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
import AllAsset from "../../Views/AllData/AllAsset";


const { Header, Content, Footer } = Layout;
const { Option } = Select;



const MainLayout = (props) => {
  
  const [btn, setBtn] = useState(1);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={"key1"}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu> */}
        <Button style={{float: "right", marginTop : "1%" }}>
          <Link to="/login">Logout</Link>
        </Button>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        {/* <div className="options">
          <Button onClick={()=>{setBtn(1)}}>All Data</Button>
          <Button onClick={()=>{setBtn(2)}}>Create Asset</Button>
          <Button onClick={()=>{setBtn(3)}}>Transfer Asset</Button>
        </div> */}

        <div className="content">
          {btn === 1 ? <AllAsset/> : null}
          {/* {btn === 2 ? <CreateAsset /> : null}
          {btn === 3 ? <TransferAsset /> : null} */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        BIPV-Document-Sharing ©2022 Created by BIPV
      </Footer>
    </Layout>
  );
};

export default MainLayout;
