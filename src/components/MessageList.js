import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div style={styles.messageList}>
      {messages.map((msg, index) => (
        <div key={index} style={styles.message}>
          <strong style={styles.user}>{msg.user}:</strong> <span style={styles.content}>{msg.content}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  messageList: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  message: {
    padding: '5px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  user: {
    color: '#007bff',
    marginRight: '5px',
  },
  content: {
    color: '#333',
  },
};

export default MessageList;
