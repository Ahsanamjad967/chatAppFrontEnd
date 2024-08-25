import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.user}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
