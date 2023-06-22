import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardLink(props) {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(props.link)} style={{
      color: "white"
    }}>
      <h1 style={{
        backgroundColor: "#1877F2",
        borderRadius: "8px",
        width: "350px",
        height: "50px",
        lineHeight: "50px",
        fontSize: "20px"
      }}>{props.name}</h1>
    </div>
  )
}
