import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Heart from "../components/Heart";
import Pagination from "../components/Pagination";
import { LoadingOutlined } from '@ant-design/icons';
import {Table,Space,Input, Select,Spin} from 'antd';
import styles from "./styles/Home.module.css"
import { decodeHTMLEntities, formatDate } from "../utils/format";
const { Search } = Input;


const fetchArticles = (page,pageLimit=20,searchText="",orderBy="date") => {
  return axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?per_page=${pageLimit}&page=${page}&search=${searchText}&orderby=${orderBy}&context=embed`);
}

const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);



function Home() {
 
  const tableData = () =>{
    const result = data.data.map((article)=>{
      return(
        {
          id: article.id,
          title: decodeHTMLEntities(article.title.rendered),
          date: formatDate(article.date),
          link: article.link,
          author: article?._links.author.href
        }
      )
    })
    return result
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Titulek',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Datum',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Odkaz',
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => (
        <a href={record.link}>{record.link}</a>
      )
    },
    {
      title: 'Autor',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Přidat / Odebrat',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Heart id={record.id} title={record.title} date={record.date} link={record.link} author={record.author}/>
        </Space>
      ),
    },
  ]

  const changeHandler = (e) =>{
    setPageLimit(parseInt(e))
    setPage(1)
    setMaximumPages(data?.headers["x-wp-totalpages"])

    setTimeout(() => {
      refetch();
    }, 1000);

    
  }
  

  const [pageLimit,setPageLimit] = useState(20);
  const [page, setPage] = useState(1)
  const [searchText,setSearchText] = useState("");
  const [orderBy,setOrderBy] = useState("date");
  const {data,isLoading,refetch,isFetching} = useQuery(["articles", page], ()=>fetchArticles(page,pageLimit,searchText,orderBy))
  const [maximumPages,setMaximumPages] = useState(null)

  useEffect(()=>{
    setMaximumPages(Number(data?.headers["x-wp-totalpages"]))
  },[data])

  const inputHandler = (e) =>{
    setSearchText(e.target.value);
  }

  const sendHandler = () =>{
    refetch();
  }

  const filterHandler = (e) =>{
    setOrderBy(e);
    setTimeout(() => {
      refetch();
    }, 1000);
  }


  if(isLoading || isFetching){
    return <Spin indicator={loadingIcon} />
  }

  return (
    <>
    <Search style={{width:"300px"}} value={searchText} placeholder="Hledat" onChange={inputHandler} onSearch={sendHandler} enterButton />
   

    <Select
      defaultValue={orderBy}
      onChange={filterHandler}
      options={[
        {
          value: 'date',
          label: 'Datum',
        },
        {
          value: 'title',
          label: 'Článek',
        },
        {
          value: 'author',
          label: 'Autor',
        }
      ]}
    />
    
    <Table dataSource={tableData()} columns={columns} pagination={{pageSize:pageLimit, position: ["none","none"]}}/>
    <footer className={styles.footer}>
    <Pagination maximumPages={maximumPages} page={page} setPage={setPage}/>
    <Select
      defaultValue={pageLimit}
      onChange={changeHandler}
      options={[
        {
          value: 20,
          label: '20 / Stránek',
        },
        {
          value: 50,
          label: '50 / Stránek',
        },
        {
          value: 100,
          label: '100 / Stránek',
        }
      ]}
    />
    </footer>
    
    </>
  );
}



export default Home;
