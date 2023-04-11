import React from 'react'

function Index({cliente}) {
  return (
    <div>
      {console.log(cliente)}
      <h1>Este es el index para cliente {cliente.nombre}</h1>

    </div>
  )
}

export default Index