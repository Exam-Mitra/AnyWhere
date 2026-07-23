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
  
  // Video & Voice states
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

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
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

  // WebRTC Video Functions
  const toggleVideo = async () => {
    if (!isVideoEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Simulate remote video (for demo)
        setTimeout(() => {
          if (remoteVideoRef.current) {
            // Use a second getUserMedia as a demo "remote" stream
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(remoteStream => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            });
          }
        }, 1200);

        setIsVideoEnabled(true);
        setIsVoiceOnly(false);
      } catch (err) {
        alert("Camera access denied. Please allow camera permissions.");
      }
    } else {
      // Turn off video
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      setLocalStream(null);
      setIsVideoEnabled(false);
    }
  };

  const toggleVoiceOnly = async () => {
    if (!isVoiceOnly) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: false, 
          audio: true 
        });
        
        setLocalStream(stream);
        setIsVoiceOnly(true);
        setIsVideoEnabled(false);
      } catch (err) {
        alert("Microphone access denied.");
      }
    } else {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      setLocalStream(null);
      setIsVoiceOnly(false);
    }
  };

  const endChat = () => {
    // Clean up media streams
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    window.location.href = '/';
  };

  const blockUser = () => {
    alert(`User ${strangerName} has been blocked. You won't be matched with them again.`);
    endChat();
  };

  const submitReport = () => {
    if (!reportReason.trim()) return;
    
    alert(`Thank you. Your report has been submitted.\nReason: ${reportReason}`);
    setShowReportModal(false);
    setReportReason('');
    endChat();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Header */}
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

        <div className="flex items-center gap-3">
          {step === 'chat' && (
            <>
              <button 
                onClick={() => setShowReportModal(true)}
                className="text-sm px-4 py-2 rounded-full border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
              >
                Report
              </button>
              <button 
                onClick={blockUser}
                className="text-sm px-4 py-2 rounded-full border border-[#27272a] hover:bg-[#1a1a1a] transition-colors"
              >
                Block
              </button>
            </>
          )}
          <button 
            onClick={endChat}
            className="text-sm px-4 py-2 rounded-full border border-[#27272a] hover:bg-[#1a1a1a] transition-colors"
          >
            End chat
          </button>
        </div>
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

      {/* CHAT + VIDEO INTERFACE */}
      {step === 'chat' && (
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 gap-4">
          {/* Video Section */}
          {(isVideoEnabled || isVoiceOnly) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Local Video */}
              <div className="relative bg-[#111111] rounded-3xl overflow-hidden border border-[#27272a] aspect-video">
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 text-xs rounded-full">
                  You
                </div>
              </div>

              {/* Remote Video */}
              <div className="relative bg-[#111111] rounded-3xl overflow-hidden border border-[#27272a] aspect-video">
                <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 text-xs rounded-full">
                  {strangerName}
                </div>
                {!isVideoEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#111111]">
                    <div className="text-center">
                      <div className="text-[#71717a]">Voice only mode</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat + Controls */}
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Chat Window */}
            <div className="flex-1 chat-window flex flex-col overflow-hidden min-h-[420px]">
              <div className="flex-1 p-6 overflow-y-auto space-y-6" id="messages">
                {messages.length === 0 && (
                  <div className="text-center text-[#71717a] mt-10">
                    <p>You're now chatting with {strangerName}</p>
                    <p className="text-sm mt-1">Say hi! Try enabling video</p>
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

              {/* Message Input */}
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
              </div>
            </div>

            {/* Video Controls Sidebar */}
            <div className="w-full md:w-72 card p-5 flex flex-col gap-4">
              <div className="text-sm font-medium text-[#a1a1aa] mb-1">Media controls</div>
              
              <button 
                onClick={toggleVideo}
                className={`w-full py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all ${
                  isVideoEnabled 
                    ? 'bg-[#ef4444] hover:bg-[#dc2626]' 
                    : 'btn-primary'
                }`}
              >
                {isVideoEnabled ? 'Stop Video' : 'Enable Video + Mic'}
              </button>

              <button 
                onClick={toggleVoiceOnly}
                className={`w-full py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all ${
                  isVoiceOnly 
                    ? 'bg-[#ef4444] hover:bg-[#dc2626]' 
                    : 'btn-secondary'
                }`}
              >
                {isVoiceOnly ? 'Stop Voice' : 'Voice Only'}
              </button>

              <div className="text-[10px] text-center text-[#52525b] pt-3 border-t border-[#27272a]">
                WebRTC powered • Real-time
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="card w-full max-w-md p-8">
            <h3 className="text-2xl font-semibold tracking-tight mb-2">Report {strangerName}</h3>
            <p className="text-[#a1a1aa] mb-6">Help us keep the platform safe. Why are you reporting this user?</p>

            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Describe the issue (harassment, inappropriate content, etc.)"
              className="w-full h-28 bg-[#1a1a1a] border border-[#27272a] rounded-2xl p-4 text-sm resize-none focus:outline-none focus:border-[#ef4444]"
            />

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                }}
                className="btn-secondary flex-1 py-3 rounded-2xl"
              >
                Cancel
              </button>
              <button 
                onClick={submitReport}
                disabled={!reportReason.trim()}
                className="btn-primary flex-1 py-3 rounded-2xl disabled:opacity-50"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
