import React from 'react';
import { Flex, Layout } from 'antd';
import {Navbar} from './components/Navbar';
import {Workspace} from './components/Workspace'
import './App.css';
import { Footer } from 'antd/es/layout/layout';

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
