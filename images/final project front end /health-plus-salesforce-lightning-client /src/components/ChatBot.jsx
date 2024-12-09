import React, { useState } from "react";
import ReactChatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

const ChatBot = () => {
  const [showBot, toggleBot] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 m-5 z-10 flex items-end flex-col gap-3">
      <div
        className={`transition-all duration-500 transform ${
          showBot ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="shadow-lg">
          <ReactChatbot
            config={config}
            headerText="Health Plus Bot"
            validator={Boolean}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </div>

      <button
        className={`w-16 h-16 rounded-full overflow-hidden transition-transform duration-300 ${
          showBot ? "rotate-45 scale-90" : "scale-100"
        }`}
        onClick={() => toggleBot((prev) => !prev)}
      >
        <img src="/bot.png" alt="a bot" />
      </button>
    </div>
  );
};

export default ChatBot;
