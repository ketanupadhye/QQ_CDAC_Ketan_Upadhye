import React, { useState, useEffect } from 'react';
import './App.css';
import './chat.css'

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div className="App">
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
