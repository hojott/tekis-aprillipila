"use client"

import React, { useState } from 'react';
import Markdown from 'marked-react';
import styles from '../styles/Chatbox.module.css';

const Chatbox = () => {
    const [messages, setMessages] = useState([
        { text: "Tervetuloa TKO-äly ryn nettisivulle! Miten voin auttaa?", sender: "bot" }
    ]);
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                }),
            });

            if (!response.body) {
                throw new Error('No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let botMessage = { text: '', sender: 'bot' };

            // Add the bot message placeholder to the state
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                botMessage.text += chunk;

                // Update the bot message incrementally
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = { ...botMessage };
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error('Error communicating with the chatbot API:', error);
            const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    return (
        <div className={styles.chatbox}>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        <Markdown className={styles.markdown}>{msg.text}</Markdown>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className={styles.input}
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default Chatbox;