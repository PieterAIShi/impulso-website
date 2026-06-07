"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function GuaranteeSection() {
    const { language } = useLanguage();

    const guarantees = [
        language === 'nl'
            ? 'Geld terug als je niet tevreden bent — geen vragen, geen gedoe'
            : 'Money back if you\'re not satisfied — no questions asked',
        language === 'nl'
            ? 'Binnen 4 uur persoonlijke reactie van ons team'
            : 'Personal response from our team within 4 hours',
        language === 'nl'
            ? 'Past het niet perfect? Gratis aanpassingen tot het klopt'
            : 'Not perfect? Free revisions until it is'
    ];

    return (
        <section className="py-24 sm:py-32 bg-background border-t border-foreground/10" id="guarantee">
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: statement */}
                    <div>
                        <motion.p
                            className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'Onze belofte' : 'Our promise'}
                        </motion.p>

                        <motion.h2
                            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                        >
                            {language === 'nl' ? 'Jouw tevredenheid, gegarandeerd' : 'Your satisfaction, guaranteed'}
                        </motion.h2>

                        <motion.p
                            className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {language === 'nl' ? 'Wij nemen het risico, niet jij.' : 'We take the risk. Not you.'}
                        </motion.p>
                    </div>

                    {/* Right: guarantees — hairline-separated list */}
                    <div className="border-t border-foreground/15">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 py-6 border-b border-foreground/15"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + index * 0.08 }}
                            >
                                <Check className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <p className="text-base sm:text-lg text-foreground/80 font-light leading-relaxed">
                                    {guarantee}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
