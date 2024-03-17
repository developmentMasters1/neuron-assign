import  { useState, useEffect } from 'react';

import "./css/App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Typography,Flex, ConfigProvider } from 'antd';

import Input from './Input';
import Graph from './Graph';
import Log from './Log';
import { ALL } from 'dns';


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
     
   
      <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"}}  >
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedPage]}
          onClick={({ key }) => handleMenuClick(key as string)}
          style={{
         
            backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
   

          }}
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
        <Header style={{ display : "flex", alignItems : "center" , justifyContent: "space-between", padding: 0, backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"}}>


          <div>
          <Button
           type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              color: 'white',
              
            }}
          />
          </div>


          <Typography.Title level={1} style={{color : "white" , fontFamily : 'fantasy'}}> Visualization and Labeling of Shipped Data</Typography.Title>
          <div></div>

        
        </Header>
        <Content
          style={{

            minHeight: 280,
            background: "linear-gradient(45deg, rgba(252,251,253,1) 0%,rgba(247,246,250,1) 37%,rgba(239,238,244,1) 100%)",
            display : "flex",
            justifyContent : "center"
          }}
          className='layout-content'
        >
          {renderContent()}
        </Content>
         <Footer className='footer' style={{ backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"}}>
         &#169; Nitish Singh </Footer> 
        
      </Layout>
     
    </Layout>
   
  );
};

export default App;