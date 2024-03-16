import  { useState, useEffect } from 'react';

import "./css/App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Typography,Flex } from 'antd';

import Input from './Input';
import Graph from './Graph';
import Log from './Log';


const { Header, Sider, Content,Footer } = Layout;
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
    <Layout  className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed} >
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedPage]}
          onClick={({ key }) => handleMenuClick(key as string)}
          items={[
            {
              key: '1',
              label: 'Input',
              
            },
            {
              key: '2',
              label: 'Graph',
             
            },
            {
              key: '3',
              label : 'Log',
           
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ display : "flex", alignItems : "center" , justifyContent: "space-between", padding: 0, background: colorBgContainer }}>


          <div>
          <Button
           type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              
            }}
          />
          </div>


          <Typography.Title level={1}> Neuron Assignment</Typography.Title>
          <div></div>

        
        </Header>
        <Content
          style={{
            marginTop : 24,
            minHeight: 280,
            background: colorBgContainer,
            display : "flex",
            justifyContent : "center"
          }}
          className='layout-content'
        >
          {renderContent()}
        </Content>
         <Footer className='footer'>
          Lawda </Footer> 
      </Layout>
    </Layout>
  );
};

export default App;