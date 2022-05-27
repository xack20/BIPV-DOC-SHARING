import React, { useState, useEffect } from "react";
import { Table,Spin,notification } from "antd";

import {
  getAllAssets,
} from "../../../Services/Service";

const AllAssetTable = (props) => {
  
    const [loading, setLoading] = useState(false);
    const [assets, setAssets] = useState([]);

    const [state] = useState({
      user: JSON.parse(localStorage.getItem("user")).username,
      peer: "peer0",
      org: JSON.parse(localStorage.getItem("user")).organization,
      channel: localStorage.getItem("channel"),
      chaincode: localStorage.getItem("chaincode"),
    });


    useEffect(() => {
      setLoading(true);
      const getData = async () => {
        try {
          const data = await getAllAssets({ userName: state.user, ...state });
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
    }, [state]);
  
    const columnsArray = [
      "documentNo",
      "mainContent",
      "documentLink",
      "projectStage",
      "documentType",
      "documentSize",
      "sentBy",
      "receivedBy",
      "dateReceived",
      "lastModification",
      "transferMessage"
    ];

  const columns = columnsArray.map((column, index) => {
    return {
      title: (
        <h3>
          {column.charAt(0).toUpperCase() +
            column.replace(/([A-Z])/g, " $1").slice(1)}
        </h3>
      ),
      dataIndex: column,
      key: index,
      render : (text, record) => {
        if(column === "documentLink"){
          return (
            <a href={"https://" + text} target="_blank" rel="noreferrer">
              {text}
            </a>
          );
        }
        else return text;
      }
    };
  });

  

  return (
    <Spin
      spinning={loading}
      size="large"
      tip="loading..."
      style={{ marginTop: "10%", zIndex: "9999" }}
    >
      <Table bordered pagination={false} columns={columns} dataSource={assets} />
    </Spin>
  );
};

export default AllAssetTable;
