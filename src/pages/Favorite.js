import React from 'react'
import Heart from '../components/Heart';
import {Table,Space} from 'antd';
function Favorite() {


  const getFavoriteData = ()=>{
    
      let data = localStorage.getItem("data") || "[]";
      data = JSON.parse(data);
      
      return data;  
  }
  


  const tableData = () =>{
    const data = getFavoriteData().map((favorite)=>{
      return(
        {
          id: favorite.id,
          title: favorite.title,
          date: favorite.date,
          link: favorite.link,
          author: favorite.author
        }
      )
    })
    return data
  }



  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'link',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: 'author',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Heart id={record.id} title={record.title} date={record.date} link={record.link} author={record.author}/>
        </Space>
      ),
    },
  ]

  return (
    <div>
      {
        
          <Table dataSource={tableData()} columns={columns} pagination={{position: ["none","none"]}}/>
          
        
      }
    </div>
  )
}

export default Favorite