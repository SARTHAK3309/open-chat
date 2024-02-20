import React, { useEffect, useState } from 'react'

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        socket.on("newUserResponse" , (data)=>{
            setUsers(data)
        })
    }, [socket])


  return (
    <div className='chat-bar'>
        <div className='chat-bar-header'>
            Open Chat
        </div>


        <h3>ACTIVE USERS</h3>

        <div className='user-list'>
           
                {
                    users.map(user => 
                       ( <div className='user'>
                            {user.username}
                            </div>)
                        )
                }
            
        </div>
    </div>
  )
}

export default ChatBar