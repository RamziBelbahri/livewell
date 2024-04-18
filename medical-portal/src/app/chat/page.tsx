'use client'

import React, { useState } from 'react';
import { Message } from '../lib/messages';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = { userName: 'patient', content: inputValue, time: new Date().getDate() };
      setMessages([...messages, newMessage]);
      setInputValue('');
      // Here you would send the message to your backend or external service
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={message.userName === 'patient' ? 'patient-message' : 'doctor-message'}>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }}>{message.content}</Box>
            </Container>
          </div>
            
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;