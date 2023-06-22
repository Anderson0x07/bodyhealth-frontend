import React, { useEffect, useState } from 'react'
import EntrenadorCard from './EntrenadorCard'
import { procesarPeticionGet } from '../../../utils/HandleApi';

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
