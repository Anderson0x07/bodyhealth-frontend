import Options from "./Options";

const GeneralOptions = (props) => {

  const options = [
    {
      name: "Conoce más detalles sobre nuestros planes",
      handler: props.actionProvider.handlePlanDetails,
      id: 1
    },
    {
      name: "¡Adquiere un plan!",
      handler: props.actionProvider.handleAdquirirPlan,
      id: 2
    },
    {
      name: "Conoce más detalles sobre nuestros suplementos",
      handler: props.actionProvider.handleSuplementoDetails,
      id: 3
    },
    {
      name: "¡Adquiere un suplemento!",
      handler: props.actionProvider.handleAdquirirSuplemento,
      id: 4
    },
    {
      name: "Conoce más detalles sobre nuestros entrenadores",
      handler: props.actionProvider.handleEntrenadorDetails,
      id: 5
    },
    {
      name: "Nuestras redes sociales",
      handler: props.actionProvider.handleRedes,
      id: 6
    },
    {
      name: "Reseñas",
      handler: props.actionProvider.handleReseñas,
      id: 7
    },



  ];
  return <Options options={options} title="Selecciona una opción para más información" {...props} />;
};

export default GeneralOptions;
