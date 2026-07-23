'use client';

import React, { useState } from 'react';

const INTERESTS = [
  'Gaming', 'Music', 'Tech', 'Movies', 'Travel', 
  'Fitness', 'Books', 'Art', 'Food', 'Photography',
  'Programming', 'Startup', 'Sports', 'Fashion', 'Nature'
];

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
};

export default function ChatPage() {
  const [step, setStep] = useState<'interests' | 'matching' | 'chat'>('interests');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [strangerName, setStrangerName] = useState('Stranger');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 4) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const startMatching = () => {
    if (selectedInterests.length === 0) return;
    
    setStep('matching');
    
    // Simulate matching (2.5 seconds)
    setTimeout(() => {
      const names = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Casey', 'Riley', 'Morgan'];
      setStrangerName(names[Math.floor(Math.random() * names.length)]);
      setStep('chat');
      
      // Welcome message from stranger (or AI)
      setTimeout(() => {
        addMessage(`Hey! I saw you're into ${selectedInterests[0]}. What's up?`, false);
      }, 800);
    }, 2500);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    addMessage(input.trim(), true);
    const userInput = input.trim();
    setInput('');

    // Simulate AI response (hybrid fallback)
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Simple AI responses based on interests
      const responses = [
        `That's cool! I've been into ${selectedInterests[0]} a lot lately too.`,
        `Haha yeah, same. What got you started with that?`,
        `Interesting. Have you tried anything new recently?`,
        `Totally agree. It's actually one of my favorite things right now.`,
        `Nice! I'm actually pretty new to it but really enjoying it.`
      ];
      
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(aiResponse, false);
    }, 1100 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const endChat = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-[#27272a] bg-[#111111] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3b82f6] rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-xl tracking-tighter">S</span>
          </div>
          <div>
            <div className="font-semibold">Stranger • Talk</div>
            {step === 'chat' && (
              <div className="text-xs text-[#22c55e] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
                Connected with {strangerName}
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={endChat}
          className="text-sm px-4 py-2 rounded-full border border-[#27272a] hover:bg-[#1a1a1a] transition-colors"
        >
          End chat
        </button>
      </div>

      {/* INTEREST SELECTION */}
      {step === 'interests' && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-semibold tracking-tighter mb-4">What are you into?</h1>
              <p className="text-xl text-[#a1a1aa]">Select up to 4 interests to find better matches</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`tag text-base px-6 py-2.5 transition-all ${
                    selectedInterests.includes(interest) 
                      ? 'active !bg-[#3b82f6] !border-[#3b82f6] text-white' 
                      : ''
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={startMatching}
                disabled={selectedInterests.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-14 py-4 text-lg font-medium rounded-2xl"
              >
                Find someone to talk to
              </button>
              <p className="text-xs text-[#71717a] mt-4">
                {selectedInterests.length}/4 selected
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MATCHING SCREEN */}
      {step === 'matching' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <div className="text-2xl font-medium tracking-tight">Finding your match...</div>
            <div className="text-[#71717a] mt-2">This usually takes a few seconds</div>
          </div>
        </div>
      )}

      {/* CHAT INTERFACE */}
      {step === 'chat' && (
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
          {/* Chat Window */}
          <div className="chat-window flex-1 flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6" id="messages">
              {messages.length === 0 && (
                <div className="text-center text-[#71717a] mt-10">
                  <p>You're now chatting with {strangerName}</p>
                  <p className="text-sm mt-1">Say hi!</p>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-5 py-3 rounded-3xl text-[15px] leading-snug ${
                    msg.isUser 
                      ? 'bg-[#3b82f6] text-white rounded-br-md' 
                      : 'bg-[#1a1a1a] text-[#ededed] rounded-bl-md'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1.5 ${msg.isUser ? 'text-[#93c5fd]' : 'text-[#52525b]'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] px-5 py-3 rounded-3xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#27272a] p-4 bg-[#111111]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#1a1a1a] border border-[#27272a] rounded-2xl px-6 py-4 text-[15px] focus:outline-none focus:border-[#3b82f6]"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="btn-primary px-8 rounded-2xl font-medium disabled:opacity-40"
                >
                  Send
                </button>
              </div>
              <div className="text-center text-[10px] text-[#52525b] mt-3">
                AI fallback active • Conversation is private
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
