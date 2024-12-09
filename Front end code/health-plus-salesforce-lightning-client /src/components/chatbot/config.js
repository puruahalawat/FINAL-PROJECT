import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const botName = "Health Plus Bot";

const config = {
  botName: "healthPlus",
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
};

export default config;
