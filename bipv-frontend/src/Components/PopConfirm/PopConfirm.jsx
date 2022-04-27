import React from 'react';
import { Button, Popconfirm } from "antd";

const PopConfirm = (props) => {

    const confirm = () => {
      new Promise((resolve) => {
        props.onConfirm();
        resolve();
      });
    }

    return (
      <Popconfirm
        title={props.title}
        onConfirm={confirm}
        // onVisibleChange={() => console.log("visible change")}
      >
        {props.children}
      </Popconfirm>
    );
};

export default PopConfirm;