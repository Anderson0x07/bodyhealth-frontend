import React from 'react'

export default function Card(props) {
  return (
    <>
      {
        props.redes && props.redes.map((item, index) => (
          <a key={item.id} href={item.link} target="_blank" style={{
            color: "white"
          }}>
            <h1 style={{
              backgroundColor: item.bgColor,
              borderRadius: "8px",
              width: "350px",
              height: "50px",
              lineHeight: "50px",
              fontSize: "20px",
              marginBottom: "5px"
            }}>{item.name}</h1>
          </a>
        ))
      }
    </>
  )
}
