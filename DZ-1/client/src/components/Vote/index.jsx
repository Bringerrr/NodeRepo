import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Icon, Input, Button } from "antd";
import LoginForm from "../PreVoteForm";
import "./index.scss";

const { Item } = Form;

const Vote = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("reg");
  const [username, setUsername] = useState(null);

  const getResults = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "/voting/variants"
    })
      .then(res => {
        console.log("get data vote", res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        console.log("error catched", err.data);
        setLoading(false);
      });
  };

  const setVoteMode = () => {
    setMode("vote");
  };

  const vote = (username, id) => {
    setLoading(true);
    axios({
      method: "put",
      url: "/voting/vote",
      data: { username, id }
    })
      .then(res => {
        console.log("get data vote", res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        console.log("error catched", err.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="Vote">
      <h3>Vote</h3>
      {mode === "reg" && (
        <LoginForm setVoteMode={setVoteMode} setUsername={setUsername} />
      )}
      {mode === "vote" && data && (
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
        </div>
      )}
    </div>
  );
};

export default Vote;
