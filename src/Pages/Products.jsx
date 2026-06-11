import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import versionVo from '../assets/versionVo.png';
import versionV1 from '../assets/versionV1.png';

/* ─── data ─────────────────────────────────────────────── */
const FEATURED = {
  category: 'Flagship Collection',
  name: 'Version V0',
  tagline: 'The scooter that changes everything.',
  description:
    'Version V0 is built as a long-term urban companion, not a disposable commuter tool. Aerospace aluminium frame, 500W motor, 60 km range.',
  price: '₹49,999',
  rating: 4.9,
  reviews: 214,
  colors: [
    { id: 'midnight', hex: '#1a1a1a', label: 'Midnight Black' },
    { id: 'arctic',   hex: '#c8d4dc', label: 'Arctic White'  },
    { id: 'cobalt',   hex: '#1e4dab', label: 'Cobalt Blue'   },
  ],
  image: versionVo,
};

const SPECS = [
  ['500W Brushless Motor',      'Bluetooth App Control'],
  ['60 km Range per Charge',    'Keyless Smart Unlock'],
  ['45 km/h Top Speed',         'OTA Firmware Updates'],
  ['0–80% Fast Charge (2 hrs)', 'Real-Time Trip Analytics'],
  ['3 Riding Modes (Eco/Cruise/Sport)', 'IP54 All-Weather Rating'],
  ['Regenerative Braking',      'Digital LED Dashboard'],
];

const MODELS = [
  {
    id: 1,
    label: 'Everyday Commuter',
    name: 'Version X1',
    price: '₹49,999',
    range: '55 km',
    speed: '40 km/h',
    tag: 'Best Seller',
    image: '/assets/Moone-kickscooter3.webp',
    accent: '#3b82f6',
  },
  {
    id: 2,
    label: 'City Performance',
    name: 'Version City Pro',
    price: '₹59,999',
    range: '65 km',
    speed: '45 km/h',
    tag: 'New',
    image: '/assets/71+l5z4101L.jpg',
    accent: '#10b981',
  },
  {
    id: 3,
    label: 'Compact & Light',
    name: 'Version Mini',
    price: '₹39,999',
    range: '40 km',
    speed: '35 km/h',
    tag: '',
    image: versionV1,
    accent: '#f59e0b',
  },
  {
    id: 4,
    label: 'Speed Edition',
    name: 'Version Speedster',
    price: '₹64,999',
    range: '70 km',
    speed: '50 km/h',
    tag: 'Top Rated',
    image: '/assets/E-Scooter-with-Digital-Meter-with-Quick-Card-Start-Electric-Scooter-with-Dual-Shock-Absorbers-48v-18Ah-Price-in-Pakistan-1.jpg',
    accent: '#ef4444',
  },
];

/* ─── animation variants ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── component ─────────────────────────────────────────── */
const Products = () => {
  const [selectedColor, setSelectedColor] = useState(FEATURED.colors[0].id);

  return (
    <div
      className="w-full min-h-screen overflow-x-hidden"
      style={{ background: '#0c0c0c', color: '#fff', fontFamily: "'Inter', sans-serif" }}
    >

      {/* ══════════════════════════════════════════
          01  HERO — Featured product
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">

        {/* Watermark model text */}
        <div
          className="pointer-events-none select-none absolute inset-0 flex items-center overflow-hidden"
          aria-hidden
        >
          <span
            className="font-black uppercase leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(140px, 22vw, 340px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.055)',
              letterSpacing: '-0.04em',
              marginLeft: '-2%',
            }}
          >
            VERSION V0
          </span>
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <div>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="text-[10px] font-mono tracking-[0.22em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {FEATURED.category}
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="font-black leading-none"
                style={{ fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-0.03em' }}
              >
                {FEATURED.name}
              </motion.h1>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {FEATURED.description}
            </motion.p>

            {/* Rating */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2.5}
              className="flex items-center gap-2 mb-8"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    {i < Math.floor(FEATURED.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-white font-semibold text-sm">{FEATURED.rating}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                ({FEATURED.reviews} reviews)
              </span>
            </motion.div>

            {/* Price */}
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="font-black text-white mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              {FEATURED.price}
            </motion.p>

            {/* Color picker */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3.5}
              className="mb-10"
            >
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Color — {FEATURED.colors.find(c => c.id === selectedColor)?.label}
              </p>
              <div className="flex items-center gap-3">
                {FEATURED.colors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className="w-7 h-7 rounded-full border-2 transition-all duration-200"
                    style={{
                      background: c.hex,
                      borderColor: selectedColor === c.id ? '#fff' : 'rgba(255,255,255,0.15)',
                      transform: selectedColor === c.id ? 'scale(1.25)' : 'scale(1)',
                      boxShadow: selectedColor === c.id ? `0 0 0 3px rgba(255,255,255,0.1)` : 'none',
                    }}
                    aria-label={c.label}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors"
                style={{ background: '#fff', color: '#0c0c0c' }}
              >
                Add to Cart →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#fff', background: 'transparent' }}
              >
                Buy Now
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — product image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <img
              src={FEATURED.image}
              alt={FEATURED.name}
              className="w-full max-w-[420px] lg:max-w-[560px] object-contain"
              style={{ filter: 'drop-shadow(0 40px 100px rgba(0,0,0,0.9))' }}
            />
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ══════════════════════════════════════════
          02  WHY CHOOSE — spec grid
      ══════════════════════════════════════════ */}
      <section className="px-8 md:px-16 py-28" style={{ background: '#0c0c0c' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left heading */}
          <div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="text-[10px] font-mono tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Why Choose Version V0
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase text-white leading-tight"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.025em' }}
              >
                It's engineered
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase text-white leading-tight"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.025em' }}
              >
                with top-tier specs
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-tight"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.025em', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
              >
                for your journey.
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Every component of the Version V0 was chosen for a single reason — to make your daily commute smarter, faster, and more sustainable without compromise.
            </motion.p>
          </div>

          {/* Right — spec table */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {SPECS.map(([left, right], i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b py-4 group hover:bg-white/[0.02] transition-colors px-1"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{left}</p>
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{right}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03  PERFORMANCE BANNER
      ══════════════════════════════════════════ */}
      <section
        className="relative px-8 md:px-16 py-16 md:py-32 overflow-hidden border-t"
        style={{ background: '#111', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {/* Ambient glow left */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

        {/* Right scooter image */}
        <motion.img
          src={versionV1}
          alt="Version V1"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute right-0 bottom-0 h-full object-contain pointer-events-none"
          style={{ maxWidth: '45%', filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.8)) saturate(0.9)' }}
        />

        <div className="relative z-10 max-w-5xl pr-0 sm:pr-[40%]">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-[10px] font-mono tracking-[0.22em] uppercase mb-8"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Performance & Range
          </motion.p>

          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-white uppercase leading-[0.9]"
              style={{ fontSize: 'clamp(52px, 8vw, 128px)', letterSpacing: '-0.03em' }}
            >
              Performance
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.9]"
              style={{ fontSize: 'clamp(52px, 8vw, 128px)', letterSpacing: '-0.03em', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}
            >
              That Lasts.
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="text-sm leading-relaxed mb-8 max-w-xs"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Version V0 is designed to stay competitive over time — fast motor response, stable app connectivity, and a range built for real daily commutes.
          </motion.p>

          <motion.button
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-sm font-semibold border-b pb-1 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)' }}
          >
            See Performance →
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04  MODEL LINEUP — "Our Top Picks"
      ══════════════════════════════════════════ */}
      <section
        className="px-8 md:px-16 py-28 border-t"
        style={{ background: '#0c0c0c', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                className="text-[10px] font-mono tracking-[0.22em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Our Top Picks
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black text-white uppercase leading-tight"
                  style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.025em' }}
                >
                  Precision Engineering
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black uppercase leading-tight"
                  style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.025em', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
                >
                  For Peak Performance
                </motion.h2>
              </div>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-xs leading-relaxed max-w-xs text-right"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Every Version model is tuned for a specific rider profile. Find yours.
            </motion.p>
          </div>

          {/* Model cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODELS.map((model, i) => (
              <motion.div
                key={model.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.3}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                style={{
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Tag */}
                {model.tag && (
                  <span
                    className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: model.accent, color: '#fff' }}
                  >
                    {model.tag}
                  </span>
                )}

                {/* Image area */}
                <div
                  className="relative flex items-center justify-center h-52 overflow-hidden"
                  style={{ background: '#1a1a1a' }}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="h-40 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))' }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${model.accent}22 0%, transparent 70%)` }}
                  />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <p className="text-[10px] font-mono tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {model.label}
                  </p>
                  <h3 className="font-black text-white text-lg leading-tight" style={{ letterSpacing: '-0.02em' }}>
                    {model.name}
                  </h3>

                  {/* Mini stat pills */}
                  <div className="flex gap-2">
                    <span
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      ⚡ {model.speed}
                    </span>
                    <span
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      🔋 {model.range}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="font-black text-white text-base">{model.price}</p>
                    <motion.button
                      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                      className="text-[11px] font-semibold px-4 py-2 rounded-lg transition-colors"
                      style={{ background: model.accent, color: '#fff' }}
                    >
                      Buy Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          05  BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section
        className="relative px-8 md:px-16 py-28 overflow-hidden border-t"
        style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-[10px] font-mono tracking-[0.22em] uppercase mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
              Limited Stock Available
            </p>
            <h2
              className="font-black uppercase text-black leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em' }}
            >
              Beyond Roads.
            </h2>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em', color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.25)' }}
            >
              It's a Lifestyle.
            </h2>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end">
            <p className="text-sm max-w-xs md:text-right leading-relaxed" style={{ color: 'rgba(0,0,0,0.45)' }}>
              The tactile thrill of instant torque. The freedom of 60 km on a single charge. The precision of a machine that knows your ride.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-black text-white font-black uppercase px-10 py-5 rounded-full text-sm tracking-widest hover:bg-[#111] transition-colors"
            >
              Get Yours Today →
            </motion.a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
