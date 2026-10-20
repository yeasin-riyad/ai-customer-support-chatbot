"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

type NavbarProps = {
  email: string;
};

const Navbar = ({ email }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isLoggedIn = Boolean(email);
  const firstLetter = email?.[0]?.toUpperCase() ?? "?";

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#080817]/80 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Nexora AI home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Bot className="h-6 w-6 text-white" />
          </div>

          <div className="text-xl font-bold tracking-tight">
            nexora
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            How it works
          </a>
          <a
            href="#demo"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Live demo
          </a>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div ref={popupRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                aria-expanded={open}
                aria-label="Open account menu"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] p-1.5 pr-3 transition hover:border-violet-400/40 hover:bg-white/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold">
                  {firstLetter}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111124] p-2 shadow-2xl shadow-black/40"
                  >
                    <div className="border-b border-white/[0.08] px-3 py-3">
                      <p className="truncate text-sm font-semibold text-white">
                        Welcome back!
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      <LayoutDashboard className="h-4 w-4 text-violet-400" />
                      Go to dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="hidden rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-400/40 hover:bg-white/[0.06] sm:block"
            >
              Log in
            </button>
          )}

          {!isLoggedIn && (
            <button
              type="button"
              onClick={handleLogin}
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#080817] transition hover:bg-violet-100 sm:flex"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#080817]/95 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Live demo", href: "#demo" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;