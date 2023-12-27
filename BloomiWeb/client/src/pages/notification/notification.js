 import Layout from '../../components/layout'
import React from 'react'
import { Tabs } from 'antd';
import './notification.css'

 
 export default function notification() {
    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Unread',
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: 'Read',
          children: 'Content of Tab Pane 2',
        }
      ];
   return (
     <Layout>
        <h1 className='page-title'>Notification</h1>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange}  className='tab'/>
     </Layout>
   )
 }
 