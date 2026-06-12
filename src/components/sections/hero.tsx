"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Full-bleed, Polestar-style hero: a full-screen visual with the copy
 * overlaid in dark type. The visual is a light, warm backdrop with a
 * subtle terracotta wash drifting diagonally (top-left → bottom-right).
 *
 * The visual is swappable: drop a 3D render / photo at the path below
 * and set HERO_IMAGE to it — the coded backdrop is only the stand-in
 * while HERO_IMAGE is empty.
 */
const HERO_IMAGE = ""; // e.g. "/images/hero/hero.jpg" — leave empty for the coded backdrop
const TERRACOTTA = "#B4442A";

function HeroBackdrop() {
  if (HERO_IMAGE) {
    return (
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  // Light, warm base with a terracotta flood that visibly travels across
  // the hero — diagonally top-left -> bottom-right and back, so it flows
  // continuously ("waast") without a hard loop.
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#FAF7F5" }}>
      {/* Faint constant diagonal tint so the corner never goes fully empty */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${TERRACOTTA}26 0%, ${TERRACOTTA}10 30%, transparent 60%)`,
        }}
      />
      {/* Primary flood — large terracotta pool sweeping diagonally across */}
      <motion.div
        className="absolute w-[65vw] h-[65vw] rounded-full"
        style={{
          top: "-20%",
          left: "-20%",
          background: `radial-gradient(circle, ${TERRACOTTA}40 0%, ${TERRACOTTA}1a 45%, transparent 65%)`,
          filter: "blur(70px)",
        }}
        animate={{ x: ["0vw", "55vw", "0vw"], y: ["0vh", "70vh", "0vh"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Trailing pool — offset phase for an organic, flowing feel */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full"
        style={{
          top: "-10%",
          left: "0%",
          background: `radial-gradient(circle, ${TERRACOTTA}2e 0%, transparent 60%)`,
          filter: "blur(90px)",
        }}
        animate={{ x: ["10vw", "60vw", "10vw"], y: ["-5vh", "55vh", "-5vh"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Fine grid, very subtle */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
    </div>
  );
}

function HeroContent() {
  const { language } = useLanguage();
  const isNL = language === "nl";

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  const stats = [
    {
      value: "2",
      unit: isNL ? "weken" : "weeks",
      label: isNL ? "Van intake tot live" : "From intake to live",
    },
    {
      value: "24",
      unit: "agents",
      label: isNL ? "Gespecialiseerde AI-agents" : "Specialised AI agents",
    },
    {
      value: "18+",
      unit: isNL ? "bedrijven" : "companies",
      label: isNL ? "Vertrouwen op Impulso Co." : "Trust Impulso Co.",
    },
    {
      value: "100%",
      unit: isNL ? "garantie" : "guarantee",
      label: isNL ? "Niet goed, geld terug" : "Money-back guarantee",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Full-bleed visual */}
      <HeroBackdrop />

      {/* Copy */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8"
          >
            {isNL ? "AI-bureau — Amsterdam" : "AI agency — Amsterdam"}
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.02] text-foreground max-w-5xl mb-8"
          >
            {isNL ? (
              <>
                Wij bouwen jouw
                <br />
                digitale team.
              </>
            ) : (
              <>
                We build your
                <br />
                digital team.
              </>
            )}
          </motion.h1>

          {/* Subline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-12"
          >
            {isNL
              ? "AI-agents die samenwerken, delegeren en uitvoeren. Live in twee weken."
              : "AI agents that collaborate, delegate and execute. Live in two weeks."}
          </motion.p>

          {/* CTAs — quiet, Polestar-style */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
          >
            <a
              href="#ready-to-start"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ready-to-start");
              }}
              className="inline-flex items-center justify-center h-12 px-10 border border-foreground/40 text-sm font-medium text-foreground hover:border-foreground transition-colors duration-200"
            >
              {isNL ? "Plan gratis intake" : "Book free intake"}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {isNL ? "Bekijk agents" : "View agents"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Spec row — hairline-separated stats */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-t border-foreground/15">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="pt-6 pr-8 lg:border-r lg:border-foreground/15 lg:last:border-r-0 lg:px-8 lg:first:pl-0"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function HeroLoading() {
  return (
    <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#FAF7F5" }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="space-y-8">
          <div className="h-4 w-48 bg-foreground/10 animate-pulse" />
          <div className="h-24 w-full max-w-3xl bg-foreground/10 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-foreground/5 animate-pulse" />
          <div className="h-12 w-64 bg-foreground/5 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <HeroContent /> : <HeroLoading />;
}
