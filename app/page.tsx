'use client';

export default function StrangerLine() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navbar */}
      <nav className="border-b border-[#27272a] bg-[#0a0a0a]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3b82f6] rounded-2xl flex items-center justify-center">
              <span className="font-bold text-2xl tracking-tighter">S</span>
            </div>
            <div className="font-semibold text-3xl tracking-tighter">StrangerLine</div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#how" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">How it works</a>
            <a href="/chat" className="btn-primary px-6 py-2.5 rounded-2xl text-sm font-medium">Start Chatting →</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#161616] border border-[#27272a] mb-6 text-sm">
          Free • Anonymous • 190+ countries
        </div>

        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          Talk to strangers online.<br />Free. Anonymous. Real.
        </h1>
        
        <p className="max-w-lg mx-auto text-2xl text-[#a1a1aa] mb-10">
          Make real friends. No sign-up needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/chat" className="btn-primary px-10 py-4 text-xl rounded-3xl font-medium inline-block">
            Start Chatting →
          </a>
          <a href="#how" className="btn-secondary px-8 py-4 text-xl rounded-3xl font-medium inline-block">
            How it works
          </a>
        </div>

        <div className="mt-8 text-sm text-[#71717a]">
          5M+ conversations • &lt;3s match time • 24/7 moderation
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-[#27272a] bg-[#111111]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10 text-center">
          <div>
            <div className="text-4xl font-semibold tracking-tighter">5M+</div>
            <div className="text-[#71717a]">Conversations</div>
          </div>
          <div>
            <div className="text-4xl font-semibold tracking-tighter">190+</div>
            <div className="text-[#71717a]">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-semibold tracking-tighter">&lt;3s</div>
            <div className="text-[#71717a]">Match time</div>
          </div>
          <div>
            <div className="text-4xl font-semibold tracking-tighter">24/7</div>
            <div className="text-[#71717a]">Moderation</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-semibold tracking-tighter">Chat with strangers who share your interests</h2>
          <p className="mt-4 text-xl text-[#a1a1aa]">The modern Omegle alternative</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Text chat", desc: "Anonymous, instant, and free. No camera required." },
            { title: "Video chat", desc: "Face-to-face with real strangers around the world." },
            { title: "Voice chat", desc: "Live voice calls and voice notes — choose how you want to talk." },
          ].map((f, i) => (
            <div key={i} className="card p-8">
              <div className="text-[#3b82f6] text-3xl mb-4">→</div>
              <h3 className="text-3xl font-semibold tracking-tight mb-3">{f.title}</h3>
              <p className="text-[#a1a1aa]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-[#111111] border-y border-[#27272a]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-5xl font-semibold tracking-tighter text-center mb-14">How StrangerLine works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Choose interests", desc: "Pick up to 4 topics you care about." },
              { num: "02", title: "Get matched", desc: "We instantly connect you with someone online." },
              { num: "03", title: "Start talking", desc: "Text, voice, or video. Switch anytime." },
            ].map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="font-mono text-5xl text-[#3b82f6] font-medium tracking-tighter">{step.num}</div>
                <div>
                  <div className="font-semibold text-2xl mb-2 tracking-tight">{step.title}</div>
                  <p className="text-[#a1a1aa]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-6xl font-semibold tracking-tighter mb-6">Ready to meet someone new?</h2>
        <p className="text-2xl text-[#a1a1aa] mb-10">No sign-up. No bots. Just real conversations.</p>
        
        <a href="/chat" className="btn-primary text-2xl px-14 py-5 rounded-3xl font-medium inline-block">
          Start chatting now
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-10 text-center text-sm text-[#71717a]">
        © {new Date().getFullYear()} StrangerLine — Free anonymous random chat
      </footer>
    </div>
  );
}
