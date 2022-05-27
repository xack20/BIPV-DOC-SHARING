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
  Select,
  // Spin,
  // notification,
  Col,
  Row,
} from "antd";
  
import {Link} from 'react-router-dom'
// import { useNavigate } from "react-router-dom";



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
const { Option } = Select;



const MainLayout = (props) => {
  
  const [btn, setBtn] = useState(0);
  const [modVisibility, setModVisibility] = useState(false);
  const [check, setCheck] = useState(0);
  // const navigate = useNavigate();

  const chan = {
    org1: ["channel1", "channel2", "channel4"],
    org2: ["channel1", "channel2", "channel3"],
    org3: ["channel2"],
    org4: ["channel3"],
    org5: ["channel4"],
  };

  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")).username,
    peer: "peer0",
    org: JSON.parse(localStorage.getItem("user")).org,
    organization: JSON.parse(localStorage.getItem("user")).organization,
    channel: localStorage.getItem("channel"),
  });

  const userInfo = () =>{
      setCheck(0);
      setModVisibility(true);
  }

  const listView = ()=>{
    setBtn((btn+1)%2);
  }

  const switchChannel = () => {
    setCheck(1);
    setModVisibility(true);
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
        <Button
          style={{ float: "right", marginTop: "1%", marginLeft: "10px" }}
          onClick={userInfo}
        >
          Info
        </Button>
        <Button
          style={{ float: "right", marginTop: "1%" }}
          onClick={switchChannel}
        >
          Switch Channel
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
          Title={check === 0 ? "Info" : "Change Channel"}
          style={{ justifyItems: "center" }}
          modalVisibility={modVisibility}
          setModalVisibility={setModVisibility}
        >
          {check === 0 ? (
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
                    {state.organization === "org1" &&
                      "Taizhou Haineng New Energy Group Co. Ltd."}
                    {state.organization === "org2" &&
                      "Fanzai (Design consultant)"}
                    {state.organization === "org3" &&
                      "Jiangsu Haichi Construction Co., Ltd. (Contractor)"}
                    {state.organization === "org4" &&
                      "PV Storage System Suppliers Company (PV Storage System Suppliers)"}
                    {state.organization === "org5" &&
                      "FM Company (Facilities Manager)"}
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="site-card-wrapper-2">
              <Select
                // defaultValue="org2"
                style={{ width: "100%" }}
                placeholder="Select Channel"
                onChange={(value) => {
                  setState({ ...state, channel: value });
                  localStorage.setItem("channel", value);
                  localStorage.setItem("chaincode", "basic-" + value);
                  // navigate("/home");
                  window.location.reload();
                  // setBtn(btn);
                }}
              >
                {chan[state.organization].map((chn) => {
                  return <Option value={chn}>{chn+" "+ (chn === state.channel ? "(Using)" : "") }</Option>;
                })}
              </Select>
            </div>
          )}
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
