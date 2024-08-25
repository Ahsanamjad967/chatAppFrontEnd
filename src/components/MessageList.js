import React from 'react';
import './Chat.css'; // Importing the CSS file

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong className="user">{msg.user}:</strong> <span className="content">{msg.content}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
