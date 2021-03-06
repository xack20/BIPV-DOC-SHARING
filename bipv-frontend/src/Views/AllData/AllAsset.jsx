import React, { useState, useEffect } from "react";
import Asset from "../../Components/CustomCard/Asset";
import { Affix, Button, Tooltip, notification, Spin, Empty, Input } from "antd";
import "./AllAsset.css";

import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  // addNewAsset,
  // deleteAsset,
  getAllAssets,
  // updateAsset,
  // getAllUsers,
  transferAsset,
} from "../../Services/Service";

import MyModal from "../../Components/MyModal/MyModal.jsx";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomForm from "../CustomForm/CustomForm";

const { TextArea } = Input;

const AllAsset = (props) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");

  const [state] = useState({
    user: JSON.parse(localStorage.getItem("user")).username,
    peer: "peer0",
    org: JSON.parse(localStorage.getItem("user")).org,
    orgainization: JSON.parse(localStorage.getItem("user")).orgainization,
    opt: "create",
    channel: localStorage.getItem("channel"),
    chaincode: localStorage.getItem("chaincode"),
  });

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modVisibility, setModVisibility] = useState(false);

  const [newUser, setNewUser] = useState("");

  // const [users,setUsers] = useState([]);

  const onMessageChange = (e) => {
    setTransferMessage(e.target.value);
  };

  const addAsset = () => {
    setOprtn(1);
    setModVisibility(true);
    // setAssets([...assets, 0]);
  };

  const viewAsset = (idx) => {
    setOprtn(2);
    setModVisibility(true);
    setAssetID(idx);
  };

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

  const [assetID, setAssetID] = useState(0);
  const [oprtn, setOprtn] = useState();

  const assetTransfer = async (asset) => {
    // console.log(assetID);
    if(newUser===""){
      notification.error({
        message: "Error",
        description: "Set an user to transfer!",
        placement: "bottomRight",
      });
      setModalVisibility(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await transferAsset({
        ...assets[assetID],
        transferMessage: transferMessage,
        newOwner: newUser,
        userName: state.user,
        org: state.org,
        ...state,
      });

      setAssets([
        ...assets.filter(
          (asset) => asset.documentNo !== assets[assetID].documentNo
        ),
        data.additionalPayload,
      ]);

      notification.success({
        message: "Success",
        description: "Successfully transferred asset",
        placement: "bottomRight",
      });
      setModalVisibility(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
      });
    }
    setLoading(false);

    // window.location.reload();
  };

  const [editable, setEditable] = useState(false);

  return (
    <Spin
      spinning={loading}
      size="large"
      tip="loading..."
      style={{ marginTop: "10%", zIndex: "9999" }}
    >
      <MyModal
        Width={900}
        Title={"Asset Transfer"}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      >
        <div className="transfer">
          <p>Select an user to transfer this asset : </p>
          <CustomSelect
            setNewUser={setNewUser}
            userName={state.user}
            channel={state.channel}
          />
          <TextArea
            showCount
            style={{ gridColumn: " 1 / span 2" }}
            maxLength={100}
            onChange={onMessageChange}
            placeholder="Enter a transfer message"
          />
          <Button onClick={assetTransfer} style={{ gridColumn: " 1 / span 2" }}>
            Transfer
          </Button>
        </div>
      </MyModal>
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
                  setModalVisibility={setModalVisibility}
                  setModVisibility={setModVisibility}
                  setAssets={setAssets}
                  setAssetID={setAssetID}
                  viewAsset={viewAsset}
                  isDeletedAsset={false}
                />
              );
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
