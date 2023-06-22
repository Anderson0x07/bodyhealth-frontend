import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes('hola')) {
      actions.handleHello();
    }
    else if (
      message.toLowerCase().includes("opciones") ||
      message.toLowerCase().includes("ayuda") ||
      message.toLowerCase().includes("no se")
    ) {
      actions.handleOptions();
    }else{
      actions.handleOptions()
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;