"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Zap, ShieldCheck, Heart } from "lucide-react";

// Trainers list
const trainers = [
  {
    name: "Coach Rahul Deshmukh",
    specialty: "CrossFit & Functional Training",
    experience: "6 Years",
    image: "/images/trainer-1.png",
    accent: "neon-green",
    certifications: ["CrossFit Level-1 Trainer (CF-L1)", "Kettlebell Athletics Certification", "CPR/AED Certified"],
    bio: "Dedicated to improving metabolic threshold and cardiovascular capacity using compound barbell routines and gymnastics.",
    icon: <Zap className="h-5 w-5" />
  },
  {
    name: "Coach Sneha Patil",
    specialty: "Hypertrophy & Strength Training",
    experience: "5 Years",
    image: "/images/trainer-2.png",
    accent: "electric-blue",
    certifications: ["ACE Certified Personal Trainer (ACE-CPT)", "Girevoy Kettlebell Specialist", "Active Nutrition Coach"],
    bio: "Focused on helping women feel comfortable in the weight room, building lean muscle mass, and achieving posture balance.",
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    name: "Coach Ananya Rao",
    specialty: "Yoga, Flexibility & Core Control",
    experience: "7 Years",
    image: "/images/trainer-3.png",
    accent: "neon-green",
    certifications: ["RYT-500 Yoga Alliance Registered", "Certified Pilates Mat Instructor", "Pre/Postnatal Fitness Spec"],
    bio: "Combines active stretching with yoga flows to develop dynamic core stability, breath awareness, and injury prevention.",
    icon: <Heart className="h-5 w-5" />
  },
  {
    name: "Coach Amit Kulkarni",
    specialty: "Athletics, Agility & Weight Loss",
    experience: "4 Years",
    image: "/images/trainer-4.png",
    accent: "electric-blue",
    certifications: ["ACSM Certified Exercise Trainer", "ISA Sports Performance Coach", "Macro Diet Specialist"],
    bio: "Believes in conditioning training designed around fat reduction, speed footwork, and personalized metabolic tracking.",
    icon: <Award className="h-5 w-5" />
  }
];

export default function Trainers() {
  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <section className="text-center py-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider">
          <Award className="h-3.5 w-3.5" /> Elite Team
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          MEET OUR <span className="text-neon-green text-glow-green">COACHES</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Guiding your movements, refining your posture, and maximizing your performance. Our coaches are globally certified professionals.
        </p>
      </section>

      {/* 2. Grid list */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {trainers.map((t, idx) => (
          <motion.div
            key={t.name}
            className={`glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group h-[480px] relative`}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Accent glow */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
              t.accent === "neon-green" ? "from-neon-green to-electric-blue" : "from-electric-blue to-neon-green"
            }`} />

            {/* Coach Portrait */}
            <div className="relative h-60 w-full overflow-hidden shrink-0">
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
            </div>

            {/* Text details */}
            <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
              <div className="space-y-2">
                <span className={`inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wider ${
                  t.accent === "neon-green" ? "text-neon-green" : "text-electric-blue"
                }`}>
                  {t.icon} {t.specialty}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">{t.name}</h3>
                <p className="text-gray-400 text-xs font-semibold">Experience: {t.experience}</p>
              </div>

              {/* Bio & Certifications hover deck */}
              <div className="absolute inset-0 bg-[#0c0c0cd0] backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-2">Certifications</h4>
                    <ul className="space-y-1.5">
                      {t.certifications.map((cert) => (
                        <li key={cert} className="text-gray-300 text-2xs flex items-start gap-1.5">
                          <span className="text-neon-green shrink-0">•</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-1">Philosophy</h4>
                    <p className="text-gray-400 text-2xs leading-relaxed">{t.bio}</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-neon-green font-bold text-3xs uppercase tracking-widest block">
                    Certified Expert
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Trainers page bottom banner */}
      <section className="py-16 glass-panel rounded-3xl border border-white/5 text-center p-8 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Want Personal 1-on-1 Guidance?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Elite membership includes dedicated personal trainer sessions to fast-track your progression, refine forms, and provide customized diets.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/membership"
            className="px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase border border-white/20 text-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto block"
          >
            Compare Trainer Access Plans
          </Link>
          <a
            href="https://wa.me/919823012345?text=Hi%20PowerFit%20Pune,%20I'd%20like%20to%20inquire%20about%20personal%20coaching%20timings."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_15px_rgba(255,59,48,0.3)] w-full sm:w-auto block"
          >
            Inquire on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
