import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { askGeminiAboutPresentation } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a IA da Nordeste. Posso tirar dúvidas sobre os custos e tecnologias apresentados. Pergunte!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askGeminiAboutPresentation(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Erro ao comunicar.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50 flex items-center gap-2"
        >
          <Sparkles size={24} />
          <span className="font-semibold hidden md:inline">Perguntar à IA</span>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-gray-900 border-l border-gray-700 shadow-2xl z-50 flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Bot className="text-purple-400" />
                <h3 className="text-white font-bold">Nordeste AI</h3>
            </div>
            <button onClick={toggleOpen} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                   <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700">
                        <span className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                        </span>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ex: Quanto economizamos?"
                className="flex-1 bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
