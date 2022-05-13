import { Select, notification } from "antd";

import React from 'react';
import { useEffect,useState } from "react";

import { getAllUsers } from "../../Services/Service";

const { Option } = Select;

// function onChange(value) {
//   console.log(`selected ${value}`);
// }

function onSearch(val) {
  console.log("search:", val);
}

const CustomSelect = (props) => {

    const [users, setUsers] = useState([]);

    const onChange = (value) => {
        props.setNewUser(value);
        console.log(`selected ${value}`);
    };

    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await getAllUsers();
          setUsers(data);
        } catch (error) {
          notification.error({
            message: "Error",
            description: error.message,
            placement: "bottomRight",
          });
        }
      };
    getData();
    },[]);

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
        {users.map(
          (user) =>
            user.username !== props.userName && (
              <>
                <Option key={user.username} value={user.username}>
                  {user.username}   
                </Option>
              </>
            )
        )}
      </Select>
    );
};

export default CustomSelect;
