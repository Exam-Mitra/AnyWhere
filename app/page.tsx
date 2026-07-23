'use client';

import { motion } from 'framer-motion';

export default function PremiumLanding() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
              <span className="text-black font-bold text-3xl tracking-tighter">S</span>
            </div>
            <span className="font-semibold text-3xl tracking-tighter">StrangerLine</span>
          </div>
          <a href="/chat" className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all">
            Start Chatting
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-sm">
            Free • Anonymous • 190+ countries
          </div>

          <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter leading-none mb-6">
            Talk to strangers.<br />Make it feel real.
          </h1>
          
          <p className="text-2xl text-white/70 max-w-md mx-auto mb-12">
            Premium random chat with video, voice &amp; AI fallback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/chat" 
               className="bg-white text-black px-14 py-4 rounded-3xl text-xl font-medium hover:scale-[1.02] active:scale-95 transition-all inline-block">
              Start Chatting
            </a>
            <a href="#how" 
               className="border border-white/20 px-10 py-4 rounded-3xl text-xl font-medium hover:bg-white/5 transition-all inline-block">
              How it works
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3D Stats */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 pb-20">
        {[
          { number: "5M+", label: "Conversations" },
          { number: "190+", label: "Countries" },
          { number: "<3s", label: "Match Time" },
          { number: "24/7", label: "Moderation" }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
          >
            <div className="text-5xl font-semibold tracking-tighter">{stat.number}</div>
            <div className="text-white/60 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Features with 3D Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-6xl font-semibold tracking-tighter">Built for real conversations</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Text Chat", desc: "Instant, anonymous messaging with smart matching." },
            { title: "Video & Voice", desc: "Crystal clear WebRTC video and voice calls." },
            { title: "AI Fallback", desc: "Never empty. Our AI keeps the conversation alive." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ 
                scale: 1.03, 
                rotateX: 2, 
                rotateY: 3,
                transition: { duration: 0.2 }
              }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all"
            >
              <div className="text-4xl mb-6">→</div>
              <h3 className="text-4xl font-semibold tracking-tight mb-4">{feature.title}</h3>
              <p className="text-white/70 text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-white/10 py-20 text-center">
        <a href="/chat" 
           className="bg-white text-black px-16 py-5 text-2xl rounded-3xl font-medium hover:scale-105 active:scale-95 transition-all inline-block">
          Start your first chat
        </a>
      </div>
    </div>
  );
}
