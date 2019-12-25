import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import axios from 'axios';
import {
  Form,
  Button,
  Dropdown,
  InputGroup,
  DropdownButton
} from 'react-bootstrap';
import { Menu } from 'antd';

import DataTable from '../DataTable';

import './index.scss';

const requestNavigation = ['Params', 'Headers', 'Body'];
const responseNavigation = ['Body', 'Headers'];
const requestsTypes = ['get', 'post', 'put', 'delete', 'patch'];

const defaultData = {
  '': ''
};

const transformDataForTable = data =>
  Object.entries(data).map(([key, item]) => {
    return {
      hashKey: key,
      value: item
    };
  });

const transformDataforRequest = data => {
  let newData = {};
  data.forEach(item => {
    if (item.hashKey !== '') newData[item.hashKey] = item.value;
  });
  return newData;
};

const TabPane = ({ activeData }) => {
  const [data, setData] = useState(transformDataForTable(defaultData));
  const [dropDown, setDropwDown] = useState(requestsTypes[0]);
  const [requestNavigationActive, setRequestNavigationActive] = useState(
    requestNavigation[0]
  );
  const [responseNavigationActive, setResponseNavigationActive] = useState(
    responseNavigation[0]
  );
  const [url, setUrl] = useState('http://localhost:4000/voting/variants');
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState(null);

  const [requestParams, setRequestParams] = useState(data);
  const [requestHeaders, setRequestHeaders] = useState(data);
  const [requestBody, setRequestBody] = useState(data);
  const [temporaryHeaders, setTemporaryHeaders] = useState(null);

  console.log('state', { requestParams, requestHeaders, requestBody });

  const [responseParams, setResponseParams] = useState(data);
  const [responseHeaders, setResponseHeaders] = useState(data);
  const [responseBody, setResponseBody] = useState(data);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  const mutateData = (data, action) => {
    const lastIndex = data.length - 1;
    if (Object.entries(data[lastIndex]).some(([key, value]) => value !== '')) {
      const newData = data;
      const newRow = {};

      Object.keys(newData[lastIndex]).forEach(key => (newRow[key] = ''));
      newData.push(newRow);
      action([...newData]);
    } else if (
      Object.entries(data)
        .slice(0, lastIndex)
        .findIndex(([key, value]) => {
          return Object.entries(value).every(([key, inputValue]) => {
            return inputValue === '';
          });
        }) > -1
    ) {
      const newData = data;
      const emptyRowIndex = Object.entries(newData)
        .slice(0, lastIndex)
        .findIndex(([key, value]) => {
          return Object.entries(value).every(([key, inputValue]) => {
            return inputValue === '';
          });
        });

      newData.splice(emptyRowIndex, 1);
      action([...newData]);
    }
  };

  useEffect(() => {
    mutateData(requestParams, setRequestParams);
  }, [requestParams]);

  useEffect(() => {
    mutateData(requestBody, setRequestBody);
  }, [requestBody]);

  useEffect(() => {
    mutateData(requestHeaders, setRequestHeaders);
  }, [requestHeaders]);

  useEffect(() => {
    // const [url, setUrl] = useState('');
    // const [requestParams, setRequestParams] = useState(data);
    // const [requestHeaders, setRequestHeaders] = useState(data);
    // const [requestBody, setRequestBody] = useState(data);
  }, [activeData]);

  const onSubmit = e => {
    const body = {
      method: dropDown,
      body: transformDataforRequest(requestBody),
      headers: transformDataforRequest(requestHeaders),
      url
    };
    e.preventDefault();

    axios({
      method: 'post',
      url: `${`http://${window.location.hostname}:4002`}/postman/run`,
      data: body
    })
      .then(res => {
        setResponse(res);
        setResponseHeaders(transformDataForTable(res.data.headers));
        setTemporaryHeaders(transformDataForTable(res.data.temporaryHeaders));
        setResponseBody(res.data.data);
        setResponseStatus(res.data.status);
        setResponseTime(res.data.time);
      })
      .catch(err => {
        console.log('error catched', err.data);
      });
  };

  const handleClick = (e, action) => {
    action(e.key);
  };

  const handleTableChange = (EO, index, value, action, state) => {
    const newState = state;
    newState.splice(index, 1, { ...newState[index], [value]: EO.target.value });
    action([...newState]);
  };

  const renderRequestTable = activeItem => {
    if (activeItem === 'Params') {
      return (
        <DataTable
          action={setRequestParams}
          handleChange={handleTableChange}
          data={requestParams}
          header="Params"
        />
      );
    }

    if (activeItem === 'Headers') {
      return (
        <>
          <DataTable
            action={setRequestHeaders}
            handleChange={handleTableChange}
            data={requestHeaders}
            header="Headers"
          />
          {temporaryHeaders && (
            <DataTable
              action={setTemporaryHeaders}
              handleChange={handleTableChange}
              data={temporaryHeaders}
              header="Temporary Headers"
              disableInputs
            />
          )}
        </>
      );
    }

    if (activeItem === 'Body') {
      return (
        <DataTable
          action={setRequestBody}
          handleChange={handleTableChange}
          data={requestBody}
          header="Body"
        />
      );
    }

    // switch (activeItem) {
    //   case 'Params':
    //     return (
    //       <DataTable
    //         action={setRequestParams}
    //         handleChange={handleTableChange}
    //         data={requestParams}
    //         header="Params"
    //       />
    //     );
    //   case 'Headers':
    //     return (
    //       <>
    //         <DataTable
    //           action={setRequestHeaders}
    //           handleChange={handleTableChange}
    //           data={requestHeaders}
    //           header="Headers"
    //         />
    //         {temporaryHeaders && (
    //           <DataTable
    //             action={setTemporaryHeaders}
    //             handleChange={handleTableChange}
    //             data={temporaryHeaders}
    //             header="Temporary Headers"
    //             disableInputs
    //           />
    //         )}
    //       </>
    //     );
    //   case 'Body':
    //     return (
    //       <DataTable
    //         action={setRequestBody}
    //         handleChange={handleTableChange}
    //         data={requestBody}
    //         header="Body"
    //       />
    //     );
    //   default:
    //     return null;
    // }
  };

  const renderResponseTable = activeItem => {
    switch (activeItem) {
      case 'Body':
        return <ReactJson collapsed={false} src={responseBody} />;
      case 'Headers':
        return (
          <DataTable
            action={setResponseHeaders}
            handleChange={handleTableChange}
            data={responseHeaders}
            header="Header"
            disableInputs
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="TabPane">
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={dropDown}
          id="input-group-dropdown-1"
        >
          {requestsTypes.map(request => (
            <Dropdown.Item
              onClick={() => setDropwDown(request)}
              value={request}
            >
              {request}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <Form.Control
          value={url}
          onChange={e => {
            setUrl(e.target.value);
          }}
          className="FormControl"
          type="text"
          placeholder="Enter url"
        />

        <InputGroup.Prepend>
          <Button onClick={onSubmit} variant="primary" type="submit">
            Send
          </Button>
        </InputGroup.Prepend>
      </InputGroup>
      <div className="TabPane_Params">
        <Menu
          onClick={e => handleClick(e, setRequestNavigationActive)}
          mode="horizontal"
          selectedKeys={[requestNavigationActive]}
        >
          {requestNavigation.map(navItem => (
            <Menu.Item key={navItem}>{navItem}</Menu.Item>
          ))}
        </Menu>

        {renderRequestTable(requestNavigationActive)}
      </div>
      <div className="TabPane_Response">
        {responseStatus && (
          <div>
            Status : {responseStatus} Time : {responseTime}ms
          </div>
        )}
        <Menu
          onClick={e => handleClick(e, setResponseNavigationActive)}
          mode="horizontal"
          selectedKeys={[responseNavigationActive]}
        >
          {responseNavigation.map(navItem => (
            <Menu.Item key={navItem}>{navItem}</Menu.Item>
          ))}
        </Menu>

        {renderResponseTable(responseNavigationActive)}
      </div>
    </div>
  );
};

export default TabPane;
