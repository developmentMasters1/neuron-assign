import { atom } from 'recoil';  
import { LogType } from '../index';

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
  