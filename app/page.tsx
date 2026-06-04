"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Trophy, Users, ShieldCheck, Star, MessageSquare, ArrowRight, Zap, RefreshCw, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero fade-ins
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      heroTl.fromTo(
        ".hero-main-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        "-=0.4"
      );
      heroTl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
      heroTl.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
      heroTl.fromTo(
        ".hero-stats",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      const countElements = [
        { id: "stats-sqft", target: 8000, suffix: " Sq.Ft." },
        { id: "stats-racks", target: 12, suffix: " Stations" },
        { id: "stats-cap", target: 15, suffix: "+ Coaches" },
      ];

      countElements.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const valObj = { val: 0 };
          gsap.to(valObj, {
            val: item.target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.innerText = Math.floor(valObj.val) + item.suffix;
            },
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: "Rohan Deshmukh",
      role: "Software Engineer, Kothrud",
      text: "I left my previous gym on FC Road because I was spending half my session waiting for a squat rack. PowerFit's hourly slot bookings completely solve overcrowding. At 7 PM, it's never packed.",
      rating: 5
    },
    {
      name: "Sneha Kulkarni",
      role: "Digital Marketer, Kalyani Nagar",
      text: "Most gyms have trainers who stand in corners browsing their phones. Here, the floor coaches actively come up and correct your deadlift form. The hygiene standards and microfiber towels are a huge plus.",
      rating: 5
    },
    {
      name: "Aditya Shinde",
      role: "Business Owner, Aundh",
      text: "As someone who lifts heavy, the imported plate-loaded machines make a massive difference. The biomechanics of their Hammer Strength equipment are perfect. Zero joint strain.",
      rating: 5
    },
    {
      name: "Tanvi Joshi",
      role: "Architect, Baner",
      text: "The group training here isn't just basic aerobics. The HIIT block is structured, challenging, and supervised by certified coaches who adjust weights for beginners.",
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-[#050505]" ref={heroRef}>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-20 lg:py-28">
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="PowerFit Pune Premium Facility"
            fill
            priority
            className="object-cover opacity-25 object-center animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Hero Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Asymmetrical Typography & Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <span className="hero-badge text-neon-green text-xs font-bold uppercase tracking-widest block text-glow-green">
                Shivajinagar, Pune
              </span>

              <h1 className="hero-main-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase">
                RESULTS DEMAND <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-electric-blue text-glow-green">
                  WORLD-CLASS
                </span> <br />
                FACILITIES.
              </h1>

              <p className="hero-subtitle text-gray-300 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Train in a dedicated 8,000 sq.ft. strength & performance facility in Shivajinagar. Fully equipped with genuine imported Hammer Strength machinery, Olympic lifting platforms, and expert coaches who actively correct your execution.
              </p>

              {/* Action CTAs */}
              <div className="hero-ctas flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                <a
                  href="https://wa.me/919823012345?text=Hi%20PowerFit%20Pune,%20I'd%20like%20to%20book%20a%20free%20trial%20session%20and%20tour%20the%20facility!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,59,48,0.3)] w-full sm:w-auto text-center cursor-pointer"
                >
                  Book Gym Tour
                </a>
                <Link
                  href="/membership"
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase border border-white/10 text-white hover:bg-white/5 transition-all duration-300 glass-panel w-full sm:w-auto text-center"
                >
                  Membership Pricing
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Stats Card */}
            <div className="hero-stats lg:col-span-5 w-full">
              <div className="glass-card rounded-2xl border border-white/5 p-8 space-y-6">
                <h3 className="text-white font-extrabold text-xs uppercase tracking-widest border-b border-white/5 pb-4">
                  The Facility
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Training Area</span>
                    <span id="stats-sqft" className="text-white font-bold text-base sm:text-lg">8000 Sq.Ft.</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Lifting platforms</span>
                    <span id="stats-racks" className="text-white font-bold text-base sm:text-lg">12 Stations</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Certified Trainers</span>
                    <span id="stats-cap" className="text-white font-bold text-base sm:text-lg">15+ Coaches</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Main Equipment</span>
                    <span className="text-neon-green text-glow-green font-bold text-xs uppercase tracking-widest">Hammer Strength</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. THE CONTRAST HOOK (The "Overcrowded Gyms vs. PowerFit" Comparison) */}
      <section className="py-24 bg-[#080808] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon-green text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-neon-green/10">
              Why We Are Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tired of the Typical Pune Gym Frustrations?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Most commercial gyms focus on overselling memberships and cramming the floor. We focus on your training execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contrast 1 */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 w-fit px-3 py-1 rounded-full text-xs font-semibold border border-red-500/20">
                  <AlertCircle className="h-3.5 w-3.5" /> The Common Problem
                </div>
                <h3 className="text-lg font-bold text-white">Waiting 15 Mins for a Bench</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Commercial gyms oversell passes by 400%, leading to chaotic peak-hour crowds where you waste half your workout time waiting.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="text-neon-green text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> PowerFit Solution
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  <strong>12 Dedicated Lifting Stations:</strong> We feature double sets of free weight benches and lifting platforms so you can train without queues.
                </p>
              </div>
            </div>

            {/* Contrast 2 */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 w-fit px-3 py-1 rounded-full text-xs font-semibold border border-red-500/20">
                  <AlertCircle className="h-3.5 w-3.5" /> The Common Problem
                </div>
                <h3 className="text-lg font-bold text-white">"Phone-Scrolling" Trainers</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Floor trainers who ignore you unless you buy expensive personal training packages, leaving beginners to struggle with bad form.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="text-neon-green text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> PowerFit Solution
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  <strong>Active Floor Coaching:</strong> Our coaches are evaluated on floor guidance. If they notice an incorrect form, they correct it immediately.
                </p>
              </div>
            </div>

            {/* Contrast 3 */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 w-fit px-3 py-1 rounded-full text-xs font-semibold border border-red-500/20">
                  <AlertCircle className="h-3.5 w-3.5" /> The Common Problem
                </div>
                <h3 className="text-lg font-bold text-white">Sweaty Benches & Bad Smell</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Poor sanitization, worn-out padding, and stuffy ventilation system common in basement gyms.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="text-neon-green text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> PowerFit Solution
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  <strong>Premium Hygiene Control:</strong> Clean microfiber towels provided at entry, continuous dry air circulation, and deep cleaning twice daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FACILITY ZONES (Replacing generic Classes Preview) */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute left-0 top-1/3 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-electric-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-electric-blue/10">
                Inside the Club
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Physical Training Zones
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                We equip our facility with top-tier commercial machinery brands. No cheap local setups.
              </p>
            </div>
            <div>
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-sm font-bold tracking-wider uppercase text-white hover:text-neon-green transition-all duration-300"
              >
                View Class Timings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Zone 1 */}
            <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between h-[380px]">
              <div>
                <span className="text-neon-green font-bold text-xs uppercase tracking-widest block mb-2">Zone 01</span>
                <h3 className="text-2xl font-bold text-white mb-3">Strength & Hypertrophy</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  24 Plate-Loaded Hammer Strength workstations. Biomechanically optimized machines that align perfectly with natural joint movement, guaranteeing maximum tension on targeted muscle groups without tendon strain.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Equipment: Hammer Strength (USA)</span>
                <span className="px-2.5 py-1 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">Elite Strength</span>
              </div>
            </div>

            {/* Zone 2 */}
            <div className="glass-card glass-card-hover-blue p-8 rounded-2xl flex flex-col justify-between h-[380px]">
              <div>
                <span className="text-electric-blue font-bold text-xs uppercase tracking-widest block mb-2">Zone 02</span>
                <h3 className="text-2xl font-bold text-white mb-3">CrossFit Arena & Turf</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Olympic lifting platform with Rogue bumper plates, Eleiko steel bars, structural pulling cages, kettlebell decks, and a dedicated 15-meter sled turf track for athletic conditioning.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Equipment: Rogue & Eleiko</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Athletic conditioning</span>
              </div>
            </div>

            {/* Zone 3 */}
            <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between h-[380px]">
              <div>
                <span className="text-neon-green font-bold text-xs uppercase tracking-widest block mb-2">Zone 03</span>
                <h3 className="text-2xl font-bold text-white mb-3">Matrix Cardio Deck</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Low-impact Matrix commercial treadmills, dynamic virtual climbmills, and air resistance rowing ergometers, all equipped with individual HR tracking screens.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Equipment: Matrix (UK)</span>
                <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Aerobic Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SNAPSHOT */}
      <section className="py-24 bg-[#080808] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon-green text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-neon-green/10">
              Clear Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Honest Monthly Plans. No Sign-Up Fees.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Choose the level of guidance you need. Stop paying for gym packages you don't use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {/* Plan 1 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between transition-all hover:-translate-y-2 duration-300">
              <div>
                <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Basic Floor</p>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-3xl sm:text-4xl font-extrabold">₹999</span>
                  <span className="ml-1 text-sm font-medium text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 font-medium">Access: 10:00 AM – 5:00 PM (Off-Peak)</p>
                <ul className="mt-8 space-y-4 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Strength & Weights Floor Access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Locker Room & Shower Access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Microfiber towel service included</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/membership"
                  className="block w-full py-3 rounded-xl text-center text-sm font-bold tracking-wider uppercase border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Plan 2 - Highlighted */}
            <div className="glass-card p-8 rounded-2xl border-2 border-neon-green relative flex flex-col justify-between shadow-[0_0_30px_rgba(255,59,48,0.15)] transition-all hover:-translate-y-2 duration-300">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon-green text-black font-extrabold text-2xs uppercase tracking-widest">
                Best Value
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wider text-neon-green uppercase">Pro Club</p>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-3xl sm:text-5xl font-extrabold">₹1,999</span>
                  <span className="ml-1 text-sm font-medium text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 font-medium">Access: 6:00 AM – 10:00 PM (Full Day)</p>
                <ul className="mt-8 space-y-4 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span className="font-semibold text-white">Full-Day Gym & Cardio floor access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Unlimited group classes & CrossFit arena</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Monthly customized diet macro charts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Floor trainer guidance on posture/execution</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/membership"
                  className="block w-full py-3 rounded-xl text-center text-sm font-bold tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_15px_rgba(255,59,48,0.3)]"
                >
                  Join Pro Club
                </Link>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between transition-all hover:-translate-y-2 duration-300">
              <div>
                <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Elite Coaching</p>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-3xl sm:text-4xl font-extrabold">₹2,999</span>
                  <span className="ml-1 text-sm font-medium text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 font-medium">Access: 6:00 AM – 10:00 PM (Full Day)</p>
                <ul className="mt-8 space-y-4 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span className="font-semibold text-white">Everything in Pro Club Plan</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span className="text-electric-blue font-semibold">8 Personal 1-on-1 coaching sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Weekly progress tracking & macro adjustments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                    <span>Unlimited InBody composition checks</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/membership"
                  className="block w-full py-3 rounded-xl text-center text-sm font-bold tracking-wider uppercase border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  View Elite Details
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green font-bold text-sm tracking-wider uppercase transition-colors group"
            >
              See full comparison grid <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-electric-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-electric-blue/10">
              True Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Member Experiences
            </h2>
          </div>

          {/* Testimonial horizontal scrolling list */}
          <div className="w-full relative py-4">
            <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 px-4 snap-x">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 w-[300px] sm:w-[400px] shrink-0 snap-center flex flex-col justify-between hover:border-white/10 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-neon-green text-neon-green" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base italic leading-relaxed font-light">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <p className="text-white font-bold text-sm sm:text-base">{t.name}</p>
                    <p className="text-gray-500 text-xs font-medium">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-gray-500 mt-2 font-semibold">
              ← Swipe or scroll horizontally to read reviews →
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA TOUR BANNER */}
      <section className="py-20 bg-[#080808] relative overflow-hidden px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-electric-blue/10 to-transparent z-0" />
          <div className="absolute inset-0 glass-panel border border-white/10 z-0 rounded-3xl" />

          <div className="relative z-10 px-8 py-12 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Schedule a Free Trial & Facility Walk-Through
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Come check out our Hammer Strength machines, step on our Olympic platform, and see the app slot-booking system in action.
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center relative">
              <span className="absolute w-full h-full bg-neon-green/20 rounded-full animate-pulse-ring scale-125" />
              <a
                href="https://wa.me/919823012345?text=Hi%20PowerFit%20Pune,%20I'd%20like%20to%20schedule%20a%20free%20gym%20walk-through!"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_25px_rgba(255,59,48,0.5)] block text-center cursor-pointer"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
