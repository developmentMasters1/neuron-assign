import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot, atom } from 'recoil';


export interface LogType {
  key : string , 
  channel_id: string;
  metric: string;
  tag: string;
  timestamp: string;
  to_time: string;

}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

