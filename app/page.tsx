'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="border-b border-[#27272a] px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3b82f6] rounded-2xl flex items-center justify-center">
              <span className="font-bold text-2xl">S</span>
            </div>
            <span className="font-semibold text-3xl tracking-tighter">StrangerLine</span>
          </div>
          <a href="/chat" className="btn-primary">Start Chatting →</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 text-center">
        <div className="mb-6 text-sm text-[#a1a1aa]">Free • Anonymous • 190+ countries</div>
        
        <h1 className="text-6xl font-semibold tracking-tighter leading-none mb-6">
          Talk to strangers online.<br />Free. Anonymous. Real.
        </h1>
        
        <p className="text-2xl text-[#a1a1aa] mb-10">Make real friends. No sign-up needed.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href="/chat" className="btn-primary text-xl px-10 py-4">Start Chatting →</a>
          <a href="#how" className="btn-secondary text-xl px-8 py-4">How it works</a>
        </div>
        
        <div className="text-sm text-[#71717a]">5M+ conversations • &lt;3s match • 24/7 moderation</div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-16 text-center border-y border-[#27272a] mt-16">
        <div><div className="text-4xl font-semibold">5M+</div><div className="text-[#71717a]">Conversations</div></div>
        <div><div className="text-4xl font-semibold">190+</div><div className="text-[#71717a]">Countries</div></div>
        <div><div className="text-4xl font-semibold">&lt;3s</div><div className="text-[#71717a]">Match time</div></div>
        <div><div className="text-4xl font-semibold">24/7</div><div className="text-[#71717a]">Moderation</div></div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-semibold tracking-tighter text-center mb-14">Chat with strangers who share your interests</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card"><h3 className="text-3xl font-semibold mb-3">Text chat</h3><p className="text-[#a1a1aa]">Anonymous and instant.</p></div>
          <div className="card"><h3 className="text-3xl font-semibold mb-3">Video chat</h3><p className="text-[#a1a1aa]">Face-to-face with real people.</p></div>
          <div className="card"><h3 className="text-3xl font-semibold mb-3">Voice chat</h3><p className="text-[#a1a1aa]">Live voice calls &amp; notes.</p></div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <a href="/chat" className="btn-primary text-2xl px-14 py-5">Start chatting now</a>
      </div>
    </div>
  );
}
