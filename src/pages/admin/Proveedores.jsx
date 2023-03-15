import React from "react";
import styled from "styled-components";
import ProveedorList from "../../components/admin/proveedores/ProveedorList";

function Proveedores() {

  return (
    <Container>
      <ProveedorList/>
    </Container>
  );
}

export default Proveedores;

const Container = styled.div`
  height: 100vh;
`;

