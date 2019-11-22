import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import './index.scss';

const { Item } = Form;

const Vote = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getResults = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: 'http://localhost:4000/voting/variants'
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

  const vote = (key, value) => {
    setLoading(true);
    const newData = { ...data, [key]: value };
    axios({
      method: 'put',
      url: 'http://localhost:4000/voting/vote',
      data: newData
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

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="Vote">
      <h3>Vote</h3>
      {data && (
        <div className="Vote_Container">
          {Object.entries(data).map(([voteLabel, value]) => (
            <div className="Vote_Item">
              <div>
                {voteLabel} : {value}
              </div>
              <Button
                disabled={loading}
                onClick={() => {
                  vote(voteLabel, value + 1);
                }}
                type="primary"
              >
                Vote
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vote;
