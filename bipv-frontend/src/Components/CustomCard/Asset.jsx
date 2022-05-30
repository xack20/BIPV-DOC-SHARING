import React, { useState } from "react";
import { Card, Avatar, notification } from "antd";
import {
  // EditOutlined,
  DeleteOutlined,
  InteractionOutlined,
  FilePdfTwoTone,
} from "@ant-design/icons";
import { useEffect } from "react";
import PopConfirm from "../PopConfirm/PopConfirm.jsx";
import { addDeletedAsset, deleteAsset } from "../../Services/Service.js";

const { Meta } = Card;

const Asset = (props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user")).username);
  }, []);

  const assetTransfer = () => {
    props.setModalVisibility(true);
    props.setModVisibility(false);
    props.setAssetID(props.idx);
  };

  const assetDelete = async () => {
    props.setModVisibility(false);
    try {
      props.setLoading(true);
      await addDeletedAsset({
        userName,
        documentNo: props.data.documentNo,
        org: JSON.parse(localStorage.getItem("user")).org,
        orgainization: JSON.parse(localStorage.getItem("user")).orgainization,
        channel: localStorage.getItem("channel"),
        chaincode: localStorage.getItem("chaincode"),
        timeOfDeletion: new Date().toISOString(),
      });
      const data = await deleteAsset({
        userName,
        documentNo: props.data.documentNo,
        org: JSON.parse(localStorage.getItem("user")).org,
        orgainization: JSON.parse(localStorage.getItem("user")).orgainization,
        channel: localStorage.getItem("channel"),
        chaincode: localStorage.getItem("chaincode"),
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
        width: 350,
        maxHeight: 300,
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
        props.data.receivedBy === userName &&
        !props.isDeletedAsset && [
          <PopConfirm
            title="Confirm Transfer?"
            onConfirm={() => {
              assetTransfer();
            }}
          >
            <InteractionOutlined key="transfer" style={{ fontSize: "150%" }} />
          </PopConfirm>,

          <PopConfirm
            title="Confirm Delete?"
            onConfirm={() => {
              props.setModVisibility(false);
              assetDelete();
            }}
          >
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
        title={"Document no : " + props.data.documentNo}
        description={
          props.isDeletedAsset ? (
            <div>
              {"Deleted By : " + props.data.receivedBy} <br /> 
              {"Date of Deletion : " + props.data.timeOfDeletion}
            </div>
          ) : (
            "LastModification : " + props.data.lastModification
          )
        }
        onClick={() => {
          props.viewAsset(props.idx);
        }}
      />
    </Card>
  );
};

export default Asset;
