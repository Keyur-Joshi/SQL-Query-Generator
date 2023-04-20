import React from "react";
import MessageDisplay from "./MessageDisplay";

interface userMessage {
  role: string;
  content: string;
}

interface MessageDisplayProps {
  userMessages: userMessage[];
}
const MessagesDisplay = ({ userMessages }: MessageDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage, _index) => (
        <MessageDisplay key={_index} message={userMessage} />
      ))}
    </div>
  );
};

export default MessagesDisplay;
