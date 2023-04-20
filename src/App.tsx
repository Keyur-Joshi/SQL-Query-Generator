import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";

interface chatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<chatData[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getQuery();
    }
  };

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      };
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );

      const data = await response.json();
      console.log(data);
      const userMessage = {
        role: "user",
        content: value
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = async () => {
    setValue("");
    setChat([]);
  };

  const filterUserMessages = chat.filter((message) => message.role === "user");
  const latestCode = chat
    .filter((message) => message.role === "assistant")
    .pop();

  return (
    <div className="app">
      <MessagesDisplay userMessages={filterUserMessages} />
      <input
        placeholder="Try this... Find all users in US who have credit score above 1000"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <CodeDisplay text={latestCode?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Query
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
