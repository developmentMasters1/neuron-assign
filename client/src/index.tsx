import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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

export const log = atom<LogType[]>({
  key: 'log',
  default: [] ,
});

export const  channel = atom({
  key: 'channelId',
  default: ''

});


export const metric = atom({
  key: 'metric',
  default: []
}); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

