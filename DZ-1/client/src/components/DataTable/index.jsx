import React, { useState } from 'react';
import { Table, Input } from 'antd';

const DataTable = ({ header, data, handleChange, action, disableInputs }) => {
  const columns = [
    {
      title: 'Key',
      dataIndex: 'hashKey',
      render: (...props) => {
        const value = props[0];
        const index = props[props.length - 1];
        return (
          <Input
            onChange={EO => handleChange(EO, index, 'hashKey', action, data)}
            value={data[index]['hashKey']}
            disabled={disableInputs || false}
          />
        );
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (...props) => {
        const value = props[0];
        const index = props[props.length - 1];
        return (
          <Input
            onChange={EO => handleChange(EO, index, 'value', action, data)}
            value={data[index]['value']}
            disabled={disableInputs || false}
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
