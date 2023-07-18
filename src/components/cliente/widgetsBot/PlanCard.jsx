import React from 'react'

export default function PlanCard(props) {
  return (
    <>
      {props.planes.map((item) => (
        <div style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          width: "320px",
          backgroundColor: "#f0ecec",
          borderRadius: "8px",
          padding: "15px"

        }}>
          <div style={{
            display: "flex",
            gap: "15px"
          }}>
            <p style={{
              fontWeight: "bold"
            }}>{item.nombre}</p>
            <p style={{
              color: "green",
              fontWeight: "bold"
            }}>{item.precio}</p>
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "justify"
            }}
          >{item.mensaje}</div>
        </div>
      ))}
    </>
  )
}
