/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'kermy';
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (messageText: string) => void;
  isConnected: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isConnected }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputValue.trim() && isConnected) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-interface-container" aria-live="polite">
      <div className="chat-log" ref={chatLogRef} role="log">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'kermy-message'}`}
          >
            <p className="message-text">{msg.text}</p>
            <span className="message-timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
      <form className="chat-input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isConnected ? "Type your message..." : "Connect to chat"}
          aria-label="Chat message input"
          disabled={!isConnected}
        />
        <button
          type="submit"
          className="send-button button"
          aria-label="Send chat message"
          disabled={!isConnected || !inputValue.trim()}
        >
          <span className="icon">send</span>
        </button>
      </form>
    </div>
  );
}