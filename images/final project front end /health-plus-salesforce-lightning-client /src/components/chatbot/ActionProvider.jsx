import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleGreeting = () => {
    // Randomize response through greetings
    const greetings = [
      "Hello! How can I help you today?",
      "Hi there! Nice to meet you.",
      "Hey! How's it going?",
      "Greetings! What can I assist you with?",
    ];

    // Select a random greeting message
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    const botMessage = createChatBotMessage(randomGreeting);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHowAreYou = () => {
    // Array of responses to "How are you?"
    const responses = [
      "I'm doing great, thanks for asking! How about you?",
      "I'm good, how can I assist you today?",
      "I'm functioning well! How are you doing?",
      "I'm great, thanks for asking! What's on your mind?",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const botMessage = createChatBotMessage(randomResponse);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleNotFound = () => {
    const botMessage = createChatBotMessage(
      "We couldn't understand your message. Please try again."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleGreeting, handleNotFound, handleHowAreYou },
        });
      })}
    </div>
  );
};

export default ActionProvider;
