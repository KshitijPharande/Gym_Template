"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Calendar, Clock, CheckCircle2, AlertCircle, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "bot" | "user";
  text: string;
  isCustomComponent?: boolean;
  component?: React.ReactNode;
}

const timeSlots = ["07:00 AM", "08:00 AM", "09:00 AM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [bookingState, setBookingState] = useState({
    step: "idle", // idle, name, phone, goal, age, slot, confirmed
    name: "",
    phone: "",
    goal: "",
    age: "",
    visitDate: "",
    visitTime: ""
  });
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Fetch booked slots from API on load and periodically
  const fetchBookedSlots = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookedSlots(data.bookedSlots);
      }
    } catch (err) {
      console.error("Failed to load booked slots:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookedSlots();
    }
  }, [isOpen]);

  // Initialize bot greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Hey! I am PowerBot, your tour advisor. Ready to visit PowerFit Pune or have questions about our Shivaji Nagar facility?"
        }
      ]);
    }
  }, []);

  const addBotMessage = (text: string, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text }]);
    }, delay);
  };

  const handleStartBooking = () => {
    setMessages((prev) => [...prev, { sender: "user", text: "Book Gym Tour" }]);
    setBookingState((prev) => ({ ...prev, step: "name" }));
    addBotMessage("Awesome Choice! Let's get you set up. What is your full name?");
  };

  const handleStartFAQs = () => {
    setMessages((prev) => [...prev, { sender: "user", text: "Ask a Question" }]);
    addBotMessage("Ask me anything! Here are some common inquiries:");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Choose a topic below to view details:",
          isCustomComponent: true,
          component: (
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => handleFaqSelect("pricing")}
                className="text-left bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-xs text-white p-2.5 rounded-xl transition-all"
              >
                💰 Membership Costs
              </button>
              <button
                onClick={() => handleFaqSelect("timings")}
                className="text-left bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-xs text-white p-2.5 rounded-xl transition-all"
              >
                ⏱️ Gym Timings
              </button>
              <button
                onClick={() => handleFaqSelect("equipment")}
                className="text-left bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-xs text-white p-2.5 rounded-xl transition-all"
              >
                🏋️ Equipment Brands
              </button>
              <button
                onClick={() => handleFaqSelect("amenities")}
                className="text-left bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-xs text-white p-2.5 rounded-xl transition-all"
              >
                🚿 Lockers & Steam Shower
              </button>
            </div>
          )
        }
      ]);
    }, 1000);
  };

  const handleFaqSelect = (topic: string) => {
    let responseText = "";
    if (topic === "pricing") {
      responseText = "We offer 3 tiers: Basic (₹999/mo off-peak floor access), Pro Club (₹1,999/mo full-day + group classes + CrossFit), and Elite Coaching (₹2,999/mo + 8 personal trainer sessions). No signup fees!";
    } else if (topic === "timings") {
      responseText = "We are open Monday to Saturday from 6:00 AM to 10:00 PM, and Sundays from 8:00 AM to 2:00 PM. Group classes run in morning and evening slots.";
    } else if (topic === "equipment") {
      responseText = "We equip our floor with 100% genuine imported commercial brands. The strength section features 24 Hammer Strength plate-loaded stations, CrossFit cages from Rogue, and Matrix cardio machinery.";
    } else if (topic === "amenities") {
      responseText = "Yes, we feature premium locker amenities, sterilized shower cubicles, dry steam therapy, and provide fresh microfiber towels upon entry for all Pro Club and Elite members.";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    
    // Provide a return to book tour option
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Would you like to schedule a tour to view the facility?",
          isCustomComponent: true,
          component: (
            <button
              onClick={handleStartBooking}
              className="mt-2 w-full py-2 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-colors uppercase tracking-wider"
            >
              Book Gym Tour
            </button>
          )
        }
      ]);
    }, 1000);
  };

  const handleGoalSelect = (goal: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: goal }]);
    setBookingState((prev) => ({ ...prev, goal, step: "age" }));
    addBotMessage("Awesome! Lastly, what is your age?");
  };

  // Submit booking request
  const submitBooking = async (date: string, time: string) => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingState.name,
          phone: bookingState.phone,
          goal: bookingState.goal,
          age: bookingState.age,
          visitDate: date,
          visitTime: time
        })
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.success) {
        setBookingState((prev) => ({
          ...prev,
          step: "confirmed",
          visitDate: date,
          visitTime: time
        }));

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "🎉 Your Gym Visit is officially booked!",
            isCustomComponent: true,
            component: (
              <div className="mt-3 bg-gradient-to-br from-neutral-900 to-black border border-neon-green/30 rounded-2xl p-5 space-y-4 shadow-[0_0_20px_rgba(255,59,48,0.1)]">
                <div className="flex items-center gap-2 text-neon-green border-b border-white/5 pb-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="font-extrabold text-xs uppercase tracking-widest text-glow-green">Booking Confirmed</span>
                </div>
                <div className="space-y-2 text-2xs sm:text-xs">
                  <p className="text-gray-400">Visitor: <strong className="text-white font-semibold">{bookingState.name}</strong></p>
                  <p className="text-gray-400">Date: <strong className="text-white font-semibold">{date}</strong></p>
                  <p className="text-gray-400">Time Slot: <strong className="text-white font-semibold text-neon-green">{time}</strong></p>
                  <p className="text-gray-400">Focus: <strong className="text-white font-semibold">{bookingState.goal}</strong></p>
                  <p className="text-gray-400 font-light text-3xs mt-2 italic text-gray-500">Address: 1st Floor, Pride House, Shivaji Nagar (FC Road), Pune</p>
                </div>
                <a
                  href={`https://wa.me/919823012345?text=Hi%20PowerFit%20Pune!%20My%20tour%20is%20booked%20for%20${date}%20at%20${time}.%20Please%20confirm%20my%20entry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-neon-green text-black font-extrabold text-center text-xs rounded-xl hover:bg-neon-green/90 transition-colors uppercase tracking-wider"
                >
                  Text Receipt on WhatsApp
                </a>
              </div>
            )
          }
        ]);
        
        // Refresh taken slots
        fetchBookedSlots();
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `⚠️ Error: ${data.error || "Something went wrong."}`
          }
        ]);
        // Allow slot re-selection
        setBookingState((prev) => ({ ...prev, step: "slot" }));
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Failed to reach booking server. Check your connection and try again."
        }
      ]);
      setBookingState((prev) => ({ ...prev, step: "slot" }));
    }
  };

  const handleSendInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");

    // Bot Flow Handlers
    if (bookingState.step === "name") {
      setBookingState((prev) => ({ ...prev, name: text, step: "phone" }));
      addBotMessage(`Thanks, ${text}! What is your WhatsApp number so we can text you slot updates?`);
    } else if (bookingState.step === "phone") {
      // Validate phone
      const phoneRegex = /^\+?[0-9]{10,12}$/;
      if (!phoneRegex.test(text.replace(/\s/g, ""))) {
        addBotMessage("Please enter a valid 10-digit phone number.");
        return;
      }
      setBookingState((prev) => ({ ...prev, phone: text, step: "goal" }));
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Got it! What is your main fitness focus?",
            isCustomComponent: true,
            component: (
              <div className="flex flex-wrap gap-2 mt-2">
                {["Strength Lifting", "CrossFit", "Fat Loss", "Yoga Flow"].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalSelect(goal)}
                    className="bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-neon-green/5 text-xs text-white px-3 py-1.5 rounded-xl transition-all"
                  >
                    {goal}
                  </button>
                ))}
              </div>
            )
          }
        ]);
      }, 800);
    } else if (bookingState.step === "age") {
      const ageNum = parseInt(text);
      if (isNaN(ageNum) || ageNum < 14 || ageNum > 85) {
        addBotMessage("Please enter a realistic age between 14 and 85.");
        return;
      }
      setBookingState((prev) => ({ ...prev, age: text, step: "slot" }));
      
      // Prompt slot picker
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Perfect. When would you like to visit? Select a date and time slot below:",
            isCustomComponent: true,
            component: <BookingPicker bookedSlots={bookedSlots} onSelect={submitBooking} />
          }
        ]);
      }, 800);
    } else {
      // Standard chat / FAQs fallback
      addBotMessage("I am a tour helper bot. If you'd like to book a visit or view common questions, click one of the options below:");
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "How can I help you today?",
            isCustomComponent: true,
            component: (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleStartBooking}
                  className="flex-1 py-2 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-colors uppercase tracking-wider"
                >
                  Book Gym Tour
                </button>
                <button
                  onClick={handleStartFAQs}
                  className="flex-1 py-2 border border-white/10 hover:bg-white/5 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  Ask FAQs
                </button>
              </div>
            )
          }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[340px] sm:w-[380px] h-[500px] sm:h-[560px] glass-panel border border-white/5 shadow-2xl rounded-2xl flex flex-col justify-between overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="bg-neon-green/10 p-2 rounded-lg border border-neon-green/20">
                  <Dumbbell className="h-4.5 w-4.5 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm tracking-wide">PowerBot</h4>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Tour Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-neon-green text-black font-bold rounded-tr-none shadow-[0_4px_15px_rgba(255,59,48,0.15)]"
                        : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {!m.isCustomComponent ? m.text : null}
                    {m.isCustomComponent ? (
                      <div>
                        {m.text && <p className="mb-2">{m.text}</p>}
                        {m.component}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              
              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none p-3 px-4 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Selection Options in idle step */}
            {bookingState.step === "idle" && messages.length === 1 && !isTyping && (
              <div className="px-5 py-3 bg-black/20 border-t border-white/5 flex gap-2.5">
                <button
                  onClick={handleStartBooking}
                  className="flex-1 py-2.5 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-colors uppercase tracking-wider"
                >
                  Book Gym Tour
                </button>
                <button
                  onClick={handleStartFAQs}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  Ask FAQs
                </button>
              </div>
            )}

            {/* Input Bar */}
            {bookingState.step !== "slot" && bookingState.step !== "confirmed" && (
              <form
                onSubmit={handleSendInput}
                className="p-4 border-t border-white/5 bg-black/40 flex items-center gap-2"
              >
                <input
                  type={bookingState.step === "age" ? "number" : bookingState.step === "phone" ? "tel" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    bookingState.step === "name"
                      ? "Enter your name..."
                      : bookingState.step === "phone"
                      ? "Enter phone number..."
                      : bookingState.step === "age"
                      ? "Enter your age..."
                      : "Type a message..."
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green text-xs"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-neon-green text-black rounded-xl hover:bg-neon-green/90 transition-colors"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#141414] hover:bg-white hover:text-black border border-white/15 text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center relative cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open assistance chatbot"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green" />
            </span>
            <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </>
        )}
      </motion.button>
    </div>
  );
}

// Interactive Date/Time Slot Picker Component
interface BookingPickerProps {
  bookedSlots: { date: string; time: string }[];
  onSelect: (date: string, time: string) => void;
}

function BookingPicker({ bookedSlots, onSelect }: BookingPickerProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toISOString().split("T")[0]);
  }

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      {/* Date selector */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
          <Calendar className="h-3 w-3 text-neon-green" /> 1. Select Date
        </label>
        <div className="flex gap-2">
          {dates.map((dateStr) => {
            const formattedDate = new Date(dateStr).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            });
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-2xs font-semibold border transition-all text-center ${
                  isSelected
                    ? "bg-neon-green text-black border-neon-green shadow-[0_0_8px_rgba(255,59,48,0.2)]"
                    : "bg-white/2 border-white/5 text-gray-300 hover:border-white/10"
                }`}
              >
                {formattedDate}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slot selector */}
      {selectedDate && (
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3 w-3 text-neon-green" /> 2. Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((timeStr) => {
              // Check if slot is occupied
              const isTaken = bookedSlots.some(
                (s) => s.date === selectedDate && s.time === timeStr
              );
              const isSelected = selectedTime === timeStr;
              return (
                <button
                  key={timeStr}
                  disabled={isTaken}
                  onClick={() => setSelectedTime(timeStr)}
                  className={`py-1 rounded-lg text-3xs font-semibold border transition-all text-center ${
                    isTaken
                      ? "bg-neutral-900 border-neutral-950 text-gray-600 cursor-not-allowed line-through"
                      : isSelected
                      ? "bg-neon-green text-black border-neon-green"
                      : "bg-white/2 border-white/5 text-gray-300 hover:border-white/10"
                  }`}
                >
                  {timeStr} {isTaken ? "(Full)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Book Button */}
      {selectedDate && selectedTime && (
        <button
          onClick={handleBook}
          className="w-full mt-2 py-2 bg-neon-green text-black font-extrabold text-xs rounded-xl hover:bg-neon-green/90 transition-colors uppercase tracking-wider shadow-[0_0_12px_rgba(255,59,48,0.2)]"
        >
          Confirm Tour Slot
        </button>
      )}
    </div>
  );
}
