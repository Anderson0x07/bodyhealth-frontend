import React from 'react'
import Proveedor from '../../../components/admin/proveedores/Proveedor';
import styled from "styled-components";

function ProveedorEdit() {
  return (
    <Container>
      <Proveedor/>
    </Container>
  )
}


const Container = styled.div`
  height: 100vh;
`;

export default ProveedorEdit
