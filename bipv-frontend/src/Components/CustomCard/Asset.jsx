import React, {useState} from 'react'
import { Card, Avatar} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InteractionOutlined,
  FilePdfTwoTone,
} from "@ant-design/icons";
import { useEffect } from 'react';
import PopConfirm from '../PopConfirm/PopConfirm.jsx';

const { Meta } = Card;



const Asset = (props) => {

  const [userName , setUserName] = useState("");

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user")).username);
  }, [])


  const assetTransfer = () => {
    props.setModalVisibility(true)
    props.setAssetID(props.idx)
  }

  return (
    <Card
      style={{
        width: 300,
        maxHeight: 235,
        borderColor: props.idx & 1 ? "#531dab" : "#7cb305",
        borderRadius: " 10px",
      }}
      cover={
        // <img
        //   alt="example"
        //   src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // />
        <FilePdfTwoTone style={{ fontSize: "400%", marginTop: "5%" }} />
      }
      actions={
        props.data.receivedBy === userName && [
          <InteractionOutlined
            key="transfer"
            style={{ fontSize: "150%" }}
            onClick={assetTransfer}
          />,
          <EditOutlined key="update" style={{ fontSize: "150%" }} />,
          <PopConfirm title="Confirm Delete?">
            <DeleteOutlined key="delete" style={{ fontSize: "150%" }} />
          </PopConfirm>,
        ]
      }
    >
      <Meta
        avatar={
          <Avatar
            src={"https://joeschmoe.io/api/v1/" + props.data.receivedBy}
          />
        }
        title={props.data.receivedBy}
        description={props.data.mainContent}
      />
    </Card>
  );  
};

export default Asset;
