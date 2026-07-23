'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="font-bold text-2xl">S</span>
          </div>
          <span className="font-semibold text-3xl tracking-tighter">StrangerLine</span>
        </div>
        <a href="/chat" className="bg-blue-600 px-6 py-2.5 rounded-full font-medium text-sm">Start Chatting</a>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-16 pb-10 text-center">
        <div className="text-sm text-zinc-400 mb-4">Free • Anonymous • 190+ countries</div>
        
        <h1 className="text-6xl font-semibold tracking-tighter leading-none mb-6">
          Talk to strangers<br />online.
        </h1>
        
        <p className="text-xl text-zinc-400 mb-8">Free. Anonymous. Real.</p>

        <a href="/chat" className="bg-blue-600 px-10 py-4 text-xl rounded-full font-medium inline-block">
          Start Chatting →
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-y-8 px-6 py-10 border-y border-zinc-800 text-center">
        <div>
          <div className="text-4xl font-semibold">5M+</div>
          <div className="text-zinc-400 text-sm">Conversations</div>
        </div>
        <div>
          <div className="text-4xl font-semibold">190+</div>
          <div className="text-zinc-400 text-sm">Countries</div>
        </div>
        <div>
          <div className="text-4xl font-semibold">&lt;3s</div>
          <div className="text-zinc-400 text-sm">Match time</div>
        </div>
        <div>
          <div className="text-4xl font-semibold">24/7</div>
          <div className="text-zinc-400 text-sm">Moderation</div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-16">
        <h2 className="text-4xl font-semibold tracking-tighter mb-10 text-center">Chat with strangers who share your interests</h2>
        
        <div className="space-y-4">
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Text chat</h3>
            <p className="text-zinc-400">Anonymous and instant.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Video chat</h3>
            <p className="text-zinc-400">Face-to-face with real people.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">Voice chat</h3>
            <p className="text-zinc-400">Live voice calls &amp; notes.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-6 pb-20 text-center">
        <a href="/chat" className="bg-blue-600 px-14 py-5 text-xl rounded-full font-medium inline-block">
          Start chatting now
        </a>
      </div>
    </div>
  );
}
