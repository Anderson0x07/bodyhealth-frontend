import React from 'react'
import SuplementoCard from './SuplementoCard'

export default function Suplementos() {

  const arraySuplemento = [
    {
      nombre: "Creatina",
      mensaje: "La creatina es un suplemento popular que se utiliza para aumentar la fuerza y el rendimiento muscular. Ayuda a regenerar el ATP (adenosín trifosfato), una molécula de energía clave para los músculos, lo que te permite entrenar con mayor intensidad y recuperarte más rápido."
    },
    {
      nombre: "Proteínas en polvo",
      mensaje: "Las proteínas en polvo son excelentes para promover la recuperación muscular y el crecimiento. Proporcionan los aminoácidos necesarios para la reparación y síntesis de proteínas musculares, ayudando a mejorar la fuerza y la masa muscular magra."
    },
    {
      nombre: "Pre-entrenos",
      mensaje: "Los pre-entrenos son formulados para brindarte un impulso de energía, concentración y resistencia durante tus sesiones de ejercicio. Estos suplementos suelen contener ingredientes como la cafeína, beta-alanina y citrulina, que te ayudan a mantener un alto nivel de rendimiento durante el entrenamiento."
    },
    {
      nombre: "BCAA(aminoácidos de cadena ramificada)",
      mensaje: "Los BCAA son aminoácidos esenciales que desempeñan un papel crucial en la síntesis de proteínas y la recuperación muscular. Ayudan a reducir la fatiga durante el ejercicio, promueven la síntesis de proteínas y minimizan la degradación muscular."
    },
    {
      nombre: "Vitaminas",
      mensaje: "Las vitaminas son nutrientes esenciales que desempeñan múltiples funciones en el organismo. Los suplementos de vitaminas pueden ayudarte a mantener un equilibrio nutricional óptimo y apoyar la salud general, incluyendo la salud muscular y el metabolismo."
    },
  ]
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <SuplementoCard suplementos={arraySuplemento} />
    </div>
  )
}
