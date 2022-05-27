// import { Input } from "antd";
import { Select, notification } from "antd";

import React from "react";
import { useEffect, useState } from "react";

import { getAllUsers } from "../../Services/Service";

const { Option } = Select;
// const {TextArea} = Input;

// function onChange(value) {
//   console.log(`selected ${value}`);
// }

const CustomSelect = (props) => {
  function onSearch(val) {
    console.log("search:", val);
  }

  const [users, setUsers] = useState([]);

  const onChange = (value) => {
    props.setNewUser(value);
    // console.log(`selected ${value}`);
  };

  // const onTextChange = (e) => {
  //     props.setNewUser(e.target.value);
  //     // console.log(`selected ${value}`);
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllUsers();
        const userss = [];
        data.map((user) => {
          if (
            user["channel"].indexOf(props.channel) !== -1 &&
            props.userName !== user.username
          )
            userss.push(user);
          return 0;
        });
        setUsers(userss);
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
      }
    };
    getData();
  }, [props.channel, props.userName]);

  return (
    <Select
      showSearch
      placeholder="Select an User"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {users.map((user) => (
        <Option key={user.username} value={user.username}>
          {user.username}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
