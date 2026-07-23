'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="px-6 py-5 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="font-bold text-2xl">S</span>
          </div>
          <span className="font-semibold text-3xl tracking-tighter">StrangerLine</span>
        </div>
        <a href="/chat" className="bg-blue-600 px-6 py-2.5 rounded-full font-medium">Start Chatting →</a>
      </div>

      {/* Hero */}
      <div className="px-6 pt-16 text-center">
        <div className="text-sm text-zinc-400 mb-4">Free • Anonymous • 190+ countries</div>
        
        <h1 className="text-6xl font-semibold tracking-tighter leading-none mb-6">
          Talk to strangers online.<br />Free. Anonymous. Real.
        </h1>
        
        <p className="text-2xl text-zinc-400 mb-10">Make real friends. No sign-up needed.</p>

        <div className="flex flex-col gap-4 items-center">
          <a href="/chat" className="bg-blue-600 px-10 py-4 text-xl rounded-full font-medium w-full max-w-xs">
            Start Chatting →
          </a>
          <a href="#how" className="border border-zinc-700 px-8 py-4 text-xl rounded-full w-full max-w-xs">
            How it works
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8 px-6 py-16 text-center border-y border-zinc-800 mt-16">
        <div><div className="text-4xl font-semibold">5M+</div><div className="text-zinc-400">Conversations</div></div>
        <div><div className="text-4xl font-semibold">190+</div><div className="text-zinc-400">Countries</div></div>
        <div><div className="text-4xl font-semibold">&lt;3s</div><div className="text-zinc-400">Match time</div></div>
        <div><div className="text-4xl font-semibold">24/7</div><div className="text-zinc-400">Moderation</div></div>
      </div>

      {/* Features */}
      <div className="px-6 py-16">
        <h2 className="text-4xl font-semibold tracking-tighter text-center mb-10">Chat with strangers who share your interests</h2>
        
        <div className="space-y-6">
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-3xl font-semibold mb-2">Text chat</h3>
            <p className="text-zinc-400">Anonymous and instant.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-3xl font-semibold mb-2">Video chat</h3>
            <p className="text-zinc-400">Face-to-face with real people.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-3xl font-semibold mb-2">Voice chat</h3>
            <p className="text-zinc-400">Live voice calls &amp; notes.</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20 text-center">
        <a href="/chat" className="bg-blue-600 px-14 py-5 text-2xl rounded-full font-medium inline-block">
          Start chatting now
        </a>
      </div>
    </div>
  );
}
