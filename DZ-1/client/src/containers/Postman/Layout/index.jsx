import { Layout, Menu, Icon } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

import NavTabs from "../../../components/NavTabs";

import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutComponent = () => {
  const defaultMenuItems = [
    {
      date: "dec 5",
      requests: [
        { type: "post", data: {} },
        { type: "put", data: {} },
        { type: "get", data: {} },
        { type: "post", data: {} }
      ]
    },
    {
      date: "dec 15",
      requests: [{ type: "put", data: {} }]
    },
    {
      date: "dec 25",
      requests: [{ type: "get", data: {} }]
    },
    {
      date: "dec 5",
      requests: [
        { type: "post", data: {} },
        { type: "put", data: {} },
        { type: "get", data: {} },
        { type: "post", data: {} }
      ]
    },
    {
      date: "dec 5",
      requests: [
        { type: "post", data: {} },
        { type: "put", data: {} },
        { type: "get", data: {} },
        { type: "post", data: {} }
      ]
    }
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  const getData = () => {
    // axios({
    //   method: "get",
    //   url: "/postman"
    // })
    //   .then(res => {
    //     setMenuItems(res);
    //   })
    //   .catch(err => {
    //     console.log("error catched", err.data);
    //   });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const renderMenuItems = menuItems.map((item, index) => (
    <SubMenu key={index} title={<span>{item.date}</span>}>
      {item.requests.map((request, index) => (
        <Menu.Item key={index}>{request.type}</Menu.Item>
      ))}
    </SubMenu>
  ));

  return (
    <Layout className="LayoutComponent">
      <Sider
        style={{
          backgroundColor: "white"
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="Layout_Sidebar"
      >
        <Menu mode="inline">{renderMenuItems}</Menu>
      </Sider>

      <Layout className="Layout_Content">
        <Content>
          <NavTabs />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
