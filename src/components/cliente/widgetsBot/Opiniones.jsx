import React from 'react'
import Reseña from './Reseña'

export default function Opiniones() {

    const reseñas = [
        {
            persona: "Ana M.",
            puntuacion: "⭐⭐⭐⭐⭐",
            mensaje: "¡Increíble gimnasio! Me encanta la variedad de equipos y las clases grupales. El personal siempre está dispuesto a ayudar y motivarte. ",
            id: 1
        },
        {
            persona: "Carlos G.",
            puntuacion: "⭐⭐⭐⭐",
            mensaje: "El gimnasio es genial. Tiene todo lo que necesito: pesas, máquinas y entrenadores amigables. Las instalaciones están limpias y bien mantenidas. ¡Me siento motivado cada vez que entro!",
            id: 2
        },
        {
            persona: "Laura P.",
            puntuacion: "⭐⭐⭐⭐⭐",
            mensaje: "Este gimnasio es mi segundo hogar. El ambiente es acogedor y el personal siempre te saluda con una sonrisa. Las clases son divertidas y desafiantes. ¡Sin duda, un lugar increíble para entrenar y mantenerse en forma!",
            id: 3
        },
        {
            persona: "David R.",
            puntuacion: "⭐⭐⭐⭐",
            mensaje: "Es un gimnasio impresionante. Tienen equipos modernos y el personal es amable y servicial. Sin embargo, a veces puede estar muy concurrido. Aún así, es un excelente lugar para entrenar y alcanzar tus metas.",
            id: 4
        },
    ]

    return (
        <div style={
            {
                display: "flex",
                gap: "10px",
                flexDirection: "column"
            }
        }>
            <Reseña reseñas={reseñas} />
        </div>
    )
}
