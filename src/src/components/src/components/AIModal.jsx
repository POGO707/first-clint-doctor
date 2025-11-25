import React, { useState, useRef, useEffect } from 'react';

const AIModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am Dr. Bhakat\'s AI Assistant. How can I help you today regarding our services or general health questions?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Thank you for your question. For detailed medical advice, please consult Dr. Bhakat directly. For general information about our services, we provide emergency care and diabetes management.', 
        timestamp: new Date() 
      }]);
      setIsLoading(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-auto" onClick={onClose} />
      
      <div className="pointer-events-auto w-full sm:w-[400px] h-[80vh] sm:h-[600px] bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden animate-slide-up sm:mr-6 sm:mb-6 sm:ml-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <span>✨</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Health Assistant</h3>
              <p className="text-xs text-primary-100">Powered by AI</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition text-2xl">
            ✕
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                }`}>
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center">
                  🤖
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 px-4 py-2 text-[10px] text-yellow-800 border-t border-yellow-100 text-center">
          AI generated. Not a substitute for professional medical advice.
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about symptoms or services..."
              className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:bg-white transition text-sm outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white p-2 rounded-full transition shadow-md"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
