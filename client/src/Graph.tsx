
import { useState , useEffect} from 'react';
import Plot from "react-plotly.js"
import  './css/Graph.css';
import Tag from './Tag';
import {metric, channel} from './atom/atom'; 
import { useRecoilState } from 'recoil';
import { Button } from 'antd';



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
    const response = await fetch(`https://data-api-vpq8.onrender.com/data/${channel_id}?metric=${metric}`); 
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
      <div className='title-container'>
      <h1>Graphs</h1>
      </div>
      <div className='card-container'>
        {
          plainOptions.map((item) => (
           < div 
              key={item}
              className="card"
             
            >
              <div>
             <h2>{item}</h2>
             </div>
            
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
          
            <div style = {{ marginTop : "1em"}}>
            <Button  onClick={ ()=>{openModal(item) }} >Add Tags</Button>
            </div>
             
          </div>
          ))  
        }
      </div>
      {showModal && <Tag closeModal={closeModal} selectedItem={selectedItem} metricData = {metricData}/> }
    </div>
  );
};

export default Graph;
