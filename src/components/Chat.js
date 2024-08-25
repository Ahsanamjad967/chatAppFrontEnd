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
    <div>
      <h2>Chat Application</h2>
      <div>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />
      </div>
      <MessageList messages={messages} />
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
