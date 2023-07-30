import React from 'react'
import EntrenadorCard from './EntrenadorCard'

export default function Entrenador(entrenadores) {

    console.log(entrenadores)
    
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
            }}
        >
            <EntrenadorCard entrenador={entrenadores} />
        </div>
    )
}
