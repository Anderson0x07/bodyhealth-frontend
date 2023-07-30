import MessageParser from "./bot/MessageParser";
import ActionProvider from "./bot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { FaRobot } from "react-icons/fa"
import "./bot/chatbot.css"
import { useState } from "react";
import llenarConfig from "./bot/LlenarConfig";

const Chat = () => {
  const [showBot, toggleBot] = useState(false);

  const con = llenarConfig();

  console.log(con)

  const validateInput = (message) => {
    return message.match("^(?!s*$).+");
  };

  return (
    <div
      style={{
        margin: "40px 0",
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        right: "10px",
        bottom: "30px",
        zIndex: 9999,
        boxShadow: "5px 5px 13px rgba(91, 81, 81, 0.4)",
        borderRadius: "5px",
        transition:"all 5s"
      }}
    >
      {showBot && (
        <Chatbot
          config={con}
          messageParser={MessageParser}
          headerText="Gym Chat"
          placeholderText="Escribe algo..."
          actionProvider={ActionProvider}
          validator={validateInput}
        />
      )}
      <button
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          height: "50px",
          borderRadius: "8px",
          padding: "0.6em 1.2em",
          fontSize: "1em",
          fontWeight: "500",
          fontFamily: "inherit",
          background: "#1a1a1a",
          cursor: "pointer",
          transition: "border-color 0.25s",
        }}
        onClick={() => toggleBot((prev) => !prev)}
      >
        {<FaRobot/>}
      </button>
    </div>
  );
};

export default Chat;
