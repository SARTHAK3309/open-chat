import React, { useEffect, useState } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import './App.css'
const ChatPage = ({socket}) => {
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        socket.on("newUserResponse" , (data)=>{
            console.log("userresponse", data)
            setUsers(data)
        })
      
    socket.on("sendMessageResponse", (data)=>{
        setMessages(data)
    })
    
    }, [socket])


    

  return (
    <div className='chat-page'>
        <ChatBar socket = {socket} users = {users}/>


        <ChatBody socket = {socket} users =  {users} messages = {messages} setMessages = {setMessages} / >

    </div>
  )
}

export default ChatPage 