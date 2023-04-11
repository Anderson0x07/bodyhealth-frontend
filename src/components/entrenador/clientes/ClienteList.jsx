import React, { useState } from 'react'

function ClienteList({ entrenador }) {

    const [clientes, setClientes] = useState(entrenador.data.usuario.entrenadorClientes);

    console.log(entrenador);

    return (
        <div>ClienteList</div>
    )
}

export default ClienteList