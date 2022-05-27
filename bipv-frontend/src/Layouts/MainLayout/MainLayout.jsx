import React, { useState } from "react";
import {
  Layout,
  // Menu,
  Breadcrumb,
  // Space,
  // Form,
  // Input,
  Button,
  Card,
  // Empty,
  // Select,
  // Spin,
  // notification,
  Col,
  Row,
} from "antd";

import {Link} from 'react-router-dom'




// import {
//   addNewAsset,
//   deleteAsset,
//   getAllAssets,
//   updateAsset,
// } from "../../Services/Service";



import "./MainLayout.css";
import AllAsset from "../../Views/AllData/AllAsset";
// import AllAssetList from "../../Views/AllData/AllAssetList";
import AllAssetTable from "../../Views/AllData/Table/AllAssetTable";

import MyModal from "../../Components/MyModal/MyModal.jsx";
// import Asset from "../../Components/CustomCard/Asset";


const { Header, Content, Footer } = Layout;
// const { Option } = Select;



const MainLayout = (props) => {
  
  const [btn, setBtn] = useState(0);
  const [modVisibility, setModVisibility] = useState(false);

  const [state] = useState({
    user: JSON.parse(localStorage.getItem("user")).username,
    peer: "peer0",
    org: JSON.parse(localStorage.getItem("user")).org,
    organization: JSON.parse(localStorage.getItem("user")).organization,
    channel: JSON.parse(localStorage.getItem("user")).channel,
  });

  const userInfo = () =>{
      setModVisibility(true);
  }

  const listView = ()=>{
    setBtn((btn+1)%2);
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={"key1"}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu> */}
        <Button style={{ float: "left", marginTop: "1%" }} onClick={listView}>
          {btn === 0 ? "Table View" : "Card View"}
        </Button>

        <Button style={{ float: "right", marginTop: "1%", marginLeft: "10px" }}>
          <Link to="/login">Logout</Link>
        </Button>
        <Button style={{ float: "right", marginTop: "1%" }} onClick={userInfo}>
          Info
        </Button>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <MyModal
          Width={700}
          Title={"Info"}
          style={{ justifyItems: "center" }}
          modalVisibility={modVisibility}
          setModalVisibility={setModVisibility}
        >
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="User Name" bordered={false}>
                  {state.user}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Channel Name" bordered={false}>
                  {state.channel}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Organization Name" bordered={false}>
                  {state.org === "org1" &&
                    state.channel === "channel1" &&
                    "Taizhou Haineng New Energy Group Co. Ltd."}
                  {state.org === "org2" &&
                    state.channel === "channel1" &&
                    "Fanzai (Design consultant)"}
                  {state.org === "org2" &&
                    state.channel === "channel2" &&
                    "Fanzai (Design consultant)"}
                  {state.org === "org1" &&
                    state.channel === "channel2" &&
                    "Jiangsu Haichi Construction Co., Ltd."}
                </Card>
              </Col>
            </Row>
          </div>
        </MyModal>

        {/* <div className="options">
          <Button onClick={()=>{setBtn(1)}}>All Data</Button>
          <Button onClick={()=>{setBtn(2)}}>Create Asset</Button>
          <Button onClick={()=>{setBtn(3)}}>Transfer Asset</Button>
        </div> */}

        <div className="content">
          {btn + 1 === 1 ? <AllAsset /> : <AllAssetTable />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        BIPV-Document-Sharing ©2022 Created by BIPV
      </Footer>
    </Layout>
  );
};

export default MainLayout;
