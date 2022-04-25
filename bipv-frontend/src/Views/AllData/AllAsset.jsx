import React, { useState, useEffect } from "react";
import Asset from '../../Components/CustomCard/Asset';
import { Affix, Button, Tooltip, notification, Spin, Empty } from "antd";
import './AllAsset.css';

import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  addNewAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../../Services/Service";

const AllAsset = (props) => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
      user: JSON.parse(localStorage.getItem("user")).username ,
      channel: "channel1",
      peer: "peer0",
      org: JSON.parse(localStorage.getItem("user")).organization,
      opt: "create",
    });

    const addAsset = () => {
        setAssets([...assets, 0]);
    };



    useEffect(() => {
      setLoading(true);
      const getData = async () => {
        try {
          const data = await getAllAssets({userName : state.user, ...state});
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

    return (
      <Spin
        spinning={loading}
        size="large"
        tip="loading..."
        style={{ marginTop: "10%" }}
      >
        <div>
          {assets.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ marginTop: "20%" }}
            />
          ) : (
            <div className="container">
              {assets.map((asset, idx) => {
                return <Asset key={idx} idx={idx} data={asset} />;
              })}
            </div>
          )}

          <div>
            <Affix
              offsetBottom={100}
              style={{ marginLeft: "90%", marginTop: "10%" }}
            >
              <Tooltip title="Add Asset" color={"green"} placement="topLeft">
                <Button
                  onClick={addAsset}
                  type="link"
                  icon={
                    <PlusCircleTwoTone
                      style={{ fontSize: "35px" }}
                      color={"green"}
                    />
                  }
                  style={{}}
                  size="large"
                />
              </Tooltip>
            </Affix>
          </div>
        </div>
      </Spin>
    );
};

export default AllAsset;