"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Mail, MessageSquare, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in all form fields.");
      return;
    }

    // Format WhatsApp message
    const waText = `*New Contact Query - PowerFit Pune*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/918796644348?text=${encodeURIComponent(waText)}`;
    
    // Redirect user to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <section className="text-center py-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5" /> Reach Us
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          CONTACT & <span className="text-electric-blue text-glow-blue">LOCATION</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have a question about class schedules, pricing, or training slots? Shoot us a message or find us on the map.
        </p>
      </section>

      {/* 2. Grid split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
        {/* Left: Contact Info + Mock Google Map */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
              <MapPin className="h-6 w-6 text-neon-green" />
              <h3 className="text-white font-bold text-base">Address</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                1st Floor, Pride House, Near FC Road, Shivaji Nagar, Pune, MH 411005
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
              <Clock className="h-6 w-6 text-neon-green" />
              <h3 className="text-white font-bold text-base">Hours</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Mon - Sat: 6:00 AM – 10:00 PM <br />
                Sundays: 8:00 AM – 2:00 PM
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
              <Phone className="h-6 w-6 text-electric-blue" />
              <h3 className="text-white font-bold text-base">Call Us</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                +91 98230 12345
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
              <Mail className="h-6 w-6 text-electric-blue" />
              <h3 className="text-white font-bold text-base">Email</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                info@powerfitpune.com
              </p>
            </div>
          </div>

          {/* Google Maps Mock / Placeholder */}
          <div className="glass-card rounded-2xl border border-white/5 overflow-hidden h-[300px] relative flex flex-col items-center justify-center p-6 text-center group">
            {/* Map Grid styling */}
            <div className="absolute inset-0 bg-[#0d0d0d] opacity-90 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Decorative Glowing Rings for Pin */}
            <span className="absolute w-24 h-24 bg-neon-green/5 rounded-full animate-pulse-ring z-0" />
            
            <div className="relative z-10 space-y-4">
              <div className="bg-neon-green/10 p-4 rounded-full w-fit mx-auto border border-neon-green/20 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-neon-green text-glow-green" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">PowerFit Pune Gym</h4>
                <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto mt-1 leading-relaxed">
                  Shivaji Nagar near Fergusson College Road, Pune, Maharashtra
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Pride+House+FC+Road+Shivaji+Nagar+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black hover:bg-neon-green hover:shadow-[0_0_15px_rgba(255,59,48,0.3)] font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-neon-green" /> Query Form
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Fill in your contact parameters. We'll automatically route your inputs into a formatted WhatsApp chat so you can send it to our desk instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rohan Deshmukh"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98230 12345"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Your Message / Goal
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Hi, I am looking for a 1-month trial. I want to check out the CrossFit session this Friday evening."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors text-sm sm:text-base resize-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,59,48,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Send on WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
