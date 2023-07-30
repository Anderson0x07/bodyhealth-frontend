import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from '../widgetsBot/Overview';
import Redes from '../widgetsBot/Redes';
import Opiniones from '../widgetsBot/Opiniones';
import Planes from '../widgetsBot/Planes';
import AdquirirPlan from '../widgetsBot/AdquirirPlan';
import Suplementos from '../widgetsBot/Suplementos';
import AdquirirSuplemento from '../widgetsBot/AdquirirSuplemento';
import Entrenador from '../widgetsBot/Entrenador';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../../utils/HandleApi';
const botName = "Gym Chat"


function llenarConfig() {
  const [redes, setRedes] = useState(null);
  const [entrenadores, setEntrenadores] = useState(null);

  //USEEFFECT INFO BASICA
  const getInfo = async () => {
    try {
      const redes = await procesarPeticionGet(`infobasica/${1}`);
      setRedes(redes.data.infobasica);

      const entrenadores = await procesarPeticionGet("entrenador/all");
      setEntrenadores(entrenadores.data.entrenadores)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);


  const config = {
    initialMessages: [
      createChatBotMessage(`Hola, ¿En que te puedo ayudar?`),
      createChatBotMessage(
        "¡Aquí hay algunas opciones las cuales puedes escoger!",
        {
          withAvatar: false,
          delay: 500,
          widget: "overview"
        }
      ),
    ],
    state: {},
    botName: botName,
    widgets: [
      {
        widgetName: 'overview',
        widgetFunc: (props) => GeneralOptions(props),
        mapStateToProps: ['messages'],
      },
      {
        widgetName: "redes",
        widgetFunc: (props) => Redes(redes),
      },
      {
        widgetName: "reseñas",
        widgetFunc: (props) => Opiniones(props),
      },
      {
        widgetName: "planes",
        widgetFunc: (props) => Planes(props),
      },
      {
        widgetName: "adquirirPlan",
        widgetFunc: (props) => AdquirirPlan(props),
      },
      {
        widgetName: "suplementos",
        widgetFunc: (props) => Suplementos(props),
      },
      {
        widgetName: "adquirirSuplemento",
        widgetFunc: (props) => AdquirirSuplemento(props),
      },
      {
        widgetName: "entrenadores",
        widgetFunc: (props) => Entrenador(entrenadores),
      },
    ]

  };


  return config


}

export default llenarConfig;


