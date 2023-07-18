import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from '../../components/admin/dashboard/AppWidgetSummary';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../utils/HandleApi';
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FitnessCenter, MonitorHeart, Check, RunCircle, PeopleAltTwoTone, Groups, Category, ProductionQuantityLimits, GroupAdd, ArtTrack } from '@mui/icons-material';

// ----------------------------------------------------------------------

function HomeAdmin({ admin }) {

  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await procesarPeticionGet(`admin/info/${admin.id_usuario}`);
        setInfo(response.data.informacion);
        console.log("Adnddede")
        console.log(response)

      } catch (error) {
        console.log("se toteó")
      }
    }

    getInfo();
  }, [])


  const formatTotalFacturas = (value) => {
    return (value / 1000).toFixed() + ' mil';
  };
  const formatTotalVentas = (value) => {
    return (value / 1000000).toFixed(1) + ' mill';
  };

  const convertirMes = (mes) => {
    const mesesEnEspanol = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return mesesEnEspanol[mes - 1];
  };

  const customTooltipContent = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const mes = convertirMes(payload[0].payload.mes);
      const totalVentas = payload[0].payload.total_ventas;

      return (
        <div className="custom-tooltip">
          <p>Mes: {mes}</p>
          <p>Total Ventas: ${formatearNumero(totalVentas)}</p>
        </div>
      );
    }

    return null;
  };

  const legendPlanes = [
    { value: "Ventas planes", color: '#82ca9d',},
  ];
  const legendProductos = [
    { value: "Ventas productos", color:'#0C2AA6'},
  ];

  const formatearNumero = (number) => {
    return number.toLocaleString();
  }

  return (
    <>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, {admin.nombre + " " + admin.apellido}! <br></br> Aquí puedes ver información relevante sobre la empresa.
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
            <AppWidgetSummary title="Total Clientes" total={info.clientes} color="info" icon={<PeopleAltTwoTone />} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWidgetSummary title="Total Entrenadores" total={info.entrenadores} icon={<Groups />} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ mt: 3 }}>
                Ventas de planes
              </Typography>
            </div>
            <ResponsiveContainer width="100%" height="100%" aspect={2}>
              <AreaChart
                width={800}
                height={700}
                data={info.facturasPorMesPlanes}
                margin={{
                  top: 15,
                  right: 20,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tickFormatter={convertirMes}/>
                <YAxis tickFormatter={formatTotalFacturas}/>
                <Tooltip content={customTooltipContent}/>
                <Legend payload={legendPlanes} />
                <Area type="monotone" dataKey="total_ventas" stroke='#82ca9d' fill="#82ca9d" />

              </AreaChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ mt: 3 }}>
                Ventas de productos
              </Typography>
            </div>

            <ResponsiveContainer width="100%" height="100%" aspect={2}>
              <LineChart
                width={800}
                height={700}
                data={info.facturasPorMesProductos}
                margin={{
                  top: 15,
                  right: 20,
                  left: 20,
                  bottom: 5
                }}>
                <XAxis dataKey="mes" tickFormatter={convertirMes} />
                <YAxis tickFormatter={formatTotalVentas} />
                <Tooltip content={customTooltipContent}/>
                <Legend payload={legendProductos}/>
                <CartesianGrid strokeDasharray="3 3" />

                <Line type="monotone" dataKey="total_ventas" stroke='#0C2AA6' fill="#0C2AA6" />

              </LineChart>
            </ResponsiveContainer>
          </Grid>


          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Máquinas" total={info.maquinas} icon={<FitnessCenter />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Rutinas" total={info.rutinas} color="info" icon={<Check />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Musculos" total={info.musculos} color="warning" icon={<MonitorHeart />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Ejercicios" total={info.ejercicios} color="warning" icon={<RunCircle />} />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <AppWidgetSummary title="Total Proveedores" total={info.proveedores} color="info" icon={<GroupAdd />} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWidgetSummary title="Total Pedidos" total={info.pedidos} color="success" icon={<ArtTrack />} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWidgetSummary title="Total Compras" total={info.compras} icon={<ProductionQuantityLimits />} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppWidgetSummary title="Total Productos" total={info.productos} color="info" icon={<Category />} />
          </Grid>



        </Grid>
      </Container>
    </>
  );
}

export default HomeAdmin;