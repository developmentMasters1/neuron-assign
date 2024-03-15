import { useEffect, useState } from "react";
import { Select, Checkbox, Divider, Button } from "antd";
import type { CheckboxProps, GetProp } from 'antd';
import { useRecoilState } from "recoil";
import { metric, channel } from "./index";
import "./Input.css";



const CheckboxGroup = Checkbox.Group;

const getChannel = async () => {
  const response = await fetch("http://localhost:8000/channels");
  const data = await response.json();

  const val = data.data.map((item: any) => ({
    label: item,
    value: item
  }));

  return val;
}

const Input = ({ handleMenuClick }: { handleMenuClick: (arg: string) => void }) => {

  const [channelId, setChannelId] = useRecoilState(channel);
  const [options, setOptions] = useState<{ label: string, value: string }[]>([]);
  const [plainOptions, setPlainOptions] = useRecoilState(metric);

  const handleChange = async (value: string) => {
    setChannelId(value);

    const response = await fetch(`http://localhost:8000/metrics?channel_id=${value}`);
    const data = await response.json();

    setPlainOptions(data.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChannel();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container" >
      <div>
      <h2>Input Channel Id</h2>
      </div>

      <div >
        <Select
          size="large"
          placeholder="Please select"
          onChange={handleChange}
          options={options}
        />
      </div>
      <Divider />
      <h2>Metrics with significant changes</h2>
      <div  className="significantMetricContainer">
        {
          plainOptions.map((item, index) => {
            return <span key={index}>{item}</span>;
          })
        }
      </div>
      <Divider/>
      <Button onClick={() => handleMenuClick('2')}>Show Graphs</Button>
    </div>
  )
}

export default Input;
