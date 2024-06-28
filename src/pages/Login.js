import React, { useEffect, useState } from 'react';
import socket from "../socket";
import { useNavigate } from 'react-router-dom';

function Login() {
  const Navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    console.log(username, "username");
    console.log(room, "room");
    socket.emit("Login",({username,room}))
    setUsername("");
    setRoom("");
    Navigate(`/Chat?username=${username}&room=${room}`);
  };

  return (
    <div className='new-ctn'>
      <form className="Login" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder='User Name'
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder='Room ID'
          name="room"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        /><br /><br />
        <button type="submit" className='Loginbutton'>Log in</button>
      </form>
    </div>
  );
}

export default Login;
