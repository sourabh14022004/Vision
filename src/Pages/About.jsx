import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <div className="bg-[#0a0a0a] text-white w-full min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-28">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.02] blur-[120px]" />
        </div>

        {/* Top meta row */}
        <div className="absolute top-28 left-8 right-8 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono tracking-[0.18em] text-white/40 uppercase">VERSION EV</span>
            <span className="text-[11px] font-mono tracking-[0.18em] text-white/25">Est. 2024 — India</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-semibold text-white/50 tracking-widest uppercase bg-white/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Rides Available
            </span>
          </div>
        </div>

        {/* Huge headline */}
        <div className="relative z-10 px-8 md:px-16 pb-8">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(64px, 11vw, 160px)' }}
            >
              YOUR RIDE.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(64px, 11vw, 160px)', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.35)' }}
            >
              YOUR CITY.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(64px, 11vw, 160px)' }}
            >
              YOUR FUTURE.
            </motion.h1>
          </div>
        </div>

        {/* Scooter hero image — parallax */}
        <motion.div
          style={{ y: imgY }}
          className="absolute right-0 bottom-0 w-[55%] md:w-[42%] pointer-events-none z-20"
        >
          <motion.img
            src="/assets/versionVo.png"
            alt="Version V0 Electric Scooter"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-auto object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.8))' }}
          />
        </motion.div>

        {/* Floating tags on the left */}
        <motion.div
          className="absolute left-8 md:left-16 bottom-40 z-30 space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Rating badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-white font-bold text-sm">4.9</span>
            <span className="text-white/70 text-xs font-medium">Customer Rating</span>
          </div>

          {/* Ride mode chips */}
          <div className="flex flex-col gap-1.5">
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] text-white/80 uppercase"
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              ECO CITY RIDER
            </span>
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] text-white/55 uppercase"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              SPORT COMMUTE
            </span>
          </div>
        </motion.div>

        {/* Right side tagline */}
        <motion.div
          className="absolute right-8 md:right-16 bottom-12 z-30 text-right max-w-[220px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-white/45 text-xs leading-relaxed font-medium">
            Whether you're commuting across town or exploring the city, Version is your perfect electric companion — built for those who ride smart.
          </p>
        </motion.div>

        {/* Bottom border */}
        <div className="h-px w-full bg-white/[0.06] mt-16 relative z-10" />
      </section>

      {/* ── SMALL IN SIZE. BIG IMPACT. ── */}
      <section className="relative bg-[#0a0a0a] px-8 md:px-16 py-28 overflow-hidden">

        {/* Ambient glow bottom left */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: big text */}
          <div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="text-[10px] font-mono tracking-[0.22em] text-white/30 uppercase mb-8"
            >
              01 — Design Philosophy
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-[0.85] tracking-[-0.02em] text-white"
                style={{ fontSize: 'clamp(52px, 7vw, 108px)' }}
              >
                SMALL
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-[0.85] tracking-[-0.02em] text-white"
                style={{ fontSize: 'clamp(52px, 7vw, 108px)' }}
              >
                IN SIZE.
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-[0.85] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(52px, 7vw, 108px)', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}
              >
                BIG IMPACT.
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="text-white/50 text-base leading-relaxed max-w-md"
            >
              Version Vo is sculpted from aerospace-grade aluminium. Every curve is intentional, every gram accounted for — a scooter that carries you farther than you ever imagined.
            </motion.p>
          </div>

          {/* Right: scooter V1 image + floating badges */}
          <div className="relative flex items-center justify-center">
            <motion.img
              src="/assets/versionV1.png"
              alt="Version V1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xs md:max-w-sm object-contain"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))' }}
            />

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-4 right-0 md:right-[-40px] bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 backdrop-blur-md"
            >
              <p className="text-[10px] font-mono tracking-[0.18em] text-white/40 uppercase">Built to Last</p>
              <p className="text-[10px] font-mono tracking-[0.12em] text-white/25 uppercase">With High Quality</p>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-4 left-0 md:left-[-40px] flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-sm">⚡</div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.14em] text-white/40 uppercase">From Business</p>
                <p className="text-[10px] font-mono tracking-[0.14em] text-white/25 uppercase">To Leisure</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ALWAYS AT HAND — STATS ROW ── */}
      <section className="relative bg-[#0d0d0d] border-t border-white/[0.04] px-8 md:px-16 py-24 overflow-hidden">

        {/* Giant watermark text */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-black uppercase whitespace-nowrap leading-none"
            style={{ fontSize: 'clamp(80px, 14vw, 220px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)', letterSpacing: '-0.03em' }}
          >
            ALWAYS AT HAND
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-[10px] font-mono tracking-[0.22em] text-white/30 uppercase mb-20"
          >
            02 — By The Numbers
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
            {[
              { value: '25K+', label: 'Happy Riders', sub: 'Across India' },
              { value: '150+', label: 'Cities Reached', sub: 'And growing' },
              { value: '60km', label: 'Range Per Charge', sub: 'Single battery' },
              { value: '99.9%', label: 'Satisfaction', sub: 'Customer score' },
            ].map((stat, i) => (
              <motion.div
                key={stat.value}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                className="bg-[#0d0d0d] px-8 py-12 group hover:bg-white/[0.02] transition-colors duration-300"
              >
                <p className="font-black text-white leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 72px)' }}>{stat.value}</p>
                <p className="text-white/70 text-sm font-semibold tracking-wide mb-1">{stat.label}</p>
                <p className="text-white/25 text-xs font-mono tracking-wider uppercase">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ROW ── */}
      <section className="bg-[#0a0a0a] px-8 md:px-16 py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-[10px] font-mono tracking-[0.22em] text-white/30 uppercase mb-16"
          >
            03 — What's Inside
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              {
                icon: '🔋',
                title: 'LONG RANGE',
                body: 'High-density lithium cells carry you 60 km on a single charge. Fast-charge from 0–80% in under 2 hours.',
                tag: '60 km Battery',
              },
              {
                icon: '⚡',
                title: 'INSTANT TORQUE',
                body: 'A 500W brushless motor delivers silent, instant power — reaching 45 km/h across three riding modes.',
                tag: '45 km/h Top Speed',
              },
              {
                icon: '📱',
                title: 'SMART BY DEFAULT',
                body: 'Keyless Bluetooth unlock, OTA updates, and real-time trip analytics through the Version app.',
                tag: 'App Connected',
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                className="bg-[#0a0a0a] px-8 py-12 group hover:bg-white/[0.025] transition-colors duration-300 relative overflow-hidden"
              >
                {/* Top tag */}
                <span className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-semibold text-white/40 tracking-widest uppercase bg-white/[0.02] mb-8">
                  {feat.tag}
                </span>

                <div className="text-3xl mb-6 opacity-60">{feat.icon}</div>

                <h3
                  className="font-black uppercase text-white mb-4 leading-tight"
                  style={{ fontSize: 'clamp(24px, 3vw, 42px)', letterSpacing: '-0.02em' }}
                >
                  {feat.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed">{feat.body}</p>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-white/[0.02] group-hover:bg-white/[0.04] transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER VIDEO ── */}
      <section className="bg-[#0d0d0d] border-t border-white/[0.04] px-8 md:px-16 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                className="text-[10px] font-mono tracking-[0.22em] text-white/30 uppercase mb-4"
              >
                04 — From Our Founder
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black uppercase text-white leading-tight"
                  style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.02em' }}
                >
                  THE VISION
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black uppercase leading-tight"
                  style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
                >
                  BEHIND VERSION
                </motion.h2>
              </div>
            </div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-white/35 text-sm leading-relaxed max-w-xs"
            >
              A message on why we believe smarter urban mobility starts with one quiet, powerful, electric ride.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <iframe
              src="https://www.youtube.com/embed/YpXN8BvEpB0?autoplay=0&controls=1&rel=0&showinfo=0"
              title="Founder Message"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-white px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="font-black uppercase text-black leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.02em' }}
            >
              READY TO RIDE?
            </h2>
            <p className="text-black/40 text-sm mt-3 font-medium max-w-xs">
              Join 25,000+ riders who already switched to electric with Version.
            </p>
          </div>
          <motion.a
            href="/products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase px-10 py-5 rounded-full text-sm tracking-widest hover:bg-[#111] transition-colors"
          >
            Explore Models
            <span className="text-lg">→</span>
          </motion.a>
        </div>
      </section>

    </div>
  );
};

export default About;