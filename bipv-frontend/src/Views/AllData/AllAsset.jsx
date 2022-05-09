import React, { useState, useEffect } from "react";
import Asset from '../../Components/CustomCard/Asset';
import { Affix, Button, Tooltip, notification, Spin, Empty } from "antd";
import './AllAsset.css';

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

const AllAsset = (props) => {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state] = useState({
      user: JSON.parse(localStorage.getItem("user")).username ,
      channel: "channel1",
      peer: "peer0",
      org: JSON.parse(localStorage.getItem("user")).organization,
      opt: "create",
    });

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modVisibility, setModVisibility] = useState(false);

    const [newUser,setNewUser] = useState("");

    // const [users,setUsers] = useState([]);

    const addAsset = () => {
        setModVisibility(true);
        // setAssets([...assets, 0]);
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
    }, [state]);

    const [assetID, setAssetID] = useState(0);


    const assetTransfer = async (asset) => {
      console.log(assetID);

        setLoading(true);
      try {
        const {data} = await transferAsset({...assets[assetID], newOwner : newUser, userName : state.user, org : state.org});
        
        setAssets([
          ...assets.filter((asset) => asset.documentNo !== assets[assetID].documentNo),
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

    return (
      <Spin
        spinning={loading}
        size="large"
        tip="loading..."
        style={{ marginTop: "10%" , zIndex: "9999"}}
      >
        <MyModal
          Width={900}
          Title={"Asset Transfer"}
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
        >
          <div className="transfer">
            <p>Select an user to transfer this asset : </p>
            <CustomSelect setNewUser={setNewUser} userName={state.user} />
            <Button
              onClick={assetTransfer}
              style={{ gridColumn: " 1 / span 2" }}
            >
              Transfer
            </Button>
          </div>
        </MyModal>
        <MyModal
          Width={700}
          Title={"Asset Create"}
          modalVisibility={modVisibility}
          setModalVisibility={setModVisibility}
        >
          <div className="addAsset">
            <CustomForm params={"Insert"} setLoading={setLoading} setModVisibility={setModVisibility} user={state.user} org={state.org} setAssets={setAssets} assets={assets} ></CustomForm>
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
                    setAssets={setAssets}
                    setAssetID={setAssetID}
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