import  { useState, useEffect } from 'react';

import "./css/App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
// import { Footer } from 'antd/es/layout/layout';
import Input from './Input';
import Graph from './Graph';
import Log from './Log';


const { Header : AntHeader, Sider, Content } = Layout;
type DataRow = {
  channel_id: string;
  ec_timestamp: string;
  tx_estimated_bw_kbps: number;
  rx_estimated_bw_kbps: number;
  wan_circuit_tx_cir_kbps: number;
  wan_circuit_rx_cir_kbps: number;
  tx_kbps: number;
  rx_kbps: number;
}
  type Values = { 
    data : DataRow[];

  }


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('1'); 
  const [data, setData] = useState<Values | undefined>();

  // useEffect(() => {
  //   const getCSV = () => {
  //     Papa.parse("/file.csv", {
  //       header: true,
  //       download: true,
  //       skipEmptyLines: true,
  //       delimiter: ",",
  //       complete: (results: ParseResult<DataRow>) => {
  //         setData(results)
  //       },
  //     })
  //   }

  //   console.log(data); ;
  // }, []); // Run once on component mount

  const handleMenuClick = async (page: string) => {   
     setSelectedPage(page);
    
  }
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const renderContent = () => {
    switch (selectedPage) {
      case '1':
        return <Input handleMenuClick={handleMenuClick}  />;
      case '2':
        return <Graph />;
      case '3':
        return <Log />;
      default:
        return null;
    }
  };



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedPage]}
          onClick={({ key }) => handleMenuClick(key as string)}
          items={[
            {
              key: '1',
              label: 'Input',
              style: selectedPage === '1' ? { backgroundColor: 'blue' } : {}
            },
            {
              key: '2',
              label: 'Graph',
              style: selectedPage === '2' ? { backgroundColor: 'blue' } : {}
            },
            {
              key: '3',
              label : 'Log',
              style: selectedPage === '3' ? { backgroundColor: 'blue' } : {}
            },
          ]}
        />
      </Sider>
      <Layout>
        <AntHeader style={{ padding: 0, background: colorBgContainer }}>
        
          <Button
           type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              
            }}
          />

          <span className='title'><h1 style={{display:"inline"}}>Neuron Assignment</h1></span>

        
        </AntHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            
          }}
        >
          {renderContent()}
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;