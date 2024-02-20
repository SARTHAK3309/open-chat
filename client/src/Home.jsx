import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function App({socket}) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    socket.emit('newUser', {username : userName, id: socket.id});
    navigate('/chat');

  }
  return (
    <form className="home__container" onSubmit={handleSubmit}>
    <h2 className="home__header">Sign in to Open Chat</h2>
    <label htmlFor="username">Username</label>
    <input
      type="text"
      minLength={6}
      name="username"
      id="username"
      className="username__input"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
    <button className="home__cta">SIGN IN</button>
  </form>
  );
}

