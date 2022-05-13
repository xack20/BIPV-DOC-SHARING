import React, { useState } from "react";
import { Card, Avatar,notification } from "antd";
import {
  // EditOutlined,
  DeleteOutlined,
  InteractionOutlined,
  FilePdfTwoTone,
} from "@ant-design/icons";
import { useEffect } from "react";
import PopConfirm from "../PopConfirm/PopConfirm.jsx";
import { deleteAsset } from "../../Services/Service.js";

const { Meta } = Card;

const Asset = (props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user")).username);
  }, []);

  const assetTransfer = () => {
    props.setModalVisibility(true);
    props.setAssetID(props.idx);
  };

  const assetDelete = async () => {
    try {
      props.setLoading(true);
      const data = await deleteAsset({
        userName,
        documentNo: props.data.documentNo,
        org: JSON.parse(localStorage.getItem("user")).organization,
        channel: JSON.parse(localStorage.getItem("user")).channel,
        chaincode: "basic-" + JSON.parse(localStorage.getItem("user")).channel,
      });
      props.setAssets(data.data.additionalPayload);
      notification.success({
        message: "Success",
        description: "Successfully deleted asset",
        placement: "bottomRight",
      });
      props.setLoading(false);
      // window.location.reload();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete asset",
        placement: "bottomRight",
      });
      props.setLoading(false);
    }

    
  };

  return (
    <Card
      hoverable
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
          // <EditOutlined key="update" style={{ fontSize: "150%" }} />,
          <PopConfirm title="Confirm Delete?" onConfirm={assetDelete}>
            <DeleteOutlined
              key="delete"
              // onClick={assetDelete}
              style={{ fontSize: "150%" }}
            />
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
