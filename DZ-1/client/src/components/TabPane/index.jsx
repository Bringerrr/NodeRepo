import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";

import "./index.scss";
const { Option } = Select;

const TabPane = () => {
  const requestsTypes = ["get", "post", "put", "delete", "patch"];
  const [dropDown, setDropwDown] = useState(requestsTypes[0]);
  const [url, setUrl] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState(null);

  // const handleDropdownItemClick = EO => {
  //   setDropwDown(EO.target.innerHTML);
  // };

  function handleChange(value) {
    setDropwDown(value);
  }

  const onSubmit = e => {
    e.preventDefault();
    axios({
      method: dropDown,
      url
      // data: { url }
    })
      .then(res => {
        setResponse(res);
        console.log("response", res);
      })
      .catch(err => {
        console.log("error catched", err.data);
      });
  };

  return (
    <div className="TabPane">
      <Form className="TabPane_Form">
        <Form.Group controlId="formBasicEmail">
          <Row className="Url_Group">
            <Col sm={3}>
              <Select
                defaultValue={requestsTypes[0]}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                {requestsTypes.map(request => (
                  <Option value={request}>{request}</Option>
                ))}
              </Select>
            </Col>
            <Col sm={7}>
              <Form.Control
                value={url}
                onChange={e => {
                  setUrl(e.target.value);
                }}
                className="FormControl"
                type="text"
                placeholder="Enter url"
              />
            </Col>
            <Col sm={2}>
              <Button onClick={onSubmit} variant="primary" type="submit">
                Send
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      <div className="TabPane_Response">Response</div>
    </div>
  );
};

export default TabPane;
