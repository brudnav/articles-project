import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { LeftOutlined,RightOutlined,VerticalLeftOutlined,VerticalRightOutlined } from '@ant-design/icons';



const Pagination = ({setPage,page,maximumPages}) => {

    const pageNumber = (total,max,current) => {

        const half = Math.round(max/2)
        let to = max;
      
        if(current + half >= total){
          to = total;
        } else if(current > half){
          to = current + half;
        }
      
        let from = to - max;
      
        return Array.from({length: max},(_,i)=> (i + 1) + from)
      }
      const startHandler = ()=>{
        setPage(1);
      }

      const prevHandler = ()=>{
        setPage(page-1);
      }

      const numHandler = (pageNum)=>{
        setPage(pageNum);
      }

      const nextHandler = ()=>{
        setPage(page+1);
      }

      const endHandler = ()=>{
        setPage(maximumPages);
      }
      
      const [paginationPageLimit, setPaginationPageLimit] = useState(10);
      const [pages,setPages] = useState(pageNumber(maximumPages,paginationPageLimit,page))

      useEffect(()=>{
        setPages(pageNumber(maximumPages,paginationPageLimit,page))
      },[page,maximumPages,paginationPageLimit])
      
  return (
    <>
    <PaginationButtons>
        <PageButton onClick={startHandler} disabled={page === 1}><VerticalRightOutlined/></PageButton>
        <PageButton onClick={prevHandler} disabled={page === 1}><LeftOutlined /></PageButton>
        {
            pages?.map((item) => {
                return(
                    <PageButton onClick={()=>numHandler(item)} key={item} style={(item === page) ? activeButton: {}}>{item}</PageButton>
                )
            })
        }
        <PageButton onClick={nextHandler} disabled={page === maximumPages}><RightOutlined /></PageButton>
        <PageButton onClick={endHandler} disabled={page === maximumPages}><VerticalLeftOutlined/></PageButton>
    </PaginationButtons>
    </>
  )
}

const activeButton = {
  color: "#1677ff",
  borderColor: "#1677ff",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "6px",
}


const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const PageButton = styled.div`
  line-height: 35px;
  cursor: pointer;
  height: 35px;
  min-width: 35px;
  padding: 0 10px;
  transition: background 0.3s ease;
  text-align: center;

  ${props => props.disabled && `
    opacity: 0.3;
    cursor: not-allowed; 
  `}
`


export default Pagination