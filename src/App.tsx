import React from 'react';
import { Flex, Layout } from 'antd';
import {Navbar} from './components/Navbar';
import {Workspace} from './components/Workspace'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World 14563455 
        </p>
      </header>
    </div>
  );
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

export const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Navbar />
      <Workspace />
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Flex>
);
