'use client';

import React, { useState, useRef } from 'react';

const INTERESTS = ['Gaming','Music','Tech','Movies','Travel','Fitness','Books','Art','Food','Photography','Programming','Startup','Sports','Fashion','Nature'];

type Message = { id: number; text: string; isUser: boolean; timestamp: string };

export default function Chat() {
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

  const toggleInterest = (i: string) => {
    if (selected.includes(i)) {
      setSelected(selected.filter(x => x !== i));
    } else if (selected.length < 4) {
      setSelected([...selected, i]);
    }
  };

  const start = () => {
    if (selected.length === 0) return;
    setStep('matching');
    setTimeout(() => {
      const names = ['Alex','Jordan','Taylor','Sam','Casey'];
      setName(names[Math.floor(Math.random()*names.length)]);
      setStep('chat');
      setTimeout(() => addMsg(`Hey! I see you're into ${selected[0]}. What's up?`, false), 900);
    }, 2200);
  };

  const addMsg = (text: string, user: boolean) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isUser: user,
      timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    }]);
  };

  const send = () => {
    if (!input.trim()) return;
    addMsg(input.trim(), true);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = ["That's cool!", "Same here!", "Interesting!", "Haha yeah", "Nice!"];
      addMsg(replies[Math.floor(Math.random()*replies.length)], false);
    }, 1100);
  };

  const toggleVideo = async () => {
    if (!videoOn) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
        setStream(s);
        if (localRef.current) localRef.current.srcObject = s;
        setVideoOn(true);
        setVoiceOn(false);
      } catch { alert("Camera denied"); }
    } else {
      stream?.getTracks().forEach(t => t.stop());
      setStream(null);
      setVideoOn(false);
    }
  };

  const toggleVoice = async () => {
    if (!voiceOn) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({video:false, audio:true});
        setStream(s);
        setVoiceOn(true);
        setVideoOn(false);
      } catch { alert("Mic denied"); }
    } else {
      stream?.getTracks().forEach(t => t.stop());
      setStream(null);
      setVoiceOn(false);
    }
  };

  const end = () => {
    stream?.getTracks().forEach(t => t.stop());
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#27272a] px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3b82f6] rounded-2xl flex items-center justify-center">
            <span className="font-bold text-2xl">S</span>
          </div>
          <div className="font-semibold text-3xl tracking-tighter">StrangerLine</div>
        </div>
        {step === 'chat' && (
          <div className="flex gap-3">
            <button onClick={() => setShowReport(true)} className="px-4 py-2 text-sm border border-red-500/30 text-red-400 rounded-2xl">Report</button>
            <button onClick={end} className="px-4 py-2 text-sm border border-[#27272a] rounded-2xl">End</button>
          </div>
        )}
      </div>

      {/* Interest Selection */}
      {step === 'interests' && (
        <div className="max-w-2xl mx-auto px-6 pt-16 text-center">
          <h1 className="text-6xl font-semibold tracking-tighter mb-4">What are you into?</h1>
          <p className="text-xl text-[#a1a1aa] mb-10">Select up to 4 interests</p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {INTERESTS.map(i => (
              <button key={i} onClick={() => toggleInterest(i)}
                className={`px-6 py-3 rounded-full border text-base transition-all ${selected.includes(i) ? 'bg-[#3b82f6] border-[#3b82f6]' : 'border-[#27272a] bg-[#1a1a1a]'}`}>
                {i}
              </button>
            ))}
          </div>

          <button onClick={start} disabled={selected.length === 0}
            className="bg-[#3b82f6] px-14 py-4 rounded-3xl text-xl disabled:opacity-50">
            Find someone to talk to
          </button>
          <p className="mt-4 text-sm text-[#71717a]">{selected.length}/4 selected</p>
        </div>
      )}

      {/* Matching */}
      {step === 'matching' && (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <div className="text-3xl">Finding your match...</div>
          </div>
        </div>
      )}

      {/* Chat */}
      {step === 'chat' && (
        <div className="max-w-6xl mx-auto p-6">
          {(videoOn || voiceOn) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#111] border border-[#27272a] rounded-3xl overflow-hidden aspect-video">
                <video ref={localRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#111] border border-[#27272a] rounded-3xl overflow-hidden aspect-video">
                <video ref={remoteRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat Area */}
            <div className="flex-1 bg-[#111111] border border-[#27272a] rounded-3xl flex flex-col min-h-[480px]">
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                {messages.length === 0 && <div className="text-center text-[#71717a] mt-20">You're now chatting with {name}. Say hi!</div>}
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : ''}`}>
                    <div className={`max-w-[75%] px-6 py-4 rounded-3xl ${m.isUser ? 'bg-[#3b82f6]' : 'bg-[#1a1a1a]'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[#71717a]">typing...</div>}
              </div>

              <div className="p-5 border-t border-[#27272a]">
                <div className="flex gap-3">
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
                    className="flex-1 bg-[#1a1a1a] border border-[#27272a] rounded-3xl px-6 py-4" placeholder="Type a message..." />
                  <button onClick={send} className="bg-[#3b82f6] px-8 rounded-3xl">Send</button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full md:w-80 bg-[#161616] border border-[#27272a] rounded-3xl p-6">
              <button onClick={toggleVideo} className={`w-full py-4 rounded-3xl mb-3 ${videoOn ? 'bg-red-500' : 'bg-[#3b82f6]'}`}>
                {videoOn ? 'Stop Video' : 'Enable Video + Mic'}
              </button>
              <button onClick={toggleVoice} className={`w-full py-4 rounded-3xl ${voiceOn ? 'bg-red-500' : 'bg-[#27272a]'}`}>
                {voiceOn ? 'Stop Voice' : 'Voice Only'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6">
          <div className="bg-[#161616] p-8 rounded-3xl w-full max-w-md">
            <h3 className="text-2xl mb-4">Report {name}</h3>
            <textarea value={reportText} onChange={e=>setReportText(e.target.value)} className="w-full h-28 bg-[#1a1a1a] p-4 rounded-2xl" placeholder="Reason..." />
            <div className="flex gap-4 mt-6">
              <button onClick={()=>setShowReport(false)} className="flex-1 py-3 border border-[#27272a] rounded-3xl">Cancel</button>
              <button onClick={()=>{alert("Report submitted"); setShowReport(false); end();}} className="flex-1 py-3 bg-[#3b82f6] rounded-3xl">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
