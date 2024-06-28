import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import { FaRegPaperPlane } from 'react-icons/fa';
import "../App.css"

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username') ;
  const room = queryParams.get('room') ;


  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');

  useEffect(() => {
    const handlereceivemessage = (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    }
    const handleuserjoin = (data) => {
      const user = {
        username: `${data}`,
        message: `${data} is connected.`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`
      };

      setMessages(prevMessages => [...prevMessages, user]);
    }
    const handleUserConnectMessage = (data) => {
      console.log(data, username);
      if (data.username === username) {
        console.log('data......', data);

        const user = {
          username: `${data.username}`,
          message: `${data.username} is connected.`,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`
        };

        setMessages(prevMessages => [...prevMessages, user]);
      } else {
        alert(`${username} is already connected.`);
        navigate('/');
      }
    };

    const handleUserDisconnect = (data) => {
      const user = {
        username: `${data.username}`,
        message: `${data.username} left the room.`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
      setMessages(prevMessages => [...prevMessages, user]);
    };




    socket.on('userconnectmessage', handleUserConnectMessage);
    socket.on('receivemessage', handlereceivemessage);
    socket.on('userjoin', handleuserjoin);
    socket.on('userdisconnect', handleUserDisconnect);




    return () => {
      socket.off('userconnectmessage', handleUserConnectMessage);
      socket.off('userdisconnect', handleUserDisconnect);
    };
  }, [username, navigate]);

  const sendMessage = () => {

    const newMessage = {
      username: username,
      room: room,
      message: currentMsg,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    };
    socket.emit('sendMessage', newMessage);

    setMessages(prevMessages => [...prevMessages, newMessage]);

    setCurrentMsg('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.username === username ? "left" : "right"}`}>
            <div className='msg'>
              <div className='msg-message'>
                <p>{msg.message}</p>
              </div>
              <div className='msg-other'>
                <p>{msg.username}</p>
                <p>{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          name="sendmessage"
          id="sendmessage"
          value={currentMsg}
          onKeyPress={(event) =>
            event.key === "Enter" && sendMessage(event)
          }
          onChange={(e) => setCurrentMsg(e.target.value)}
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">
          <FaRegPaperPlane />
        </button>
      </div>
    </div>
  );



}

export default Chat;
