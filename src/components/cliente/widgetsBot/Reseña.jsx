import React from "react";

export default function Reseña(props) {
  return (
    <>
      {props.reseñas.map((item) => (
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
            }}>{item.persona}</p>
            <p>{item.puntuacion}</p>
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
  );
}
