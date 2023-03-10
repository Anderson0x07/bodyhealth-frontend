import React from 'react'
import styled from 'styled-components'
import logo from "../../assets/react.svg"
import {v} from "../../style/Variables" 
import { AiOutlineLeft} from 'react-icons/ai'
export  function DashBoard({open,setOpen}) {
  const ModificarOpen=()=>{
setOpen(!open)

  }
  return (
    <Container isOpen={open}>

      <button className='button' onClick={ModificarOpen}>

        <AiOutlineLeft/>
      </button>
    <div className='Logocontent'>

      <div className='imgcontent'>
        <img src={logo}/>
      </div>
      <h1>
   
     DashBoard
      
      </h1>
      
    
    </div>
    </Container>
  )
}

const Container=styled.div`
colot:${(props)=>props.theme.text};
background:${(props)=>props.theme.bg};
position:sticky;
padding-top:20px;
.button{

  position: absolute;
  top: ${v.xxlSpacing};
  right: -18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.bgtgderecha};
  box-shadow: 0 0 4px ${(props) => props.theme.bg3},
    0 0 7px ${(props) => props.theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
  border: none;
  letter-spacing: inherit;
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  padding: 0;
  font-family: inherit;
  outline: none;
};
.Logocontent{
display:flex;
justify-content:center;
align-items:center;
padding-bottom:${v.lgSpacing};
.imgcontent {
  display: flex;
  img {
    max-width: 100%;
    height: auto;
  }
  cursor: pointer;
  transition: all 0.3s;
  transform: ${({ isOpen }) => (isOpen ? `scale(0.7)` : `scale(1.5)`)};
}
h1{

  display:${({isOpen})=>(isOpen?'block':'none')}

}

`
