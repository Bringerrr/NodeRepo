import { Tabs, Button, Icon } from "antd";
import React, { useState, useEffect } from "react";
import TabPaneContent from "../TabPane";

import "./index.scss";

const { TabPane } = Tabs;

const NavTabs = () => {
  const defPanes = [
    { title: "Tab 1", content: <TabPaneContent />, key: "1" },
    { title: "Tab 2", content: <TabPaneContent />, key: "2" }
  ];

  const [panes, setPanes] = useState(defPanes);
  const [activeKey, setActiveKey] = useState(panes[0].key);

  const onChange = activeKey => {
    setActiveKey(activeKey);
  };

  const add = () => {
    const activeKey = `newTab${panes.length}`;
    panes.push({ title: "New Tab", content: "New Tab Pane", key: activeKey });
    setPanes(panes);
    setActiveKey(activeKey);
  };

  const remove = targetKey => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      remove(targetKey);
    }
  };

  return (
    <div className="NavTabs">
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default NavTabs;
