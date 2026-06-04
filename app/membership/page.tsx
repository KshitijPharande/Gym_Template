"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ShieldCheck, HelpCircle } from "lucide-react";

// Pricing list
const plans = [
  {
    name: "Basic",
    price: "₹999",
    billing: "per month",
    popular: false,
    desc: "Perfect for budget-conscious fitness seekers who want off-peak hours access.",
    accessHours: "10:00 AM – 5:00 PM (Off-Peak)",
    features: [
      "Access to cardio and strength machines",
      "Locker room & shower access",
      "Basic general instructor guidance",
      "Valid Monday to Saturday"
    ],
    cta: "Choose Basic",
    waMessage: "Hi PowerFit Pune, I'd like to sign up for the Basic Membership plan (₹999/mo)."
  },
  {
    name: "Pro Club",
    price: "₹1,999",
    billing: "per month",
    popular: true,
    desc: "Our most popular plan. Access the gym anytime and join premium group training sessions.",
    accessHours: "6:00 AM – 10:00 PM (Full Access)",
    features: [
      "All-Day general gym floor access",
      "Unlimited CrossFit, Yoga & Zumba classes",
      "Monthly body metrics assessment",
      "Customized monthly macro diet chart",
      "Valid Monday to Sunday"
    ],
    cta: "Join Pro Club",
    waMessage: "Hi PowerFit Pune, I'd like to sign up for the Pro Club Membership plan (₹1,999/mo)."
  },
  {
    name: "Elite",
    price: "₹2,999",
    billing: "per month",
    popular: false,
    desc: "For those committed to total transformation. Includes dedicated 1-on-1 coaching sessions.",
    accessHours: "6:00 AM – 10:00 PM (Full Access)",
    features: [
      "All features in the Pro Club plan",
      "8 Dedicated 1-on-1 personal coaching sessions",
      "Highly customized diet & workout progression logs",
      "Unlimited InBody composition analysis checks",
      "Priority equipment reservations"
    ],
    cta: "Get Elite Access",
    waMessage: "Hi PowerFit Pune, I'd like to sign up for the Elite Membership plan (₹2,999/mo)."
  }
];

// Comparison Matrix
const comparisonFeatures = [
  { name: "Off-Peak Access (10AM - 5PM)", basic: true, pro: true, elite: true },
  { name: "Peak Access (6AM - 10PM)", basic: false, pro: true, elite: true },
  { name: "Gym Floor & Weight Section", basic: true, pro: true, elite: true },
  { name: "Lockers, Steam & Shower", basic: true, pro: true, elite: true },
  { name: "Zumba & Yoga Group Classes", basic: false, pro: true, elite: true },
  { name: "CrossFit Arena Access", basic: false, pro: true, elite: true },
  { name: "Diet Chart Updates", basic: false, pro: "Monthly", elite: "Weekly / Customized" },
  { name: "1-on-1 Personal Coaching", basic: false, pro: false, elite: "8 Sessions / Month" },
  { name: "InBody Composition Scan", basic: false, pro: "Quarterly", elite: "Unlimited" },
  { name: "Membership Freeze Option", basic: false, pro: "15 Days / Year", elite: "30 Days / Year" }
];

// FAQs
const faqs = [
  {
    question: "Can I freeze or pause my membership when traveling?",
    answer: "Yes, you can! Pro Club members can freeze their membership for up to 15 days, and Elite members can freeze it for up to 30 days per calendar year. Basic membership cannot be frozen."
  },
  {
    question: "Are there any hidden signup or registration fees?",
    answer: "Absolutely not. The price you see is exactly what you pay. We don't charge any entry or machine maintenance fees."
  },
  {
    question: "Can I upgrade from Basic to Pro mid-month?",
    answer: "Yes! You can easily upgrade your plan by contacting the reception. You will only pay the difference amount adjusted for the remaining days of your billing cycle."
  },
  {
    question: "Do you offer daily or weekly passes?",
    answer: "Yes, we do. Single-day passes are available for ₹250 and 1-week unlimited passes are ₹1,000. These charges are fully adjusted if you convert to a monthly plan within the same week."
  },
  {
    question: "What are the timings of the gym?",
    answer: "We are open Monday to Saturday from 6:00 AM to 10:00 PM, and on Sundays from 8:00 AM to 2:00 PM (Sundays are off-peak, open floor only)."
  }
];

export default function Membership() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <section className="text-center py-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5" /> Pricing Tiers
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          MEMBERSHIP <span className="text-neon-green text-glow-green">PLANS</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Unlock your true fitness potential. Select a plan designed around your training routine and get immediate access.
        </p>
      </section>

      {/* 2. Membership Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24 pt-4">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            className={`glass-card p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
              plan.popular
                ? "border-2 border-neon-green md:scale-105 shadow-[0_0_30px_rgba(255,59,48,0.15)] z-10"
                : "border border-white/5 hover:border-white/10"
            }`}
            whileHover={{ y: -6 }}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon-green text-black font-extrabold text-2xs uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <div>
              <p className={`text-sm font-semibold tracking-wider uppercase ${plan.popular ? "text-neon-green" : "text-gray-400"}`}>
                {plan.name}
              </p>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-4xl sm:text-5xl font-extrabold">{plan.price}</span>
                <span className="ml-1 text-sm font-medium text-gray-400">/{plan.billing}</span>
              </div>
              <p className="text-gray-400 text-xs mt-2 font-medium">Access: {plan.accessHours}</p>
              
              <p className="text-gray-300 text-sm mt-4 leading-relaxed font-light">
                {plan.desc}
              </p>

              <div className="border-t border-white/5 my-6" />

              <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="h-4.5 w-4.5 text-neon-green shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={`https://wa.me/918796644348?text=${encodeURIComponent(plan.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3.5 rounded-xl text-center text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  plan.popular
                    ? "bg-neon-green text-black hover:bg-neon-green/90 shadow-[0_0_15px_rgba(255,59,48,0.3)]"
                    : "border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. Feature Comparison Table */}
      <section className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Plan Feature Comparison
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Compare gym features side by side to choose the best value for your requirements.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/5 glass-panel">
          <table className="min-w-full divide-y divide-white/5 text-center border-collapse">
            <thead>
              <tr className="bg-white/5 text-2xs sm:text-xs font-bold uppercase tracking-wider text-gray-300 text-left md:text-center">
                <th className="px-6 py-4 text-left">Features</th>
                <th className="px-6 py-4">Basic</th>
                <th className="px-6 py-4 text-neon-green">Pro Club</th>
                <th className="px-6 py-4">Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-left font-semibold text-white whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-6 py-4">
                    {typeof row.basic === "boolean" ? (
                      row.basic ? <Check className="h-5 w-5 text-neon-green mx-auto" /> : <X className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <span className="font-medium text-gray-400">{row.basic}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {typeof row.pro === "boolean" ? (
                      row.pro ? <Check className="h-5 w-5 text-neon-green mx-auto" /> : <X className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <span className="text-neon-green font-bold">{row.pro}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {typeof row.elite === "boolean" ? (
                      row.elite ? <Check className="h-5 w-5 text-neon-green mx-auto" /> : <X className="h-5 w-5 text-gray-600 mx-auto" />
                    ) : (
                      <span className="font-semibold text-electric-blue">{row.elite}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest justify-center">
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white hover:text-neon-green transition-colors font-bold text-sm sm:text-base gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-neon-green" : ""
                    }`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
