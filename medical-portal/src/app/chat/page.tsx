'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../lib/messages';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = { userName: 'Patient', content: inputValue, time: new Date().getDate() };
      setMessages([...messages, newMessage]);
      setInputValue('');
      // Here you would send the message to your backend or external service
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({  });
    }
  }, [messages]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', border: '1px solid #ccc', borderRadius: '10px'}}> 
      <div style={{ height: '500px', overflowY: 'scroll',  }} className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message"> 
                    {/* {message.userName}
                    : {message.content}       */}
                    <Chip label={message.content} avatar={<Avatar alt={message.userName} src="/patient.png" />} />
          </div>
        ))}
      <div ref={messagesEndRef}></div>
      </div>
      </Box>   
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleSendMessage}>Send</Button>
        <Button variant="contained" onClick={handleSendMessage}>Start new conversation</Button>
      </div>
      </Container>
  );

 
};

export default ChatComponent;