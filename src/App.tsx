import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const NAV_ITEMS = [
  { name: "Dashboard", icon: "🏠", hot: false },
  { name: "Calls", icon: "📞", hot: false },
  { name: "Contacts", icon: "👤", hot: false },
  { name: "Messages", icon: "💬", hot: true },
  { name: "Locations", icon: "📍", hot: true },
  { name: "Browser History", icon: "🌐", hot: false },
  { name: "Photos", icon: "🖼️", hot: true },
  { name: "Video Preview", icon: "🎥", hot: false },
  { name: "Social Apps", icon: "💻", hot: false },
  { name: "Calendars", icon: "📅", hot: false },
  { name: "Applications", icon: "📲", hot: false },
];

function badge(hot: boolean) {
  return hot ? (
    <span className="ml-2 bg-blue-600 text-white text-[10px] px-2 rounded-full font-bold leading-none">NEW</span>
  ) : null;
}

function getLangOptions() {
  let langs = ["English"];
  const browserLang = typeof navigator !== "undefined" ? navigator.language : "";
  if (browserLang && browserLang.toLowerCase().includes("es")) langs.unshift("Español");
  else if (browserLang && browserLang.toLowerCase().includes("pt")) langs.unshift("Português");
  else if (browserLang && browserLang.toLowerCase().includes("ja")) langs.unshift("日本語");
  else if (browserLang && browserLang.toLowerCase().includes("ru")) langs.unshift("Русский");
  else if (browserLang && browserLang.toLowerCase().includes("fr")) langs.unshift("Français");
  else if (browserLang && browserLang.toLowerCase().includes("de")) langs.unshift("Deutsch");
  else if (browserLang && browserLang.toLowerCase().includes("it")) langs.unshift("Italiano");
  return langs.filter((v, i, a) => a.indexOf(v) === i);
}

function Header({ lang, setLang }: { lang: string, setLang: (lang: string) => void }) {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <div className="h-7 w-7 rounded-full bg-[#2563eb] flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="white" width="18" height="18"><circle cx="10" cy="10" r="9" /></svg>
        </div>
        <span className="text-2xl font-bold text-[#2563eb] tracking-tight" style={{ letterSpacing: '1px' }}>SPYCYBER</span>
      </div>
      <div className="flex items-center space-x-2">
        <select
          className="border border-blue-200 rounded px-2 py-1 text-sm text-[#2563eb] bg-white"
          value={lang}
          onChange={e => setLang(e.target.value)}
        >
          {getLangOptions().map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
    </header>
  );
}

function Sidebar({ current, onNav, dateStr }: { current: string, onNav: (item: string) => void, dateStr: string }) {
  return (
    <aside className="flex flex-col w-64 h-full bg-[#f8f8f8] border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="text-xs text-gray-400">Updated: {dateStr}</div>
        <div className="mt-6 flex items-center">
          <span className="inline-flex items-center text-base font-semibold text-gray-900"><span className="mr-2">📱</span>Galaxy S10</span>
        </div>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          {NAV_ITEMS.map(({ name, icon, hot }) => (
            <li key={name}>
              <button
                className={`w-full text-left flex items-center px-6 py-2 text-gray-700 hover:bg-[#e8f0fe] relative transition-colors ${name === current ? "font-semibold text-[#2563eb] bg-[#e8f0fe]" : ""}`}
                onClick={() => onNav(name)}
                disabled={name === current}
              >
                <span className="mr-3 text-xl">{icon}</span>
                {name}
                {badge(hot)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const SAMPLE_CONTACTS = [
  { name: "Martin", phone: "429-748-1384", count: 69 },
  { name: "John E. Washington", phone: "931-468-7430", count: 22 },
  { name: "Damien", phone: "513-851-2116", count: 17 },
  { name: "Myrtle Torres", phone: "208-424-4913", count: 15 },
  { name: "Barton", phone: "205-749-1334", count: 11 },
];

const SAMPLE_MESSAGES = [
  { name: "John Doe", phone: "705-234-1234", count: 1 },
  { name: "Frankie", phone: "705-929-7819", count: 1 },
  { name: "Gerald", phone: "418-296-7261", count: 1 },
  { name: "Ice", phone: "416-829-8001", count: 1 },
  { name: "Selena", phone: "250-776-4040", count: 1 },
];

function getRandom(n: number, base: number = 10) {
  return Math.floor(Math.random() * base + n);
}

function DashboardCards({ triggerError }: { triggerError: () => void }) {
  const [activity, setActivity] = useState({ calls: 0, msgs: 0, locations: 0, photos: 0, videos: 0 });
  useEffect(() => {
    setActivity({
      calls: getRandom(100, 100),
      msgs: getRandom(20, 30),
      locations: getRandom(5, 5),
      photos: getRandom(5, 10),
      videos: getRandom(5, 20),
    });
  }, []);
  return (
    <div className="flex flex-col px-8 py-8 gap-7 w-full">
      <h1 className="font-bold text-2xl text-gray-800 mb-2">Dashboard</h1>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Device Info */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col">
          <div className="font-semibold text-lg mb-2">Device information</div>
          <div className="flex items-center mb-2"><span className="text-[#2563eb] mr-2">📱</span> <span className="font-medium">Device Model</span> : Galaxy S10</div>
          <div className="flex items-center mb-2"><span className="text-[#2563eb] mr-2">💾</span> <span className="font-medium">Device OS Version</span> : 10.0</div>
          <div className="flex items-center mb-2"><span className="text-[#2563eb] mr-2">💾</span> <span className="font-medium">Zipcode</span> : 10.0</div>
          <div className="text-xs text-gray-400 mt-2">* The device information will sync uevery 30 minutes.</div>
        </div>
        {/* Recent Calls Trigger Card */}
        <button type="button" onClick={triggerError} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col focus:outline-none hover:shadow-2xl transition-shadow group cursor-pointer">
          <div className="font-semibold text-lg mb-2 flex items-center justify-between">Recent 5 most calling contacts <span className="ml-2 group-hover:rotate-90 transition-transform">▶</span></div>
          <ul className="space-y-2 opacity-40 pointer-events-none select-none">
            <li className="flex items-center space-x-3">
              <div className="h-7 w-7 rounded-full bg-gray-200" />
              <div className="flex-1"><span className="font-semibold">Martin</span> <span className="text-xs text-gray-400">429-748-1384</span></div>
              <span className="text-xs text-gray-500">69</span>
            </li>
          </ul>
        </button>
        {/* Recent Messages Trigger Card */}
        <button type="button" onClick={triggerError} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col focus:outline-none hover:shadow-2xl transition-shadow group cursor-pointer">
          <div className="font-semibold text-lg mb-2 flex items-center justify-between">Recent 5 most messages <span className="ml-2 group-hover:rotate-90 transition-transform">▶</span></div>
          <ul className="space-y-2 opacity-40 pointer-events-none select-none">
            <li className="flex items-center space-x-3">
              <div className="h-7 w-7 rounded-full bg-gray-200" />
              <div className="flex-1"><span className="font-semibold">John Doe</span> <span className="text-xs text-gray-400">705-234-1234</span></div>
              <span className="text-xs text-gray-500">1</span>
            </li>
          </ul>
        </button>
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Phone Activities */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col">
          <div className="font-semibold text-lg mb-2">Phone Activities</div>
          <div className="space-y-2">
            <div className="flex items-center"><span className="text-[#2563eb] text-xl mr-2">📞</span> <span className="font-bold flex-1">Calls</span><span className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden mx-2"><span className="h-2 bg-[#2563eb] rounded-full block" style={{ width: `${activity.calls / 2}%` }}></span></span><span className="text-xs text-gray-700">{activity.calls}</span></div>
            <div className="flex items-center"><span className="text-[#2563eb] text-xl mr-2">💬</span> <span className="font-bold flex-1">Messages</span><span className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden mx-2"><span className="h-2 bg-[#2563eb] rounded-full block" style={{ width: `${activity.msgs * 2}%` }}></span></span><span className="text-xs text-gray-700">{activity.msgs}</span></div>
            <div className="flex items-center"><span className="text-[#2563eb] text-xl mr-2">📍</span> <span className="font-bold flex-1">Locations</span><span className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden mx-2"><span className="h-2 bg-[#2563eb] rounded-full block" style={{ width: `${activity.locations * 10}%` }}></span></span><span className="text-xs text-gray-700">{activity.locations}</span></div>
            <div className="flex items-center"><span className="text-[#2563eb] text-xl mr-2">🖼️</span> <span className="font-bold flex-1">Photos</span><span className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden mx-2"><span className="h-2 bg-[#2563eb] rounded-full block" style={{ width: `${activity.photos * 10}%` }}></span></span><span className="text-xs text-gray-700">{activity.photos}</span></div>
            <div className="flex items-center"><span className="text-[#2563eb] text-xl mr-2">🎥</span> <span className="font-bold flex-1">Videos</span><span className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden mx-2"><span className="h-2 bg-[#2563eb] rounded-full block" style={{ width: `${activity.videos * 5}%` }}></span></span><span className="text-xs text-gray-700">{activity.videos}</span></div>
          </div>
        </div>
        {/* Map GIF Card as full-height, 2nd column */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center justify-center w-full">
          <div className="font-semibold text-lg mb-4 self-start">Last Known Locations</div>
          <img class="gif" src="./src/tiwa.gif" alt="Map" className="w-full max-w-2xl rounded-lg object-cover border mx-auto shadow" style={{ minHeight: 180 }} />
          <div className="text-xs text-gray-500 mt-3 self-start">Activity map based on recent signals</div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-center px-4 md:px-8 py-4 border-t border-gray-200 bg-[#f8f8f8] mt-auto">
      <span className="text-red-600 line-through text-lg font-bold">Amount: $400</span>
    </footer>
  );
}

function ErrorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-xs w-full text-center">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Access Restricted</h2>
        <p className="mb-6 text-gray-700">This feature is not available right now.<br />Please contact your administrator.</p>
        <a
          href="mailto:admin@spycyber.com"
          className="inline-block bg-[#2563eb] text-white px-6 py-2 rounded hover:bg-blue-800 font-semibold"
        >Contact Administrator</a>
        <button
          className="block w-full mt-4 text-[#2563eb] underline font-semibold"
          onClick={onClose}
        >Go Back to Dashboard</button>
      </div>
    </div>
  );
}

function LoginOverlay({ onLogin }: { onLogin: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "user23456") onLogin();
    else setError("Incorrect key. Try again.");
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 max-w-xs w-full text-center flex flex-col gap-4">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Login Required</h2>
        <p className="text-gray-600 text-sm mb-2">Enter your access key to continue.</p>
        <input
          type="password"
          value={input}
          autoFocus
          onChange={e => { setInput(e.target.value); setError(""); }}
          placeholder="Enter key"
          className="border border-blue-200 rounded px-3 py-2 outline-[#2563eb] text-center focus:ring-2 focus:ring-blue-200"
        />
        <button className="bg-[#2563eb] text-white px-6 py-2 rounded font-bold hover:bg-blue-800 transition-colors mt-2" type="submit">Login</button>
        {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
      </form>
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState("Dashboard");
  const [showError, setShowError] = useState(false);
  const [lang, setLang] = useState(getLangOptions()[0]);
  const [dateStr, setDateStr] = useState(dayjs().format("MMM DD YYYY HH:mm:ss"));
  const [authed, setAuthed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setDateStr(dayjs().format("MMM DD YYYY HH:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleNav(name: string) {
    if (name === "Dashboard") {
      setCurrent("Dashboard");
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <div className="flex flex-1 overflow-hidden bg-[#f2f4f7]">
        <Sidebar current={current} onNav={handleNav} dateStr={dateStr} />
        <main className={`flex-1 overflow-y-auto transition-all p-2 md:p-0 md:pt-0 relative ${(showError || !authed) ? 'pointer-events-none select-none filter blur-sm' : ''}`}>
          {current === "Dashboard" && <DashboardCards triggerError={() => setShowError(true)} />}
        </main>
        {showError && <ErrorModal onClose={() => { setShowError(false); setCurrent("Dashboard"); }} />}
        {!authed && <LoginOverlay onLogin={() => setAuthed(true)} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
