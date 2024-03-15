import { useRecoilState } from "recoil";
import { log, LogType } from "./index";
import { Table,Space , Button} from 'antd';
import type { TableProps } from 'antd';






const Log : React.FC = () =>{
    const [data, setData] =  useRecoilState<LogType[]>(log) ; 

    
    const handleDownload = () => {

        const logsJson = JSON.stringify(data, null, 2);
        
        const blob = new Blob([logsJson], { type: 'application/json' });
       
        const url = URL.createObjectURL(blob);
        
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logs.json'; 
        a.click();
        
    
        URL.revokeObjectURL(url);
      };


      
const columns :  TableProps<LogType>['columns'] = [
  {
    title: 'Channel',
    dataIndex: 'channel_id',
    key: 'channel_id',
  },
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric',
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'To Time',
    dataIndex: 'to_time',
    key: 'to_time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record : LogType) => (
      <Space size="middle">
        <a onClick={() => handleDelete(record)}>Delete</a>
      </Space>
    ),
  },
];

const handleDelete = (record : LogType) => {
  setData( (data) => data.filter((item) => item.key !== record.key)); 
} 
    
   
     

    return (
      <div>
       <Table dataSource={data} columns={columns} scroll={{ y: 240 }}  />
        <Button onClick={handleDownload}>Download</Button>
      </div>
    );
}

export default Log;








