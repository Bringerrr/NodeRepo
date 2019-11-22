import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routes from './containers/Routes';

const menuItems = [
  {
    title: 'Tasks',
    submenu: [
      {
        title: 'DZ-1',
        submenu: [
          { title: 'validationForm', link: '/form' },
          { title: 'vote', link: '/vote' }
        ]
      }
    ]
  }
];

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation menuItems={menuItems} />
        <div className="App_Routes">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
