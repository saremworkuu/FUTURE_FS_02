
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

interface ContactProps {
  isLightMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isLightMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      return;
    }

    const newLead = {
      _id: Date.now().toString(),
      name: trimmedName,
      email: trimmedEmail,
      phone: undefined,
      source: 'Website',
      status: 'New',
      notes: [trimmedMessage],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const STORAGE_KEY = 'yegna-leads';
      const existingRaw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = Array.isArray(existing) ? [...existing, newLead] : [newLead];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      // Hide success message after ~8 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 8000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div
        className={`max-w-6xl mx-auto rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl border ${
          isLightMode ? 'bg-white border-pink-100' : 'bg-[#121011] border-pink-900/10'
        }`}
      >
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-900 rounded-full opacity-10 blur-3xl"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <div>
            <h2 className="text-pink-500 font-medium tracking-[0.2em] uppercase text-sm mb-4">Talk to Us</h2>
            <h3
              className={`text-4xl font-serif mb-8 ${
                isLightMode ? 'text-stone-900' : 'text-stone-100'
              }`}
            >
              We look forward to your visit.
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-2xl shadow-lg text-pink-500 border ${
                    isLightMode ? 'bg-pink-50 border-pink-100' : 'bg-[#1c1819] border-pink-900/20'
                  }`}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <h4
                    className={`font-bold mb-1 ${
                      isLightMode ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    Address
                  </h4>
                  <p className={isLightMode ? 'text-stone-600' : 'text-stone-400'}>
                    Addis Ababa, Bole, time Building
                    <br />
                    1st Floor
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-2xl shadow-lg text-pink-500 border ${
                    isLightMode ? 'bg-pink-50 border-pink-100' : 'bg-[#1c1819] border-pink-900/20'
                  }`}
                >
                  <Phone size={24} />
                </div>
                <div>
                  <h4
                    className={`font-bold mb-1 ${
                      isLightMode ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    Phone
                  </h4>
                  <p className={isLightMode ? 'text-stone-600' : 'text-stone-400'}>
                    +251 90 546 0089
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-2xl shadow-lg text-pink-500 border ${
                    isLightMode ? 'bg-pink-50 border-pink-100' : 'bg-[#1c1819] border-pink-900/20'
                  }`}
                >
                  <Mail size={24} />
                </div>
                <div>
                  <h4
                    className={`font-bold mb-1 ${
                      isLightMode ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    E-mail
                  </h4>
                  <p className={isLightMode ? 'text-stone-600' : 'text-stone-400'}>
                    yegnaቡና@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex space-x-4">
              <a
                href="#"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg border ${
                  isLightMode
                    ? 'bg-white text-stone-500 hover:bg-pink-500 hover:text-white border-pink-100'
                    : 'bg-[#1c1819] text-stone-400 hover:bg-pink-500 hover:text-white border-pink-900/20'
                }`}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className={`px-6 py-3 rounded-full flex items-center justify-center transition-all shadow-lg border text-xs font-bold uppercase tracking-widest ${
                  isLightMode
                    ? 'bg-white text-stone-600 hover:bg-pink-500 hover:text-white border-pink-100'
                    : 'bg-[#1c1819] text-stone-400 hover:bg-pink-500 hover:text-white border-pink-900/20'
                }`}
              >
                Follow on Instagram
              </a>
            </div>
          </div>

          <div
            className={`p-8 md:p-12 rounded-[2rem] shadow-2xl border ${
              isLightMode ? 'bg-pink-50 border-pink-100' : 'bg-[#1c1819] border-pink-900/10'
            }`}
          >
            <h4
              className={`text-2xl font-serif mb-8 ${
                isLightMode ? 'text-stone-900' : 'text-stone-100'
              }`}
            >
              Send a message
            </h4>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors border ${
                      isLightMode
                        ? 'bg-white border-pink-100 text-stone-900'
                        : 'bg-[#121011] border-pink-900/20 text-stone-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors border ${
                      isLightMode
                        ? 'bg-white border-pink-100 text-stone-900'
                        : 'bg-[#121011] border-pink-900/20 text-stone-100'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors border ${
                    isLightMode
                      ? 'bg-white border-pink-100 text-stone-900'
                      : 'bg-[#121011] border-pink-900/20 text-stone-100'
                  }`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-pink-600 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-pink-500 shadow-xl shadow-pink-900/20 transition-all transform hover:-translate-y-1"
              >
                Send Message
              </button>

              {status === 'success' && (
                <p className="text-xs text-pink-400 text-center">Thanks! Your message was sent.</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-400 text-center">Please fill in all fields and try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
