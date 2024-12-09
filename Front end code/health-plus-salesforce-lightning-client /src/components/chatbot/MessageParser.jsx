import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const m = message.toLowerCase();
    if (
      m.includes("hello") ||
      m.includes("hi") ||
      m.includes("hey") ||
      m.includes("greetings")
    ) {
      actions.handleGreeting();
    } else if (
      m.includes("how are you") ||
      m.includes("how's it going") ||
      m.includes("how are you doing") ||
      m.includes("how you doing")
    ) {
      actions.handleHowAreYou();
    } else {
      actions.handleNotFound();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
