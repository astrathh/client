// components/ChatBox.jsx
import React, { useRef, useEffect } from 'react';

const ChatBox = ({ chat }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="h-96 overflow-y-auto p-4 border border-gray-200 rounded-lg space-y-4">
      {chat.map((mensagem, index) => (
        <div
          key={index}
          className={`flex ${mensagem.tipo === 'pergunta' ? 'justify-start' : 'justify-end'} mt-2`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs ${mensagem.tipo === 'pergunta' ? 'bg-gray-100 text-gray-900' : 'bg-black text-white'} shadow-md`}
          >
            {mensagem.texto}
            <div className="text-xs text-gray-500 mt-2">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBox;