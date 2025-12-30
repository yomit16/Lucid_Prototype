"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { 
  Brain, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ShieldCheck, 
  Fingerprint, 
  Menu,
  X
} from "lucide-react";
import LucidAssistant from "@/components/LucidAssistant";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-white font-sans selection:bg-blue-100 selection:text-[#3B66F5] flex flex-col relative overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-8 md:px-12 h-24 flex items-center justify-between shrink-0 relative z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#3B66F5] rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
            <Brain size={24} />
          </div>
          <span className="text-2xl font-black text-[#1E293B] tracking-tighter">Lucid</span>
        </div>
        
        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-10">
                <button className="text-[15px] font-bold text-slate-500 hover:text-[#3B66F5] transition-colors">Features</button>
                <button className="text-[15px] font-bold text-slate-500 hover:text-[#3B66F5] transition-colors">Pricing</button>
                <button className="text-[15px] font-bold text-slate-500 hover:text-[#3B66F5] transition-colors">Customers</button>
                <button className="text-[15px] font-bold text-slate-500 hover:text-[#3B66F5] transition-colors">Documentation</button>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-100 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B66F5] animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Introducing Gemini-3 Analysis</span>
            </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[15px] font-bold text-slate-600 hover:text-[#1E293B] transition-all">
            Log In
          </Link>
          <Link href="/signup">
            <button className="px-7 py-3.5 bg-[#3B66F5] text-white rounded-full font-black text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
              Sign up
            </button>
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-[#1E293B] p-2">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col p-8 animate-in fade-in duration-300 md:hidden">
            <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#3B66F5] rounded-xl flex items-center justify-center text-white">
                    <Brain size={24} />
                  </div>
                  <span className="text-2xl font-black text-[#1E293B] tracking-tighter">Lucid</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 p-2">
                    <X size={32} />
                </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-10 -mt-16">
                <button className="text-2xl font-black text-[#1E293B]">Features</button>
                <button className="text-2xl font-black text-[#1E293B]">Pricing</button>
                <button className="text-2xl font-black text-[#1E293B]">Customers</button>
                <button className="text-2xl font-black text-[#1E293B]">Documentation</button>
                <div className="w-24 h-px bg-slate-100 my-4"></div>
                <Link href="/login" className="text-2xl font-black text-[#1E293B]">Log In</Link>
        <Link href="/signup" className="w-full max-w-xs">
          <button className="w-full px-6 py-5 bg-[#3B66F5] text-white rounded-full font-black text-xl mt-4">
            Sign up
          </button>
        </Link>
            </nav>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center px-8 relative z-10 pt-20 pb-32">
        <div className="max-w-6xl w-full text-center space-y-20">

          {/* Heading */}
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-7xl md:text-[92px] font-black tracking-tighter leading-[0.9] text-[#1E293B]">
              Master Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B66F5] via-[#6366F1] to-[#9333EA]">Professional Memory</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-xl md:text-2xl font-medium leading-relaxed">
              Stop losing progress. Lucid uses adaptive AI to map your learning journey and predict your next growth milestone.
            </p>
          </div>

          {/* Split CTA Card */}
          <div className="max-w-[900px] mx-auto bg-white rounded-[40px] p-12 shadow-[0_32px_64px_-12px_rgba(59,102,245,0.12)] border border-slate-50 animate-in zoom-in duration-1000 delay-200">
            <div className="flex flex-col md:flex-row items-center">
              
              {/* Left Side: Call to Action */}
              <div className="flex-1 text-left space-y-10 pr-4">
                 <div className="space-y-3">
                   <h3 className="text-4xl font-black text-[#1E293B] tracking-tight">Ready to accelerate?</h3>
                   <p className="text-slate-500 text-lg font-medium leading-relaxed">Join 2,400+ developers tracking their evolution.</p>
                 </div>
                 <Link href="/signup" className="block">
                    <button className="w-full max-w-xs h-16 bg-[#3B66F5] text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98] transition-all group">
                      Start Your Portal
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </Link>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px h-56 bg-slate-100 mx-16"></div>

              {/* Right Side: Features */}
              <div className="flex-1 flex flex-col gap-10 w-full mt-12 md:mt-0">
                
                {/* Synthesis Item */}
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F8FF] flex items-center justify-center text-[#3B66F5] shrink-0 group-hover:bg-[#3B66F5] group-hover:text-white transition-all duration-300">
                    <Zap size={24} fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-black text-[#1E293B]">AI Synthesis</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Contextual History Mapping</p>
                  </div>
                </div>

                {/* Metrics Item */}
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#1E293B] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-black text-[#1E293B]">Live Metrics</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Real-time Velocity Tracking</p>
                  </div>
                </div>

                {/* Insights Item */}
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#6366F1] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-black text-[#1E293B]">Predictive Insights</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Automated Growth Forecasting</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <footer className="shrink-0 py-12 px-16 bg-white flex flex-col md:flex-row justify-between items-center gap-10 border-t border-slate-50 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap justify-center items-center gap-12">
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#3B66F5] transition-colors">
               <ShieldCheck size={20} />
             </div>
             <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-[0.2em]">SOC2 Type II</span>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#3B66F5] transition-colors">
               <Fingerprint size={20} />
             </div>
             <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-[0.2em]">Encrypted Data</span>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">Powered By</p>
          <div className="px-6 py-3 bg-slate-50 rounded-full flex items-center border border-slate-100">
             <span className="text-xs font-black text-[#1E293B]">Google Gemini</span>
          </div>
        </div>
      </footer>

      {/* Lucid Assistant (chat widget) */}
      <LucidAssistant />
    </div>
  );
}