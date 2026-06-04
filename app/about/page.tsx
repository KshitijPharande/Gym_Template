"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Target, ShieldAlert, Award, Calendar, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation on scroll
      const counters = [
        { id: "about-members", target: 500, suffix: "+" },
        { id: "about-coaches", target: 10, suffix: "" },
        { id: "about-years", target: 5, suffix: "+" },
        { id: "about-equip", target: 20, suffix: "+" },
      ];

      counters.forEach((c) => {
        const el = document.getElementById(c.id);
        if (el) {
          const valObj = { val: 0 };
          gsap.to(valObj, {
            val: c.target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.innerText = Math.floor(valObj.val) + c.suffix;
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen py-12" ref={containerRef}>
      {/* 1. Header Hero */}
      <section className="relative py-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider"
          >
            <Calendar className="h-3.5 w-3.5" /> Established 2021
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
          >
            OUR STORY & <span className="text-neon-green text-glow-green">MISSION</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Uncompromising standards, elite coaching, and a passion for results. Discover how we're transforming fitness in Shivajinagar, Pune.
          </motion.p>
        </div>
      </section>

      {/* 2. Story Narrative & Photo Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Narrative Text */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Target className="h-6 w-6 text-neon-green" /> The PowerFit Philosophy
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              PowerFit Pune was born out of a simple realization: local gyms were either overcrowded or lacked structured, goal-oriented training methods. In 2021, we set out to build a space that combined the raw intensity of a performance gym with the premium amenities of a high-end club.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Located in the heart of Shivaji Nagar, Pune, our facility has grown from a local workout space to a thriving athletic hub. We provide a tailored, scientific approach to hypertrophy, weight management, and functional conditioning.
            </p>
            <div className="p-6 rounded-2xl glass-panel border-l-4 border-neon-green space-y-2">
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                <Award className="h-5 w-5 text-neon-green" /> Our Core Mission
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                To empower everyday individuals to build elite physical capabilities and unbreakable discipline, by providing top-tier facilities, scientifically-backed nutrition guides, and structured mentoring.
              </p>
            </div>
          </div>

          {/* Photo Grid Placeholder with Hover Zoom */}
          <div className="grid grid-cols-2 gap-4 h-[400px]">
            <div className="relative rounded-2xl overflow-hidden group h-full">
              <Image
                src="/images/hero-bg.png"
                alt="Gym Weight Area"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">Main Floor</span>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="relative rounded-2xl overflow-hidden group">
                <Image
                  src="/images/trainer-1.png"
                  alt="Coaching Session"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-xs uppercase tracking-wide">Elite Training</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group">
                <Image
                  src="/images/trainer-2.png"
                  alt="CrossFit Rig"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-xs uppercase tracking-wide">CrossFit Rig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GSAP Counters Section */}
      <section className="py-20 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 id="about-members" className="text-4xl sm:text-5xl font-extrabold text-neon-green text-glow-green">0</h3>
              <p className="text-white font-semibold text-sm sm:text-base">Active Members</p>
              <p className="text-gray-500 text-xs">Transforming their bodies daily</p>
            </div>
            <div className="space-y-2">
              <h3 id="about-coaches" className="text-4xl sm:text-5xl font-extrabold text-electric-blue text-glow-blue">0</h3>
              <p className="text-white font-semibold text-sm sm:text-base">Certified Coaches</p>
              <p className="text-gray-500 text-xs">Certified by gold-standard institutions</p>
            </div>
            <div className="space-y-2">
              <h3 id="about-years" className="text-4xl sm:text-5xl font-extrabold text-white">0</h3>
              <p className="text-white font-semibold text-sm sm:text-base">Years of Legacy</p>
              <p className="text-gray-500 text-xs">Serving the fitness space in Pune</p>
            </div>
            <div className="space-y-2">
              <h3 id="about-equip" className="text-4xl sm:text-5xl font-extrabold text-neon-green text-glow-green">0</h3>
              <p className="text-white font-semibold text-sm sm:text-base">Imported Workstations</p>
              <p className="text-gray-500 text-xs">Top-tier biomechanical equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Culture Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest justify-center">
            <HeartHandshake className="h-4 w-4" /> PowerFit DNA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            THE POWERFIT CULTURE
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            We hold ourselves to a higher standard. Here is the culture you join when you step into our facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl w-fit">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Discipline First</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Motivation gets you started, but discipline keeps you growing. We foster a environment of focused intensity where everyone is working to exceed their personal bests.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-xl w-fit">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Form Over Weight</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Injury prevention is key to long-term gains. Our coaches actively correct posture, form, and execution to ensure you recruit target muscles safely and effectively.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
            <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl w-fit">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pune's Gym Family</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              No judgment, no toxicity. We are a community of business owners, tech professionals, students, and athletes pushing each other to achieve wellness.
            </p>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-12 text-center">
        <Link
          href="/membership"
          className="px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,59,48,0.4)]"
        >
          Explore Membership Plans
        </Link>
      </section>
    </div>
  );
}
