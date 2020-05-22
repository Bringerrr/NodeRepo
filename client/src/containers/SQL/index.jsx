import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "antd";

import SimpleTable from "../../components/SimpleTable";

const { TextArea } = Input;

const SQL = () => {
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const handleChange = EO => {
    setInputValue(EO.target.value);
  };
  const sendRequest = () => {
    axios({
      method: "post",
      url: `${`http://${window.location.hostname}:4004`}/sql/run`,
      data: { query: inputValue }
    })
      .then(res => {
        setTableData(res.data);
      })
      .catch(err => {
        console.log("error catched", err.data);
      });
  };
  return (
    <div>
      SQL
      <TextArea onChange={handleChange} value={inputValue} autoSize />
      <Button onClick={sendRequest}>Send</Button>
      {responseMessage && responseMessage}
      {tableData && <SimpleTable />}
    </div>
  );
};

export default SQL;
