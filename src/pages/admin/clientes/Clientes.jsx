import React from "react";
import styled from "styled-components";
import ClienteList from "../../../components/admin/clientes/ClienteList";

function Clientes() {
  return (
    <Container>
      <ClienteList/>
    </Container>
  );
}

export default Clientes;

const Container = styled.div`
  height: 100vh;
`;