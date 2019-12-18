import React, { useState } from "react";
import { Table, Input } from "antd";

const DataTable = ({ header, data, handleChange, action }) => {
  const columns = [
    {
      title: "Key",
      dataIndex: "hashKey",
      render: (...props) => {
        const value = props[0];
        const index = props[props.length - 1];
        return (
          <Input
            onChange={EO => handleChange(EO, index, "hashKey", action)}
            value={data[index]["hashKey"]}
          />
        );
      }
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (...props) => {
        const value = props[0];
        const index = props[props.length - 1];
        return (
          <Input
            onChange={EO => handleChange(EO, index, "value", action)}
            value={data[index]["value"]}
          />
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={data}
      scroll={{ y: 325 }}
      title={() => header}
    />
  );
};

export default DataTable;
