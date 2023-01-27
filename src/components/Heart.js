import React, { useState } from 'react'
import styled from 'styled-components';

function Heart({id,title,date,link,author=""}) {

  const [isSet, setIsSet] = useState(isInMemory()); 
  
  function isInMemory(){
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    if(data == null){
        return false
    }
    for (let i = 0; i < data.length; i++) {
        if(data[i].id === id){
            return true;
        }
        
    }
   
    return false;
  }


  const save = () =>{
    
   if(!isSet){
    setIsSet(!isSet)
    let info = {
        id,
        set: !isSet,
        title,
        date,
        link,
        author
    }
    let oldInfo = localStorage.getItem("data") || "[]"
    oldInfo = JSON.parse(oldInfo);
    oldInfo.push(info)
    info = JSON.stringify(oldInfo);
    localStorage.setItem("data", info);
   } 
   else{
    setIsSet(!isSet)
    let info = JSON.parse(localStorage.getItem("data"));
    info = info.filter((item)=> item.id !== id)
    info = JSON.stringify(info);
    localStorage.setItem("data", info);
   }
   
  }

  return (
    <StyledHeart onClick={save}>
        {
          isSet ? "❤️" : "🖤"
        }
    </StyledHeart>
  )
}

const StyledHeart = styled.div`
  font-size: 30px;
  cursor: pointer;
  &:hover{
    color: crimson
  }
`

export default Heart