import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';

const { Item } = Form;

const ValidationForm = props => {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;

  const [formFields, setFormFields] = useState({
    username: '',
    password: ''
  });

  const initialErrors = {
    username: null,
    password: null
  };

  const [formErrors, setFormErrors] = useState(initialErrors);
  const response = [
    { label: 'username', message: 'Please input your username' },
    { label: 'password', message: 'Please input your password' }
  ];

  const formSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      const body =
        values.username === undefined || values.password === undefined
          ? formFields
          : values;
      console.log('body', body);
      axios({
        method: 'post',
        url: 'http://localhost:4000/form',
        data: values.username || values.password ? formFields : values
      })
        .then(res => {
          if (res.data.errors) {
            const { errors } = res.data;
            setFormErrors(errors);
          } else setFormErrors({ ...formErrors, ...initialErrors });
        })
        .catch(err => {
          console.log('error catched', err.data);
        });
    });
  };

  return (
    <Form layout="inline" onSubmit={formSubmit}>
      <Item
        validateStatus={formErrors.username ? 'error' : ''}
        help={formErrors.username || ''}
      >
        {getFieldDecorator('username', {
          rules: [{ message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={e =>
              setFormFields({ ...formFields, username: e.currentTarget.value })
            }
          />
        )}
      </Item>
      <Item
        validateStatus={formErrors.password ? 'error' : ''}
        help={formErrors.password || 'Use minumum 6 symblos'}
      >
        {getFieldDecorator('password', {
          rules: [{ message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={e =>
              setFormFields({ ...formFields, password: e.currentTarget.value })
            }
          />
        )}
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Item>
    </Form>
  );
};

const WrappedHorizontalLoginForm = Form.create({ name: 'validationForm' })(
  ValidationForm
);

export default WrappedHorizontalLoginForm;
