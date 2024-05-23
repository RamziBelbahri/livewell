'use client'

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter, useSearchParams, } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { ChatComponent } from './chat/page';

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



export default MenuComponent;
