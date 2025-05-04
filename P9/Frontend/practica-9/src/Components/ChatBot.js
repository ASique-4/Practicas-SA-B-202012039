import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post('http://35.223.166.93/chatbot', {
        question: input,
        usuario_id: 1
      });

      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error al conectar con el chatbot.' }]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Asistente Virtual - P9</h1>
      <div style={styles.subtitle}>Angel Sique - 202012039</div>
      <div style={styles.chatbox} ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'bot' ? styles.bot : styles.user}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Enviar</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    background: '#f5faff'
  },
  header: {
    textAlign: 'center',
    marginBottom: '5px',
    color: '#005792'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px'
  },
  chatbox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    height: '400px',
    overflowY: 'auto',
    background: '#ffffff',
    marginBottom: '15px'
  },
  bot: {
    background: '#e6f0ff',
    padding: '10px',
    borderRadius: '10px',
    margin: '8px 0',
    maxWidth: '80%',
    color: '#003366'
  },
  user: {
    background: '#d1f7c4',
    padding: '10px',
    borderRadius: '10px',
    margin: '8px 0',
    maxWidth: '80%',
    marginLeft: 'auto',
    color: '#254117'
  },
  inputContainer: {
    display: 'flex'
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    background: '#005792',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Chatbot;
