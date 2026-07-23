'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTERESTS = ['Gaming','Music','Tech','Movies','Travel','Fitness','Books','Art','Food','Photography','Programming','Startup','Sports','Fashion','Nature'];

type Message = { id: number; text: string; isUser: boolean; timestamp: string };

export default function PremiumChat() {
  const [step, setStep] = useState<'interests' | 'matching' | 'chat'>('interests');
  const [selected, setSelected] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState('Stranger');
  const [videoOn, setVideoOn] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState('');

  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else if (selected.length < 4) {
      setSelected([...selected, interest]);
    }
  };

  const startMatching = () => {
    if (selected.length === 0) return;
    setStep('matching');
    
    setTimeout(() => {
      const names = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Casey'];
      setName(names[Math.floor(Math.random() * names.length)]);
      setStep('chat');
      setTimeout(() => {
        addMessage(`Hey! I see you're into ${selected[0]}. What's up?`, false);
      }, 800);
    }, 2200);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMsg: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessage(input.trim(), true);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replies = ["That's cool!", "Same here!", "Interesting!", "Haha yeah", "Nice!"];
      addMessage(replies[Math.floor(Math.random() * replies.length)], false);
    }, 1200);
  };

  const toggleVideo = async () => {
    if (!videoOn) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(s);
        if (localRef.current) localRef.current.srcObject = s;
        setVideoOn(true);
        setVoiceOn(false);
      } catch { alert("Camera access denied"); }
    } else {
      stream?.getTracks().forEach(t => t.stop());
      setStream(null);
      setVideoOn(false);
    }
  };

  const toggleVoice = async () => {
    if (!voiceOn) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        setStream(s);
        setVoiceOn(true);
        setVideoOn(false);
      } catch { alert("Microphone access denied"); }
    } else {
      stream?.getTracks().forEach(t => t.stop());
      setStream(null);
      setVoiceOn(false);
    }
  };

  const endChat = () => {
    stream?.getTracks().forEach(t => t.stop());
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center">
            <span className="text-black font-bold text-2xl">S</span>
          </div>
          <span className="font-semibold text-3xl tracking-tighter">StrangerLine</span>
        </div>
        {step === 'chat' && (
          <div className="flex gap-3">
            <button onClick={() => setShowReport(true)} className="px-5 py-2 text-sm border border-red-500/30 text-red-400 rounded-2xl">Report</button>
            <button onClick={endChat} className="px-5 py-2 text-sm border border-white/20 rounded-2xl">End chat</button>
          </div>
        )}
      </nav>

      {/* INTEREST SELECTION */}
      {step === 'interests' && (
        <div className="max-w-3xl mx-auto px-6 pt-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-6xl font-semibold tracking-tighter mb-4"
          >
            What are you into?
          </motion.h1>
          <p className="text-xl text-white/70 mb-10">Select up to 4 interests</p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {INTERESTS.map((interest, index) => (
              <motion.button
                key={interest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(interest)}
                className={`px-6 py-3 rounded-full border text-base transition-all ${selected.includes(interest) 
                  ? 'bg-white text-black border-white' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
              >
                {interest}
              </motion.button>
            ))}
          </div>

          <button 
            onClick={startMatching} 
            disabled={selected.length === 0}
            className="bg-white text-black px-14 py-4 rounded-3xl text-xl font-medium disabled:opacity-40"
          >
            Find someone to talk to
          </button>
          <p className="text-sm text-white/50 mt-4">{selected.length}/4 selected</p>
        </div>
      )}

      {/* MATCHING SCREEN */}
      {step === 'matching' && (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-8" />
            <div className="text-4xl font-semibold tracking-tight">Finding your match...</div>
            <div className="text-white/60 mt-3">This usually takes a few seconds</div>
          </div>
        </div>
      )}

      {/* CHAT INTERFACE */}
      {step === 'chat' && (
        <div className="max-w-6xl mx-auto p-6">
          {/* Video Section */}
          <AnimatePresence>
            {(videoOn || voiceOn) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden aspect-video relative"
                >
                  <video ref={localRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-xs rounded-full">You</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden aspect-video relative"
                >
                  <video ref={remoteRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-xs rounded-full">{name}</div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat Window */}
            <div className="flex-1 bg-zinc-900 border border-white/10 rounded-3xl flex flex-col min-h-[480px]">
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                {messages.length === 0 && (
                  <div className="text-center text-white/50 mt-20">You're now chatting with {name}. Say hi!</div>
                )}
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] px-6 py-4 rounded-3xl ${msg.isUser ? 'bg-white text-black' : 'bg-white/10'}`}>
                        {msg.text}
                        <div className="text-xs mt-2 opacity-60">{msg.timestamp}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-6 py-4 rounded-3xl">typing...</div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-5 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-7 py-4 focus:outline-none"
                  />
                  <button onClick={sendMessage} className="bg-white text-black px-8 rounded-3xl font-medium">Send</button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full md:w-80 bg-zinc-900 border border-white/10 rounded-3xl p-6 space-y-4">
              <button onClick={toggleVideo} className={`w-full py-4 rounded-3xl font-medium ${videoOn ? 'bg-red-600' : 'bg-white text-black'}`}>
                {videoOn ? 'Stop Video' : 'Enable Video + Mic'}
              </button>
              <button onClick={toggleVoice} className={`w-full py-4 rounded-3xl font-medium ${voiceOn ? 'bg-red-600' : 'bg-white/10'}`}>
                {voiceOn ? 'Stop Voice' : 'Voice Only'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
<AnimatePresence>
  {showReport && (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md"
      >
        <h3 className="text-3xl font-semibold mb-4">Report {name}</h3>
        <textarea 
          value={reportText} 
          onChange={e => setReportText(e.target.value)} 
          placeholder="Describe the issue..." 
          className="w-full h-28 bg-black border border-white/20 rounded-2xl p-5" 
        />
        <div className="flex gap-4 mt-6">
          <button onClick={() => setShowReport(false)} className="flex-1 py-4 border border-white/20 rounded-3xl">Cancel</button>
          <button 
            onClick={() => { 
              alert("Report submitted"); 
              setShowReport(false); 
              endChat(); 
            }} 
            className="flex-1 py-4 bg-white text-black rounded-3xl"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
