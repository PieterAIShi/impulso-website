"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Full-bleed, Polestar-style hero: a full-screen visual with the copy
 * overlaid in light type, a dark scrim for legibility, and a hairline
 * spec-row at the bottom.
 *
 * The visual is swappable: drop a 3D render / photo at the path below
 * (e.g. /images/hero/hero.jpg) and set HERO_IMAGE to it — the CSS
 * "render-like" abstract background is only used as a stand-in while
 * HERO_IMAGE is empty.
 */
const HERO_IMAGE = ""; // e.g. "/images/hero/hero.jpg" — leave empty for the coded backdrop

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

  // Coded "3D render"-like backdrop: deep neutral base, slow-drifting
  // glows for depth, and a fine grid — monochrome with a cool tint.
  return (
    <div aria-hidden className="absolute inset-0 bg-neutral-950 overflow-hidden">
      {/* Drifting glows */}
      <motion.div
        className="absolute -top-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,130,160,0.18) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(90,100,130,0.16) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
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

      {/* Scrim for legibility — darkest at the bottom-left where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Copy */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70 mb-8"
          >
            {isNL ? "AI-bureau — Amsterdam" : "AI agency — Amsterdam"}
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.02] text-white max-w-5xl mb-8"
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
            className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-xl mb-12"
          >
            {isNL
              ? "AI-agents die samenwerken, delegeren en uitvoeren. Live in twee weken."
              : "AI agents that collaborate, delegate and execute. Live in two weeks."}
          </motion.p>

          {/* CTAs — quiet, Polestar-style, on a dark backdrop */}
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
              className="inline-flex items-center justify-center h-12 px-10 border border-white/50 text-sm font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors duration-200"
            >
              {isNL ? "Plan gratis intake" : "Book free intake"}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              {isNL ? "Bekijk agents" : "View agents"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Spec row — hairline-separated stats, light on dark */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-t border-white/20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="pt-6 pr-8 lg:border-r lg:border-white/20 lg:last:border-r-0 lg:px-8 lg:first:pl-0"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-white/60">{stat.unit}</span>
              </div>
              <p className="text-xs text-white/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function HeroLoading() {
  return (
    <section className="relative min-h-screen flex items-center bg-neutral-950">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="space-y-8">
          <div className="h-4 w-48 bg-white/10 animate-pulse" />
          <div className="h-24 w-full max-w-3xl bg-white/10 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-white/5 animate-pulse" />
          <div className="h-12 w-64 bg-white/5 animate-pulse" />
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
