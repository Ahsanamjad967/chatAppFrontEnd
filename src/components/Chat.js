import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import MessageList from './MessageList';
import './Chat.css'; // Importing the CSS file

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
    <div className="chat-container">
      <h2 className="title">Chat Application</h2>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          className="user-input"
        />
      </div>
      <MessageList messages={messages} />
      <form onSubmit={handleSendMessage} className="form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
