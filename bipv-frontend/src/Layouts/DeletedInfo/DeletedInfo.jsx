import React, { useState, useEffect } from "react";
import Asset from "../../Components/CustomCard/Asset";
import { notification, Spin, Empty } from "antd";
import "./DeletedInfo.css";

// import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  // addNewAsset,
  // deleteAsset,
  getDeletedAssets,
  getDeteledAssetInfo,
  // updateAsset,
  // getAllUsers,
  //   transferAsset,
} from "../../Services/Service";

import MyModal from "../../Components/MyModal/MyModal.jsx";
import CustomForm from "../../Views/CustomForm/CustomForm";

const DeletedInfo = (props) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [transferMessage] = useState("");

  const [state] = useState({
    user: JSON.parse(localStorage.getItem("user")).username,
    peer: "peer0",
    org: JSON.parse(localStorage.getItem("user")).org,
    orgainization: JSON.parse(localStorage.getItem("user")).orgainization,
    opt: "create",
    channel: localStorage.getItem("channel"),
    chaincode: localStorage.getItem("chaincode"),
  });

  const [modVisibility, setModVisibility] = useState(false);

  //   const [newUser] = useState("");

  // const [users,setUsers] = useState([]);

  const viewAsset = (idx) => {
    setOprtn(2);
    setModVisibility(true);
    setAssetID(idx);
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const { data } = await getDeletedAssets();

        console.log(data);

        const assetsTemp = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].channel === state.channel) {
            const DATA = await getDeteledAssetInfo({
              userName: state.user,
              ...state,
              documentNo: data[i].documentNo,
            });
            assetsTemp.push(DATA.data.additionalPayload);
          }
        }

        setAssets(() => assetsTemp);
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

  const [assetID, setAssetID] = useState(0);
  const [oprtn, setOprtn] = useState();

  const [editable, setEditable] = useState(false);

  return (
    <Spin
      spinning={loading}
      size="large"
      tip="loading..."
      style={{ marginTop: "10%", zIndex: "9999" }}
    >
      <MyModal
        Width={700}
        Title={
          oprtn === 1
            ? "Asset Create"
            : `Document No :${assets.length && assets[assetID].documentNo}`
        }
        modalVisibility={modVisibility}
        setModalVisibility={setModVisibility}
        setEditable
      >
        <div className="addAsset">
          <CustomForm
            params={oprtn === 1 ? "Insert" : "Update"}
            setLoading={setLoading}
            setModVisibility={setModVisibility}
            user={state.user}
            org={state.org}
            user_state={state}
            setAssets={setAssets}
            assets={assets}
            editable={editable}
            setEditable={setEditable}
            oprtn={oprtn}
            assetID={assetID}
          />
        </div>
      </MyModal>

      <div>
        {assets.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: "20%" }}
          />
        ) : (
          <div className="container">
            {assets.map((asset, idx) => {
              return (
                <Asset
                  key={idx}
                  idx={idx}
                  data={asset}
                  setLoading={setLoading}
                  //   setModalVisibility={setModalVisibility}
                  setModVisibility={setModVisibility}
                  setAssets={setAssets}
                  setAssetID={setAssetID}
                  viewAsset={viewAsset}
                />
              );
            })}
          </div>
        )}
      </div>
    </Spin>
  );
};

export default DeletedInfo;
