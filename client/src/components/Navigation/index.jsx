import React from 'react';
import { Link } from 'react-router-dom';
import changeCase from 'change-case';

import { Menu, Icon } from 'antd';
import './index.scss';

const { SubMenu, Item } = Menu;

const Navigation = ({ menuItems }) => {
  const navigationBarRender = menuData =>
    menuData.map(menuItem => {
      if (menuItem.submenu) {
        return (
          <SubMenu
            key={menuItem.title}
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                {changeCase.sentenceCase(menuItem.title)}
              </span>
            }
          >
            {navigationBarRender(menuItem.submenu)}
          </SubMenu>
        );
      }
      return (
        <Item key={menuItem.title}>
          <Link to={menuItem.link}>
            {changeCase.sentenceCase(menuItem.title)}
          </Link>
        </Item>
      );
    });

  return (
    <Menu className="Navigation" mode="horizontal">
      {navigationBarRender(menuItems)}
    </Menu>
  );
};

export default Navigation;
