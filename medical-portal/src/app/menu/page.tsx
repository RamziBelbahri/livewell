'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../lib/messages';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Avatar, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material';
import { useRouter, useSearchParams, } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MenuComponent = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const contact = role === 'Patient' ? 'doctor' : 'patient'

    const handleClose = () => {
        setOpen(false);
      };
    

      return (
        <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          <Avatar src={`/${contact}.png`}></Avatar>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Conversation with {contact}</DialogTitle>
            <DialogContent>
                <ChatComponent role={role as string}/>                
            </DialogContent>
        </Dialog>
        <Button variant="contained" onClick={() => router.back()} sx={{ position: 'absolute', top: 10, right: 10, color: 'white', backgroundColor: 'red' }}>
          <ArrowBackIcon></ArrowBackIcon>
        </Button>
        </div>
      );
};


const getMessages = async () => {
  try {
    const response = await fetch('/api/get-messages'); // This corresponds to pages/api/data.js in Next.js
    const jsonData = await response.json();
    console.log("data: ", jsonData);
    return jsonData.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addMessage = async (message: Message) => {
  try {
    const response = await fetch(`/api/add-message?userName=${message.userName}&content=${message.content}`); // This corresponds to pages/api/data.js in Next.js
    const jsonData = await response.json();
    console.log("data: ", jsonData);
    return jsonData.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const ChatComponent =  ({ role }: { role: string })=> {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () =>  {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {userName: role, content: inputValue}
      // await addMessage(message);
      setMessages([...messages, newMessage]);
      setInputValue('');
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
      <div style={{ height: '400px', overflowY: 'scroll',  }} className="messages">
        {messages.map((message, index) => (
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

export default MenuComponent;