import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const PreVoteForm = ({ setVoteMode, setUsername }) => {
  const [usernameField, setUsernameField] = useState('');
  const [error, setError] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${`http://${window.location.hostname}:4001`}/voting/reg`,
      data: { username: usernameField }
    })
      .then(res => {
        setVoteMode();
        setUsername(usernameField);
      })
      .catch(err => {
        setError(err.response.data);
        console.log('error catched', err.response.data);
      });
  };
  return (
    <Form validated={false}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your name</Form.Label>
        <Form.Control
          isInvalid={!!error}
          value={usernameField}
          onChange={e => {
            setUsernameField(e.target.value);
          }}
          type="text"
          placeholder="Enter your name"
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>

      <Button onClick={onSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PreVoteForm;
