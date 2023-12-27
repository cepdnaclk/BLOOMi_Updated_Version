import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading  } from '../../redux/alertsSlice'
import { useState } from 'react'
import { Table } from 'antd'



export default function AllAdmins() {

    const [admins, setAdmins] = useState([])
    const dispatch = useDispatch()

    const getCounsellorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/api/admin/get-all-admin',
            {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setAdmins(response.data.data);   
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
            title : 'FullName',
            dataIndex : 'fullName',
        },

        {
            title : 'Email',
            dataIndex : 'email',
        },

        {
            title : 'Created At',
            dataIndex : 'createdAt',
        },

        {
            title : 'Action',
            dataIndex : 'action',
            render : (text, record) => (
                <div className='d-flex'>
                    <h1 className='anchors'>Block</h1>
                </div>
            )

        },

    ]
  return (
    <Layout>
        <h1 className='page-title'>All Admins</h1>

        <Table columns={columns} dataSource={admins} />
    </Layout>
  )
}
