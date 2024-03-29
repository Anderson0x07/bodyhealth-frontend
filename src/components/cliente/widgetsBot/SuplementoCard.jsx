import React from 'react'

export default function SuplementoCard(props) {
  return (
    <>
      {props.suplementos && props.suplementos.map((item) => (
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
