import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const PreVoteForm = ({ setVoteMode, setUsername }) => {
  const [usernameField, setUsernameField] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/voting/reg",
      data: { username: usernameField }
    })
      .then(res => {
        setVoteMode();
        setUsername(usernameField);
      })
      .catch(err => {
        console.log("error catched", err.data);
      });
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your name</Form.Label>
        <Form.Control
          value={usernameField}
          onChange={e => {
            setUsernameField(e.target.value);
          }}
          type="text"
          placeholder="Enter your name"
        />
      </Form.Group>

      <Button onClick={onSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PreVoteForm;
