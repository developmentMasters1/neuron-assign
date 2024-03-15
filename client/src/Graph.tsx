
import React, { useState , useEffect} from 'react';
import { Card } from 'antd';
import Plot from "react-plotly.js"
import './Graph.css';
import Tag from './Tag';
import {metric, channel} from './index'; 
import { useRecoilState } from 'recoil';

export interface DataProps {
  time: string[];
  value: number[];
}

interface significantMetricProps {
  [significantMetric : string ]:  DataProps

}

const readData = async ( channel_id :  string  , metrics  : string[] | [])=>{
  let ans  : significantMetricProps = {}; 
  for ( let metric of metrics){
    const response = await fetch(`http://localhost:8000/data/${channel_id}?metric=${metric}`); 
    const data = await response.json();  
    const keys  = Object.keys(data.data); 

    const significantMetric = keys[1];  
    const time = Object.values(data.data[keys[0]]);
    const value = Object.values(data.data[keys[1]]);

    const obj : DataProps = {
     
        time : time as string[] , 
        value : value as number[]


    }

    
    ans[significantMetric] =  obj; 
  }

  return ans ; 
}




const Graph = () => {
  const [showModal, setShowModal] = useState(false);
  const [plainOptions, setPlainOptions] = useRecoilState(metric) ; 
  const [selectedItem, setSelectedItem] = useState<string>(); 

  const [metricData , setMetricData] = useState<DataProps>() ; 
  const [ channel_id, setChannelId] = useRecoilState(channel) ;
  const [ data , setData] = useState<significantMetricProps>();   
  

  useEffect(() => {

    const fetchData  =  async () => { 
      
      const  responseData = await readData(channel_id , plainOptions); 
      console.log(responseData, "responsedsgetsjdmtukf,ymvg data"); 
      setData( responseData);    

      
    }



    fetchData();

  },[]);

  



  

  const openModal = (item : string) => {
    setShowModal(true);
    setSelectedItem(item);
    setMetricData( data !== undefined ? data[item] : undefined);
    
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="graph-container">
      <h1>Graphs</h1>
      <div className="cards-container">
        {
          plainOptions.map((item) => (
            <Card
              key={item}
              title={item}
              className="card"
              onClick={ ()=>{openModal(item) }}
            >
              

              <div className="plot-container">
              <Plot
                data={[
                  {
                    x: data != undefined ? data[item].time : [],
                    y: data != undefined ? data[item].value : [],
                    mode: 'lines',
                    marker: { color: 'blue' },
                    name: 'Bandwidth vs Time',
                  },
                ]}
                layout={{
                  title: 'Bandwidth vs Time',
                }}
                className='plot'
              />
            </div>

            <p>Click to add tags</p>
             
            </Card>
          ))  
        }
      </div>
      {showModal && <Tag closeModal={closeModal} selectedItem={selectedItem} metricData = {metricData}/> }
    </div>
  );
};

export default Graph;
