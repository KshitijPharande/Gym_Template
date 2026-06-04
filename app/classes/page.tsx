"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ShieldCheck, Flame, Layers, Dumbbell, CalendarRange } from "lucide-react";

// Classes list with realistic details
const classesData = [
  {
    name: "CrossFit Arena",
    trainer: "Coach Rahul (CF-L1)",
    duration: "60 mins",
    difficulty: "Advanced",
    timing: "07:00 AM & 07:00 PM",
    category: ["Morning", "Evening"],
    desc: "Functional high-intensity movements that challenge your raw strength, speed, and endurance.",
    diffColor: "text-red-400 bg-red-500/10 border-red-500/20"
  },
  {
    name: "Zumba Fiesta",
    trainer: "Coach Priya",
    duration: "45 mins",
    difficulty: "All Levels",
    timing: "08:30 AM & 06:30 PM",
    category: ["Morning", "Evening"],
    desc: "Cardio dance workouts set to high-energy Latin music, perfect for burning fat and shaking off stress.",
    diffColor: "text-neon-green bg-neon-green/10 border border-neon-green/20"
  },
  {
    name: "Vinyasa Flow Yoga",
    trainer: "Coach Ananya",
    duration: "60 mins",
    difficulty: "All Levels",
    timing: "06:00 AM & 05:30 PM",
    category: ["Morning", "Evening", "Weekend"],
    desc: "Connect breathe with conscious movement, developing a powerful core, flexibility, and mind-body control.",
    diffColor: "text-neon-green bg-neon-green/10 border border-neon-green/20"
  },
  {
    name: "Hypertrophy Strength",
    trainer: "Coach Rohit",
    duration: "75 mins",
    difficulty: "All Levels",
    timing: "06:00 AM - 10:00 PM",
    category: ["Morning", "Evening"],
    desc: "Structured weight training aimed at muscle fiber recruiting, plateaus breaking, and pure physical power.",
    diffColor: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  },
  {
    name: "Cardio Shred",
    trainer: "Coach Amit",
    duration: "50 mins",
    difficulty: "Intermediate",
    timing: "09:30 AM",
    category: ["Morning"],
    desc: "Fast bodyweight circuits and endurance routines to rev up your metabolism and speed fat loss.",
    diffColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  },
  {
    name: "HIIT Burnout",
    trainer: "Coach Rahul (CF-L1)",
    duration: "45 mins",
    difficulty: "Intermediate",
    timing: "06:30 PM",
    category: ["Evening"],
    desc: "Interval workouts with minimal recovery breaks to keep your calorie burn high for hours after training.",
    diffColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  },
  {
    name: "Boxing & Core",
    trainer: "Coach Rohit",
    duration: "60 mins",
    difficulty: "Advanced",
    timing: "09:00 AM (Sat-Sun)",
    category: ["Weekend"],
    desc: "Punching drill intervals combined with direct core exercises for combat-grade endurance.",
    diffColor: "text-red-400 bg-red-500/10 border-red-500/20"
  }
];

// Schedule rows
const scheduleData = [
  { time: "06:00 AM – 07:00 AM", monWedFri: "Vinyasa Yoga (Ananya)", tueThu: "Hypertrophy (Rohit)", satSun: "Open Gym" },
  { time: "07:00 AM – 08:00 AM", monWedFri: "CrossFit Arena (Rahul)", tueThu: "HIIT Burnout (Rahul)", satSun: "Boxing & Core (Rohit)" },
  { time: "08:30 AM – 09:15 AM", monWedFri: "Zumba Fiesta (Priya)", tueThu: "Cardio Shred (Amit)", satSun: "Vinyasa Yoga (Ananya)" },
  { time: "09:30 AM – 10:20 AM", monWedFri: "Cardio Shred (Amit)", tueThu: "Open Gym", satSun: "Open Gym" },
  { time: "10:30 AM – 05:00 PM", monWedFri: "Open Gym / Personal Training", tueThu: "Open Gym / Personal Training", satSun: "Closed (From 2PM Sun)" },
  { time: "05:30 PM – 06:30 PM", monWedFri: "Vinyasa Yoga (Ananya)", tueThu: "Zumba Fiesta (Priya)", satSun: "Closed" },
  { time: "06:30 PM – 07:15 PM", monWedFri: "HIIT Burnout (Rahul)", tueThu: "Cardio Shred (Amit)", satSun: "Closed" },
  { time: "07:00 PM – 08:00 PM", monWedFri: "CrossFit Arena (Rahul)", tueThu: "CrossFit Arena (Rahul)", satSun: "Closed" },
  { time: "08:00 PM – 09:15 PM", monWedFri: "Hypertrophy (Rohit)", tueThu: "Hypertrophy (Rohit)", satSun: "Closed" }
];

export default function Classes() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Morning", "Evening", "Weekend"];

  const filteredClasses = classesData.filter((c) => {
    if (activeTab === "All") return true;
    return c.category.includes(activeTab);
  });

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <section className="text-center py-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <CalendarRange className="h-3.5 w-3.5" /> Class Schedule
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          CLASSES & <span className="text-electric-blue text-glow-blue">SCHEDULE</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From strength lifting to aerobic conditioning, choose from our structured programs. Use the filter below to find sessions matching your timeline.
        </p>
      </section>

      {/* 2. Filter Tabs */}
      <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 relative ${
              activeTab === tab
                ? "text-black bg-neon-green shadow-[0_0_15px_rgba(255,59,48,0.3)]"
                : "text-gray-400 border border-white/5 bg-white/5 hover:text-white hover:border-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Classes Grid */}
      <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <AnimatePresence mode="popLayout">
          {filteredClasses.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.name}
              className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between h-[380px]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{item.name}</h3>
                  <span className={`text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.diffColor}`}>
                    {item.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mt-4">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <User className="h-4 w-4 text-neon-green shrink-0" />
                  <span className="font-semibold">{item.trainer}</span>
                </div>
                <div className="flex items-center justify-between text-2xs text-gray-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-electric-blue" /> {item.duration}
                  </span>
                  <span>⏱️ {item.timing}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* 4. Weekly Schedule Table */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WEEKLY TIMELINE
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Timings are subject to change on public holidays. Gym floor remains open 6:00 AM – 10:00 PM for general workouts.
          </p>
        </div>

        {/* Schedule Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/5 glass-panel">
          <table className="min-w-full divide-y divide-white/5 text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-2xs sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                <th className="px-6 py-4">Time Slot</th>
                <th className="px-6 py-4">Mon / Wed / Fri</th>
                <th className="px-6 py-4">Tue / Thu</th>
                <th className="px-6 py-4">Sat / Sun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
              {scheduleData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-150 hover:bg-white/2 ${
                    idx % 2 === 0 ? "bg-transparent" : "bg-white/1"
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-white shrink-0 whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">
                    {row.monWedFri}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">
                    {row.tueThu}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">
                    {row.satSun}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Classes page bottom CTA */}
      <section className="py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Ready to join your first session?</h3>
        <a
          href="https://wa.me/918796644348?text=Hi%20PowerFit%20Pune,%20I'd%20like%20to%20register%20for%20a%20trial%20class!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,59,48,0.4)]"
        >
          Book Your Spot on WhatsApp
        </a>
      </section>
    </div>
  );
}
