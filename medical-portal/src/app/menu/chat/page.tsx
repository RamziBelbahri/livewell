"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../../lib/messages';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';



const getMessages = async () => {
    try {
      const response = await fetch('/api/get-messages');
      const jsonData = await response.json();
      const messages: Message[] = jsonData.result.rows;
      return messages;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const addMessage = async (message: Message) => {
    try {
      await fetch(`/api/add-message?userName=${message.userName}&content=${message.content}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  export const ChatComponent =  ({ role }: { role: string })=> {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    };
  
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({  });
      }
    }, [messages]);
  
    useEffect(() => {
      fetchMessages();
    }, []);
    
    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputValue(e.target.value);
    };
  
    const handleSendMessage = async () =>  {
      if (inputValue.trim() !== '') {
        const newMessage: Message = {userName: role, content: inputValue}
        setInputValue('');
        await addMessage(newMessage);
        await fetchMessages();
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', border: '1px solid #ccc', borderRadius: '10px'}}> 
        <div style={{ height: '400px', overflowY: 'scroll',  }} className="messages">
          {messages?.map((message, index) => (
            <div key={index} className="message"> 
                      <Chip label={message.content} avatar={<Avatar alt={message.userName} src={`/${role}.png`} />} />
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
        </div>
        </Container>
    );
  
   
  };
  