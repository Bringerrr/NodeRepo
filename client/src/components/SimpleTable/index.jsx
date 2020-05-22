import React, { useState } from "react";
import { Table } from "antd";

const DataTable = ({ data }) => {
  const columns = [
    {
      title: "Key",
      dataIndex: "hashKey"
    },
    {
      title: "Value",
      dataIndex: "value"
    }
  ];

  return <Table columns={columns} pagination={false} dataSource={data} />;
};

export default DataTable;
