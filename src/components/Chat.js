import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import MessageList from './MessageList';

const socket = io('https://chatapp-production-4d3e.up.railway.app');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    // Fetch initial messages
    axios.get('https://chatapp-production-4d3e.up.railway.app/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));

    // Listen for new messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && user.trim()) {
      const newMessage = { user, content: message };
      socket.emit('sendMessage', newMessage);
      axios.post('https://chatapp-production-4d3e.up.railway.app/messages', newMessage)
        .catch(error => console.error('Error sending message:', error));
      setMessage('');
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.title}>Chat Application</h2>
      <div style={styles.inputContainer}>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          style={styles.userInput}
        />
      </div>
      <MessageList messages={messages} />
      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.messageInput}
        />
        <button type="submit" style={styles.sendButton}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  chatContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  userInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  messageInput: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Chat;
