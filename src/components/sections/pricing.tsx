"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";

/**
 * Pricing — a first proposal ("voorzet"). Three tiers in a hairline grid,
 * Polestar style. Prices are placeholders to be replaced with real ones.
 */
export default function Pricing() {
  const { language } = useLanguage();
  const isNL = language === "nl";

  const plans = [
    {
      name: isNL ? "Start" : "Start",
      price: isNL ? "vanaf €1.500" : "from €1,500",
      note: isNL ? "eenmalig" : "one-time",
      tagline: isNL
        ? "Eén AI-agent, kant-en-klaar."
        : "One AI agent, ready to go.",
      features: isNL
        ? [
            "1 AI-agent op maat",
            "Live binnen 2 weken",
            "1 integratie naar keuze",
            "30 dagen support",
          ]
        : [
            "1 custom AI agent",
            "Live within 2 weeks",
            "1 integration of choice",
            "30 days of support",
          ],
      popular: false,
    },
    {
      name: isNL ? "Groei" : "Growth",
      price: isNL ? "vanaf €3.500" : "from €3,500",
      note: isNL ? "per project" : "per project",
      tagline: isNL
        ? "Meerdere agents die samenwerken."
        : "Multiple agents that collaborate.",
      features: isNL
        ? [
            "Tot 5 samenwerkende agents",
            "Meerdere integraties",
            "Dashboard & monitoring",
            "Doorlopende optimalisatie",
          ]
        : [
            "Up to 5 collaborating agents",
            "Multiple integrations",
            "Dashboard & monitoring",
            "Ongoing optimisation",
          ],
      popular: true,
    },
    {
      name: isNL ? "Op maat" : "Custom",
      price: isNL ? "Prijs op aanvraag" : "Custom quote",
      note: isNL ? "enterprise" : "enterprise",
      tagline: isNL
        ? "Volledig op maat, on-premise mogelijk."
        : "Fully bespoke, on-premise possible.",
      features: isNL
        ? [
            "Onbeperkt aantal agents",
            "On-premise & AVG-compliant",
            "Maatwerk-integraties",
            "SLA & dedicated support",
          ]
        : [
            "Unlimited agents",
            "On-premise & GDPR-compliant",
            "Bespoke integrations",
            "SLA & dedicated support",
          ],
      popular: false,
    },
  ];

  return (
    <section
      id="prijzen"
      className="py-24 sm:py-32 bg-background border-t border-foreground/10"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
          >
            {isNL ? "Prijzen" : "Pricing"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6"
          >
            {isNL ? "Heldere prijzen, geen verrassingen" : "Clear pricing, no surprises"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed"
          >
            {isNL
              ? "Kies een startpunt — we stemmen het exacte voorstel af tijdens de gratis intake."
              : "Pick a starting point — we tailor the exact proposal during the free intake."}
          </motion.p>
        </div>

        {/* Plans — hairline grid */}
        <div className="grid md:grid-cols-3 border-t border-l border-foreground/15">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col p-8 sm:p-10 border-r border-b border-foreground/15"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="text-[10px] uppercase tracking-[0.15em] bg-foreground text-background px-2.5 py-1">
                    {isNL ? "Populair" : "Popular"}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                  {plan.price}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-6">
                {plan.note}
              </p>

              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                {plan.tagline}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm text-foreground/80 font-light leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("ready-to-start")}
                className={
                  plan.popular
                    ? "group inline-flex items-center justify-center gap-2 h-12 px-6 bg-foreground text-background text-sm font-medium hover:bg-terracotta transition-colors"
                    : "group inline-flex items-center justify-center gap-2 h-12 px-6 border border-foreground/40 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta transition-colors"
                }
              >
                {isNL ? "Plan gratis intake" : "Book free intake"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Placeholder note — remove once real prices are set */}
        <p className="text-xs text-muted-foreground/60 mt-8">
          {isNL
            ? "Bedragen zijn een voorzet en nog niet definitief."
            : "Amounts are a draft and not final yet."}
        </p>
      </div>
    </section>
  );
}
