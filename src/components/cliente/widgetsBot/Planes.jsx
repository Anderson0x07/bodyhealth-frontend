import React from "react";
import PlanCard from "./PlanCard";

export default function Planes() {
  const planArray = [
    {
      nombre: "Plan Platinum Anual",
      precio: "$999.999",
      mensaje:
        "Reservado para aquellos miembros comprometidos que deseen una membresía de largo plazo. Ofrece todos los beneficios del Plan Gold, pero con la ventaja adicional de una membresía anual con tarifa especial. Incluye acceso completo a todas las instalaciones, clases grupales, servicios exclusivos, y asesoramiento personalizado. Además de tener un estilo de vida saludable y en movimiento durante todo el año.",
    },
    {
      nombre: "Plan Gold",
      precio: "$99.900/Mes",
      mensaje:
        "Ofrece una amplia gama de servicios y beneficios exclusivos. Incluye acceso ilimitado a todas las áreas del gimnasio, clases grupales, servicios exclusivos y asesoramiento personalizado..",
    },
    {
      nombre: "Plan Silver",
      precio: "$79.900/Mes",
      mensaje:
        "Brinda a los miembros acceso a áreas, y equipos esenciales. Incluye acceso limitado a clases grupales, servicios exclusivos y asesoramiento semi-personalizado.",
    },
    {
      nombre: "Plan Bronze",
      precio: "$59.900/Mes",
      mensaje:
        "Proporciona acceso a las áreas y equipos esenciales del gimnasio, y asesoramiento semi-personalizado.",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <PlanCard planes={planArray} />
      <table style={{
        color: "black",
        borderCollapse: "collapse",
        width: "100%"
      }}>
        <thead>
          <tr >
            <th style={{ border: "1px solid black" }}></th>
            <th style={{ border: "1px solid black" }}>Bronze</th>
            <th style={{ border: "1px solid black" }}>Silver</th>
            <th style={{ border: "1px solid black" }}>Gold</th>
            <th style={{ border: "1px solid black" }}>Platinum Anual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>Asesoramiento semi-personalizado</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Asesoramiento personalizado</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Acceso completo a todas las instalaciones y áreas</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Acceso a áreas, y equipos esenciales</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Acceso a clases grupales y servicios exclusivos</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
            <td style={{ border: "1px solid black" }}>✔️</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Ahorro de $198.900 anualmente</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}>✔️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
