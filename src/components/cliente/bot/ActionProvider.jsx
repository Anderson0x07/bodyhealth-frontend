import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hola, ¡Gusto en conocerte!");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleOptions = (options) => {
    const botMessage = createChatBotMessage("¿Como puedo ayudarte?", {
      widget: "overview",
      loading: true,
      terminateLoading: true,
      ...options,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  const handleRedes = () => {
    const botMessage = createChatBotMessage("¡Aquí tienes nuestras redes para que te puedas comunicar con nosotros!", {
      widget: "redes",
      loading: true,
      terminateLoading: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleReseñas = () => {
    const botMessage = createChatBotMessage("¡Aquí puedes observar las opiniones de nuestros clientes!", {
      widget: "reseñas",
      loading: true,
      terminateLoading: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

   const handlePlanDetails = () => {
    const botMessage = createChatBotMessage("¡Aquí tienes información sobre nuestros planes!", {
      widget: "planes",
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

   const handleAdquirirPlan = () => {
    const botMessage = createChatBotMessage("¡Aquí puedes adquirir un plan!", {
      widget: "adquirirPlan",
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSuplementoDetails = () => {
    const botMessage = createChatBotMessage("¡Aquí tienes información sobre nuestros suplementos!", {
      widget: "suplementos",
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleAdquirirSuplemento = () => {
    const botMessage = createChatBotMessage("¡Aquí puedes adquirir tus suplementos!", {
      widget: "adquirirSuplemento",
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleEntrenadorDetails= () => {
    const botMessage = createChatBotMessage("¡Aquí tienes información sobre nuestros entrenadores!", {
      widget: "entrenadores",
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleOptions,
            handlePlanDetails,
            handleRedes,
            handleReseñas,
            handleAdquirirPlan,
            handleSuplementoDetails,
            handleAdquirirSuplemento,
            handleEntrenadorDetails
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
