"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Polestar-style hero: full viewport, type-led, generous whitespace.
 * One message, two quiet CTAs, spec-row stats separated by hairlines.
 */
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
      className="relative min-h-screen flex flex-col bg-background"
    >
      <div className="flex-1 flex items-center">
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

      {/* Spec row — hairline-separated stats, Polestar style */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16"
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
                <span className="text-sm text-muted-foreground">
                  {stat.unit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function HeroLoading() {
  return (
    <section className="relative min-h-screen flex items-center bg-background">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="space-y-8">
          <div className="h-4 w-48 bg-muted animate-pulse" />
          <div className="h-24 w-full max-w-3xl bg-muted animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-muted/60 animate-pulse" />
          <div className="h-12 w-64 bg-muted/40 animate-pulse" />
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
