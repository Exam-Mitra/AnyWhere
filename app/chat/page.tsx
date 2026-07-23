'use client';

import React, { useState, useRef } from 'react';

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
  
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

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
    
    setTimeout(() => {
      const names = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Casey', 'Riley', 'Morgan'];
      setStrangerName(names[Math.floor(Math.random() * names.length)]);
      setStep('chat');
      setTimeout(() => {
        addMessage(`Hey! Saw you're into ${selectedInterests[0]}. What's up?`, false);
      }, 900);
    }, 2400);
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
    const userMsg = input.trim();
    setInput('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        `That's cool! I've been really into ${selectedInterests[0]} lately too.`,
        `Haha same. What got you started with that?`,
        `Interesting. Have you tried anything new recently?`,
        `Totally agree. It's one of my favorite things right now.`,
        `Nice! I'm actually pretty new to it but loving it.`
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)], false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVideo = async () => {
    if (!isVideoEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        
        setTimeout(() => {
          if (remoteVideoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(remoteStream => {
              if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
            });
          }
        }, 1100);
        setIsVideoEnabled(true);
        setIsVoiceOnly(false);
      } catch {
        alert("Camera access denied");
      }
    } else {
      if (localStream) localStream.getTracks().forEach(t => t.stop());
      setLocalStream(null);
      setIsVideoEnabled(false);
    }
  };

  const toggleVoiceOnly = async () => {
    if (!isVoiceOnly) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        setLocalStream(stream);
        setIsVoiceOnly(true);
        setIsVideoEnabled(false);
      } catch {
        alert("Microphone access denied");
      }
    } else {
      if (localStream) localStream.getTracks().forEach(t => t.stop());
      setLocalStream(null);
      setIsVoiceOnly(false);
    }
  };

  const endChat = () => {
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    window.location.href = '/';
  };

  const blockUser = () => {
    alert(`${strangerName} has been blocked.`);
    endChat();
  };

  const submitReport = () => {
    if (!reportReason.trim()) return;
    alert("Report submitted. Thank you.");
    setShowReportModal(false);
    setReportReason('');
    endChat();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Header */}
      <nav className="border-b border-[#27272a] bg-[#0a0a0a]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3b82f6] rounded-2xl flex items-center justify-center">
              <span className="font-bold text-2xl tracking-tighter">S</span>
            </div>
            <div>
              <div className="font-semibold text-3xl tracking-tighter">StrangerLine</div>
              {step === 'chat' && (
                <div className="text-xs text-[#22c55e] -mt-1">Connected with {strangerName}</div>
              )}
            </div>
          </div>
          
          {step === 'chat' && (
            <div className="flex items-center gap-3">
              <button onClick={() => setShowReportModal(true)} className="text-sm px-5 py-2 rounded-2xl border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10">Report</button>
              <button onClick={blockUser} className="text-sm px-5 py-2 rounded-2xl border border-[#27272a]">Block</button>
              <button onClick={endChat} className="text-sm px-5 py-2 rounded-2xl border border-[#27272a]">End chat</button>
            </div>
          )}
        </div>
      </nav>

      {/* INTEREST SELECTION */}
      {step === 'interests' && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-6xl font-semibold tracking-tighter mb-4">What are you into?</h1>
            <p className="text-xl text-[#a1a1aa] mb-10">Select up to 4 interests</p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`tag text-base px-6 py-3 transition-all ${selectedInterests.includes(interest) ? 'active !bg-[#3b82f6] !border-[#3b82f6] text-white' : ''}`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <button
              onClick={startMatching}
              disabled={selectedInterests.length === 0}
              className="btn-primary disabled:opacity-50 px-14 py-4 text-xl font-medium rounded-3xl"
            >
              Find someone to talk to
            </button>
            <p className="text-xs text-[#71717a] mt-4">{selectedInterests.length}/4 selected</p>
          </div>
        </div>
      )}

      {/* MATCHING SCREEN */}
      {step === 'matching' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-8" />
            <div className="text-3xl font-semibold tracking-tight">Finding your match...</div>
            <div className="text-[#71717a] mt-3">This usually takes a few seconds</div>
          </div>
        </div>
      )}

      {/* CHAT + VIDEO INTERFACE */}
      {step === 'chat' && (
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-6 gap-6">
          {/* Video Section */}
          {(isVideoEnabled || isVoiceOnly) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative bg-[#111111] border border-[#27272a] rounded-3xl overflow-hidden aspect-video">
                <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-xs rounded-full">You</div>
              </div>
              <div className="relative bg-[#111111] border border-[#27272a] rounded-3xl overflow-hidden aspect-video">
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-xs rounded-full">{strangerName}</div>
              </div>
            </div>
          )}

          {/* Chat Window */}
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <div className="flex-1 chat-window flex flex-col overflow-hidden min-h-[480px]">
              <div className="flex-1 p-8 overflow-y-auto space-y-6 text-[15px]" id="messages">
                {messages.length === 0 && (
                  <div className="text-center text-[#71717a] mt-16">
                    You're now chatting with <span className="text-white">{strangerName}</span>.<br />Say hi!
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[78%] px-6 py-4 rounded-3xl ${msg.isUser ? 'bg-[#3b82f6] text-white rounded-br-md' : 'bg-[#1a1a1a] rounded-bl-md'}`}>
                      {msg.text}
                      <div className={`text-[10px] mt-2 ${msg.isUser ? 'text-[#93c5fd]' : 'text-[#52525b]'}`}>{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a1a] px-6 py-4 rounded-3xl rounded-bl-md">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce delay-100" />
                        <div className="w-1.5 h-1.5 bg-[#52525b] rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-[#27272a] p-5 bg-[#111111]">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#1a1a1a] border border-[#27272a] rounded-3xl px-7 py-4 text-[15px] focus:outline-none focus:border-[#3b82f6]"
                  />
                  <button onClick={sendMessage} disabled={!input.trim()} className="btn-primary px-8 rounded-3xl font-medium disabled:opacity-40">Send</button>
                </div>
              </div>
            </div>

            {/* Sidebar Controls */}
            <div className="w-full md:w-80 card p-6 flex flex-col gap-4">
              <div className="text-sm text-[#a1a1aa] mb-1">Media</div>
              
              <button onClick={toggleVideo} className={`w-full py-4 rounded-3xl font-medium ${isVideoEnabled ? 'bg-[#ef4444]' : 'btn-primary'}`}>
                {isVideoEnabled ? 'Stop Video' : 'Enable Video + Mic'}
              </button>
              
              <button onClick={toggleVoiceOnly} className={`w-full py-4 rounded-3xl font-medium ${isVoiceOnly ? 'bg-[#ef4444]' : 'btn-secondary'}`}>
                {isVoiceOnly ? 'Stop Voice' : 'Voice Only'}
              </button>

              {/* Ad */}
              <div className="mt-auto pt-6 border-t border-[#27272a]">
                <div className="bg-[#1a1a1a] border border-[#27272a] rounded-3xl p-5 text-center">
                  <div className="text-xs text-[#52525b]">SPONSORED</div>
                  <div className="text-sm mt-1">Try <span className="font-medium">Notion AI</span></div>
                  <div className="text-[#3b82f6] text-xs mt-1">Get 20% off →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="card w-full max-w-md p-8">
            <h3 className="text-3xl font-semibold tracking-tight mb-3">Report {strangerName}</h3>
            <textarea
              value={reportReason}
              onChange={e => setReportReason(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full h-28 bg-[#1a1a1a] border border-[#27272a] rounded-3xl p-5 text-sm resize-none focus:outline-none focus:border-[#ef4444]"
            />
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowReportModal(false)} className="btn-secondary flex-1 py-4 rounded-3xl">Cancel</button>
              <button onClick={submitReport} disabled={!reportReason.trim()} className="btn-primary flex-1 py-4 rounded-3xl disabled:opacity-50">Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
