'use client';

import React from 'react';

export default function StrangerTalkLanding() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      {/* Navbar */}
      <nav className="border-b border-[#27272a] bg-[#0a0a0a]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3b82f6] rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-xl tracking-tighter">S</span>
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-tighter">Stranger</div>
              <div className="text-[10px] text-[#71717a] -mt-1">TALK</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-secondary px-5 py-2.5 rounded-full text-sm font-medium">
              Log in
            </button>
            <button 
              onClick={() => window.location.href = '#start-chat'}
              className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-[#27272a] mb-6">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
          <span className="text-sm text-[#a1a1aa]">Now with AI-powered matching</span>
        </div>

        <h1 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
          Talk to strangers.<br />Make it feel real.
        </h1>
        
        <p className="max-w-md mx-auto text-xl text-[#a1a1aa] mb-10">
          Premium random chat. Video, voice, and text. 
          Interest-matched. Never waiting.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.location.href = '#start-chat'}
            className="btn-primary px-10 py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            Start chatting now
            <span className="text-xl">→</span>
          </button>
          <button className="btn-secondary px-8 py-4 rounded-2xl text-lg font-medium w-full sm:w-auto">
            Watch 30s demo
          </button>
        </div>

        <div className="mt-8 text-sm text-[#71717a]">
          142,391 conversations started today
        </div>
      </section>

      {/* Trust / Stats Bar */}
      <div className="border-y border-[#27272a] bg-[#111111]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-semibold tracking-tighter">2.4m</div>
            <div className="text-[#71717a] text-sm">Conversations this month</div>
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tighter">94k</div>
            <div className="text-[#71717a] text-sm">Active users right now</div>
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tighter">4.9</div>
            <div className="text-[#71717a] text-sm">Average rating</div>
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tighter">87</div>
            <div className="text-[#71717a] text-sm">Countries represented</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-[#3b82f6] text-sm font-medium tracking-[3px] mb-3">PROFESSIONAL EXPERIENCE</div>
          <h2 className="text-5xl font-semibold tracking-tighter">Built for real conversations</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Interest Matching", desc: "Connect instantly with people who share your interests using smart tags." },
            { title: "Video & Voice", desc: "Crystal clear WebRTC video and voice. Switch seamlessly between modes." },
            { title: "AI Fallback", desc: "Never wait. When no one is online, our hybrid AI keeps the conversation going naturally." },
          ].map((feature, i) => (
            <div key={i} className="card p-8">
              <div className="text-[#3b82f6] text-xl mb-4">→</div>
              <h3 className="font-semibold text-2xl tracking-tight mb-3">{feature.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#111111] border-y border-[#27272a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-semibold tracking-tighter mb-3">How it works</h2>
            <p className="text-[#a1a1aa]">Three steps to your next conversation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose your interests", desc: "Pick topics you care about — gaming, music, tech, travel, etc." },
              { step: "02", title: "Get matched instantly", desc: "We find someone online who matches your vibe. Or our AI steps in." },
              { step: "03", title: "Talk like real people", desc: "Text, video, or voice. Stay as long as you want. Report if needed." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="text-[#3b82f6] text-5xl font-mono font-medium tracking-tighter">{item.step}</div>
                <div>
                  <div className="font-semibold text-2xl tracking-tight mb-2">{item.title}</div>
                  <p className="text-[#a1a1aa]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start-chat" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-6xl font-semibold tracking-tighter mb-4">Ready to meet someone new?</h2>
        <p className="text-2xl text-[#a1a1aa] mb-10">No signup. No waiting. Just real conversations.</p>
        
        <button 
          onClick={() => alert("Chat interface coming in Phase 2!")}
          className="btn-primary text-xl px-16 py-5 rounded-3xl font-medium"
        >
          Start your first chat
        </button>
        
        <div className="mt-8 text-sm text-[#71717a]">
          Free • Private • 100% anonymous
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#71717a]">
          <div>© {new Date().getFullYear()} Stranger Talk. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <div>Safety</div>
            <div>Guidelines</div>
            <div>Privacy</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
