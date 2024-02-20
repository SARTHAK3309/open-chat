import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatBody = ({socket, users, messages, setMessages}) => {
  const [message, setmessage] = useState("");
  const navigate = useNavigate();
  const chatAreaRef = useRef()

  useEffect(()=>{
    chatAreaRef.current.scrollTop =  chatAreaRef.current.scrollHeight

  }, [messages])

  const handleLeaveChat = ()=>{
    users = users.filter(user => user.id != socket.id)
    socket.emit("leaveChat", users)
      navigate(-1)
  }


  const sendMessage = (event)=>{
      event.preventDefault()  
    let Message = message;
      Message = Message.trim()
      if(Message == "") return 
      socket.emit("sendMessage", { id : socket.id, message : Message})
  }
  return (
    <div className='chat-body'>

    <div className="chat-body-header">
        <div>Hangout With Colleagues</div>
        <div className='leave-chat' onClick = {handleLeaveChat}>
          LEAVE CHAT
        </div>
    </div>

    <div className='chat-area' ref = {chatAreaRef}>
      
     

      {
        messages?.map((message,index) => 
          (
            <>
            {/* {chatAreaRef.current.scrollTop =  chatAreaRef.current.scrollHeight} */}
            {message.id === socket.id ? 
            <div className='personal-message'>
              <div className='my-message-header'>You</div>
              <div className="personal-message-body" key = {index}>
                {message.message}
             </div>
             </div>
             :
             <div className='other-message'>
             <span>{message.id}</span>
             <div className="other-message-body" key = {index}>
               {message.message}
            </div>
            </div>
          }
            </>
          ))
      }
    </div>







      <form method = "GET" action = "/chat" onSubmit={e => (sendMessage(e))}>
    <div className='chat-footer'>
    <input onChange = {e=>setmessage(e.target.value)} /> 
    <div className='send-message leave-chat' onClick = {e => (sendMessage(e))} >
          SEND
        </div>
    </div>
    </form>
    </div>
  )
}

export default ChatBody