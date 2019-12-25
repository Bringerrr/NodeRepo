import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import LoginForm from '../PreVoteForm';
import './index.scss';

const { Item } = Form;

const Vote = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState('reg');
  const [username, setUsername] = useState(null);

  const getResults = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${`http://${window.location.hostname}:4001`}/voting/variants`
    })
      .then(res => {
        console.log('get data vote', res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        console.log('error catched', err.data);
        setLoading(false);
      });
  };

  const setVoteMode = () => {
    setMode('vote');
  };

  const vote = (username, id) => {
    setLoading(true);
    axios({
      method: 'put',
      url: `${`http://${window.location.hostname}:4001`}/voting/vote`,
      data: { username, id }
    })
      .then(res => {
        console.log('get data vote', res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        console.log('error catched', err.data);
        setLoading(false);
      });
  };

  const downloadFile = (EO, type) => {
    EO.preventDefault();

    let headers = {
      Accept: ''
    };
    let fileType = '';

    switch (type) {
      case 'JSON':
        headers.Accept = 'text/json';
        fileType = 'json';
        break;

      case 'HTML':
        headers.Accept = 'text/html';
        fileType = 'html';
        break;

      case 'XML':
        headers.Accept = 'application/xml';
        fileType = 'xml';
        break;

      default:
        headers.Accept = '*/*';
        break;
    }

    axios({
      url: `${`http://${window.location.hostname}:4001`}/voting/download`,
      method: 'GET',
      responseType: 'blob',
      headers
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file.${fileType}`);
      document.body.appendChild(link);
      link.click();
    });
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="Vote">
      <h3>Vote</h3>
      {mode === 'reg' && (
        <LoginForm setVoteMode={setVoteMode} setUsername={setUsername} />
      )}
      {mode === 'vote' && data && (
        <div className="Vote_Container">
          {data.map(item => (
            <div className="Vote_Item">
              <div>
                {item.value} : {item.count}
              </div>
              <Button
                disabled={loading}
                onClick={() => {
                  vote(username, item.id);
                }}
                type="primary"
              >
                Vote
              </Button>
            </div>
          ))}
          <a onClick={EO => downloadFile(EO, 'HTML')} href="">
            Download HTML
          </a>
          <a onClick={EO => downloadFile(EO, 'JSON')} href="">
            Download JSON
          </a>
          <a onClick={EO => downloadFile(EO, 'XML')} href="">
            Download XML
          </a>
        </div>
      )}
    </div>
  );
};

export default Vote;
