import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading  } from '../../redux/alertsSlice'
import { useState } from 'react'
import { Table } from 'antd'



export default function AllCounsellor() {

    const [counsellor, setCounsellor] = useState([])
    const dispatch = useDispatch()

    const getCounsellorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/api/admin/get-all-counsellors',
            {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setCounsellor(response.data.data);   
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    const changedCounsellorStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/change-counsellor-status',
            {
                id: record._id,
                status: status,
                userId: record.userId
            },
            {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setCounsellor(response.data.data);   
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }


    useEffect(() => {
        getCounsellorData()
    }
    , [])

    const columns = [

        {
            title : 'First Name',
            dataIndex : 'firstName',
        },

        {
            title : 'Last Name',
            dataIndex : 'lastName',

        },

        {
            title : 'Email',
            dataIndex : 'email',
        },

        {
            title : 'Phone Number',
            dataIndex : 'phoneNumber',
        },

        {
            title : 'Profession',
            dataIndex : 'profession',
        },

        {
            title : 'From Time',
            dataIndex : 'fromTime',
        },

        {
            title : 'To Time',
            dataIndex : 'toTime',
        },

        {
            title : 'Created At',
            dataIndex : 'createdAt',
        },

        {
            title : 'Status',
            dataIndex : 'status',
        },

        {
            title : 'Action',
            dataIndex : 'action',
            render : (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' && <h1 className='anchors' onClick={() =>{
                        changedCounsellorStatus(record, 'approved')
                    }}>Approve</h1>}
                    {record.status === 'approved' && <h1 className='anchors' onClick={() =>{
                        changedCounsellorStatus(record, 'blocked')
                    }}>Block</h1>}
                    
                </div>
            )

        },
        

    ]
  return (
    <Layout>
        <h1 className='page-title'>All Counsellor</h1>

        <Table columns={columns} dataSource={counsellor} />
    </Layout>
  )
}
