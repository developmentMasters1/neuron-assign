import React, { useState,useEffect } from 'react';  

import { Button, notification } from 'antd';
import "./css/Tag.css"; // Import your CSS file
import { useRecoilState } from 'recoil';
import {  LogType} from './index';
import { log, channel } from './atom/atom';

import Plot from 'react-plotly.js';
import { DataProps } from './Graph';
import { CloseOutlined } from '@ant-design/icons';


interface TagProps {
  closeModal: () => void;
  selectedItem: string | undefined;
  metricData : DataProps | undefined;

}


 

  const openNotification = () => {
    notification.open({
      message: 'Success!',
      description:
        'Added Log Successfully!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

 

  const Tag: React.FC<TagProps> = ({ closeModal, selectedItem, metricData }) =>{

    const [readlog , setReadLog] = useRecoilState<LogType[]>(log) ;
    const [ channel_id, setChannelId] = useRecoilState(channel) ;
    const [tag , setTag] = React.useState<string>(''); 
    const [metric , setMetric] = useState<number>(-1);
    const [timestamp, setTimestamp] = useState('');

    const [timemetricData, setTimemetricData] = useState<DataProps | undefined>(undefined);

    useEffect(() => {

       
        if(selectedItem){
          const time = metricData?.time;
          const value = metricData?.value;
          setTimemetricData({
            time: time as string[],
            value: value as number[]
          });
        }
    },[]);

    
 

    

    const handleClick = () => {
        closeModal();
    };
    const  handleLogSave = () => {

      if(tag !== '' || timestamp !== '' || metric !== -1){
        const data : LogType = {
          key : readlog.length.toString(),
          channel_id: channel_id,
          metric: selectedItem as string,
          tag: tag,
          timestamp: "10 min",
          to_time: timestamp

       }
       openNotification();
        setReadLog( (readlog)  => 
        {return  [...readlog, data]});

        setTag('') ; 
        setTimestamp('') ;
        setMetric(0) ;
        
      }

      

    }

    const handlePlotClick = (event: any) => {
      const { points } = event;
      if (points) {
        const coordinates = points.map((point: any) => ({ x: point.x, y: point.y }));
        
        setTimestamp(coordinates[0].x) ; 
        setMetric(coordinates[0].y);
        console.log('Clicked coordinates:', coordinates);
      }
    };

    let data : LogType ; 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setTag(event.target.value);
    }

    return (
      <div className="modal-background">
        <div className="modal">
         <div className='modal-container'>
             <Plot
             data={[
              {
                x: timemetricData?.time,
                y:timemetricData?.value,
                mode: 'lines',
                marker: { color: 'blue' },
                name: 'Bandwidth vs Time',
                },
                ]}
              layout={{
              title: 'Bandwidth vs Time',
              xaxis: { showspikes: true, spikemode: "toaxis" }
               }}
           
               onClick={handlePlotClick}
               />
            
  
             <div className="input-container">
              <div>
               <h3>Time Stamp</h3>
              <input  disabled defaultValue={timestamp}  />
              </div>
              <div>
              <h3>Value</h3>
              <input  disabled defaultValue={metric === -1 ? "" : metric} />
              </div>
              <div>
              <h3>Enter Tag</h3>
              <input  placeholder="Enter your tag" value={tag} onChange={handleChange} />
              </div>
              <Button type="primary" onClick={handleLogSave}>Submit</Button>
             </div>
          </div>

        
          <div className='closeButton'>
          <Button onClick={handleClick} ><CloseOutlined /></Button>
          </div>
        </div>
        
       
      
     
      </div>
    );
}   


export default Tag;