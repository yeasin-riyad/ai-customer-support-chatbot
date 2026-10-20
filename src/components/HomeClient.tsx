"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  Code2,
  Headphones,
  MessageCircle,
  MessageSquare,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const HomeClient = ({ email }: { email: string }) => {
  const shouldReduceMotion = useReducedMotion();

  const isLoggedIn = Boolean(email);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const features = [
    {
      number: "01",
      icon: Zap,
      title: "Plug & Play",
      description:
        "Bring intelligent customer support to your website in minutes. No complicated setup or AI expertise required.",
      color: "from-violet-500 to-indigo-500",
      glow: "group-hover:shadow-violet-500/10",
    },
    {
      number: "02",
      icon: Code2,
      title: "You're in Control",
      description:
        "Manage your chatbot, customize its behavior, and keep your business knowledge organized from one dashboard.",
      color: "from-blue-500 to-cyan-400",
      glow: "group-hover:shadow-blue-500/10",
    },
    {
      number: "03",
      icon: MessageCircle,
      title: "Always Available",
      description:
        "Give your customers instant answers around the clock, even when your team is away.",
      color: "from-fuchsia-500 to-violet-500",
      glow: "group-hover:shadow-fuchsia-500/10",
    },
  ];

  const floatingTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080817] text-white selection:bg-violet-500/30 selection:text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute top-40 -right-60 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar email={email} />

      {/* Hero */}
      <section className="relative px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* Hero content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2">
              <Sparkles className="h-4 w-4 text-violet-300" />
              <span className="text-xs font-medium tracking-wide text-violet-200 sm:text-sm">
                Meet your next-generation AI support
              </span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.13] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-[68px]">
              Customer support,
              <br />
              <span className="mt-2 inline-block bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text pb-2 text-transparent">
                reimagined with AI.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Meet the AI assistant that knows your business, answers questions
              instantly, and turns every customer conversation into a better
              experience.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={
                  isLoggedIn
                    ? () => (window.location.href = "/dashboard")
                    : handleLogin
                }
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/30"
              >
                {isLoggedIn ? "Go to dashboard" : "Launch your AI assistant"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#demo"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <MessageCircle className="h-4 w-4 text-cyan-300" />
                Explore the demo
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Easy setup
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Your business knowledge
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                24/7 availability
              </span>
            </div>
          </motion.div>

          {/* Interactive-looking chat preview */}
          <motion.div
            id="demo"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, x: 35, scale: 0.97 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-violet-600/20 via-indigo-500/10 to-cyan-400/20 blur-3xl" />

            <motion.div
              animate={
                shouldReduceMotion ? undefined : { y: [0, -8, 0] }
              }
              transition={floatingTransition}
              className="relative rounded-[28px] border border-white/10 bg-[#101023]/90 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-5"
            >
              {/* Window top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-3 pb-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight">Nexora Assistant</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Online · Ready to help
                    </p>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-6 px-2 py-7 sm:px-3">
                <div className="text-center">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-500">
                    TODAY · LIVE PREVIEW
                  </span>
                </div>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                    <Bot className="h-4 w-4 text-violet-300" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] p-4">
                    <p className="text-xs font-medium text-violet-300">
                      Nexora AI
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Hey there! 👋 Welcome to our store. How can I make your
                      day easier?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-indigo-600 p-4 shadow-lg shadow-violet-900/20">
                    <p className="text-sm leading-6 text-white">
                      Hi! Do you offer cash on delivery?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                    <Sparkles className="h-4 w-4 text-violet-300" />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-violet-400/15 bg-violet-500/[0.06] p-4">
                    <p className="text-xs font-medium text-violet-300">
                      Nexora AI
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Absolutely! 🎉 We offer cash on delivery across our
                      supported delivery areas. I can also help you find the
                      perfect product.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-200">
                        Delivery details
                      </span>
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-xs text-cyan-200">
                        Browse products
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: [0.45, 1, 0.45] }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-3 pl-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/15">
                    <Bot className="h-4 w-4 text-violet-300" />
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span className="ml-2 text-xs text-slate-400">
                      AI is ready to help
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Chat input preview */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <MessageSquare className="ml-1 h-4 w-4 shrink-0 text-slate-500" />
                <span className="flex-1 text-sm text-slate-500">
                  Ask me anything...
                </span>
                <button
                  type="button"
                  aria-label="Demo send button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="pt-3 text-center text-[10px] tracking-wide text-slate-600">
                POWERED BY NEXORA AI
              </p>
            </motion.div>

            {/* Floating status cards */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, 7, 0], rotate: [0, 1, 0] }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-4 top-24 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#15152a]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex lg:-left-10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Instant responses
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Always ready to help
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -7, 0], rotate: [0, -1, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 bottom-24 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#15152a]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex lg:-right-9"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                <Headphones className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  24/7 support
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Even while you sleep
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#features"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 5, 0], opacity: [0.6, 1, 0.6] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto mt-20 flex w-fit flex-col items-center gap-2 text-slate-500 transition hover:text-white"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            Discover more
          </span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </section>

      {/* Feature section */}
      <section
        id="features"
        className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Built for better conversations
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Less busywork.
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                More meaningful support.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Everything you need to deliver smarter customer experiences,
              without making your workflow more complicated.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.number}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 30 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.045] hover:shadow-2xl sm:p-8 ${feature.glow}`}
                >
                  <div
                    className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${feature.color} opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  <div className="relative flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-slate-700">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-xl font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>

                  <p className="relative mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                    {feature.description}
                  </p>

                  <div className="relative mt-7 flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                    <span>Explore possibilities</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-600/[0.12] via-indigo-600/[0.06] to-cyan-500/[0.08] p-7 sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Simple by design
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                From setup to
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  smarter support.
                </span>
              </h2>

              <p className="mt-6 max-w-lg leading-7 text-slate-400">
                Give your AI the right knowledge, make it yours, and let it
                handle everyday customer questions while your team focuses on
                what matters.
              </p>

              <button
                type="button"
                onClick={
                  isLoggedIn
                    ? () => (window.location.href = "/dashboard")
                    : handleLogin
                }
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#080817] transition hover:-translate-y-0.5 hover:bg-violet-100"
              >
                {isLoggedIn ? "Open your dashboard" : "Get started today"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  number: "01",
                  icon: Code2,
                  title: "Connect your website",
                  text: "Get your AI support experience ready to integrate.",
                },
                {
                  number: "02",
                  icon: Sparkles,
                  title: "Add your knowledge",
                  text: "Help the assistant understand your products and services.",
                },
                {
                  number: "03",
                  icon: MessageCircle,
                  title: "Start helping customers",
                  text: "Deliver helpful answers whenever customers need them.",
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: 20 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12,
                    }}
                    className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#0c0c1e]/75 p-5 transition duration-300 hover:border-violet-400/25 hover:bg-[#111126]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-violet-300 transition group-hover:from-violet-500/30 group-hover:to-cyan-400/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-white">
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-bold tracking-widest text-slate-600">
                          STEP {step.number}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 shadow-xl shadow-violet-600/10"
          >
            <Sparkles className="h-8 w-8 text-violet-300" />
          </motion.div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to make support
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              feel effortless?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Your customers deserve fast, helpful answers. Give them an
            experience they will love with Nexora AI.
          </p>

          <button
            type="button"
            onClick={
              isLoggedIn
                ? () => (window.location.href = "/dashboard")
                : handleLogin
            }
            className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/30"
          >
            {isLoggedIn ? "Go to your dashboard" : "Get started with Nexora"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-5 text-xs text-slate-500">
            Intelligent conversations start here.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.08] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">
              nexora
              <span className="text-violet-400">AI</span>
            </span>
          </Link>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Nexora AI. Built for better
            conversations.
          </p>

          <a
            href="#features"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            Back to top
            <ArrowDown className="h-4 w-4 rotate-180" />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default HomeClient;