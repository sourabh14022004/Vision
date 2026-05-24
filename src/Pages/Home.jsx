import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import scooterImg from '../assets/versionVo.png';
import scooterImg2 from '../assets/versionV1.png';
import ScooterModel from "../Components/Spline3dModel.jsx"
import {
    BatteryCharging,
    Gauge,
    ActivitySquare,
    MonitorSmartphone,
    Repeat,
    Lightbulb,
    KeyRound
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import ProductReview from '../Components/ProductReview';
import VaporizeTextCycle from '../Components/ui/VapourTextEffect';

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

// ─── Scroll-driven text paragraphs ───────────────────────────────────────────
const SCROLL_TEXTS = [
    {
        tag: '01 — DESIGN',
        heading: 'Born for the Streets',
        body: 'Version Vo is sculpted with aerospace-grade aluminium and a minimalist silhouette that turns heads on every block. Every curve is intentional, every edge purposeful.',
    },
    {
        tag: '02 — PERFORMANCE',
        heading: 'Pure Electric Power',
        body: 'A 500W brushless motor delivers instant torque — reaching 45 km/h in silence. Three riding modes (Eco, Cruise, Sport) let you tune every journey to your pace.',
    },
    {
        tag: '03 — RANGE',
        heading: '60 km on a Single Charge',
        body: 'Our high-density lithium cell pack carries you further than a full tank of petrol would take most commuters. Fast-charge from 0 to 80% in under 2 hours.',
    },
    {
        tag: '04 — INTELLIGENCE',
        heading: 'Smart by Default',
        body: 'Keyless Bluetooth unlock, OTA firmware updates, real-time trip analytics and seamless app integration — Version Vo thinks so you don\'t have to.',
    },
];

// Divides the hero scroll range [0, 1] into equal slots per paragraph
const SLOT = 1 / SCROLL_TEXTS.length; // 0.25 each

// ── Typewriter hook ────────────────────────────────────────────────────────────
// Plays through `text` character by character.
// `delay` = ms per character, `startDelay` = ms pause before starting
function useTypewriter(text, { delay = 28, startDelay = 0 } = {}) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        let timeout;

        const start = () => {
            const tick = () => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i < text.length) {
                    timeout = setTimeout(tick, delay);
                } else {
                    setDone(true);
                }
            };
            timeout = setTimeout(tick, delay);
        };

        const startTimeout = setTimeout(start, startDelay);
        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [text, delay, startDelay]);

    return { displayed, done };
}

// Blinking cursor element
function Cursor({ visible }) {
    return (
        <motion.span
            animate={{ opacity: visible ? [1, 0] : 0 }}
            transition={visible ? { repeat: Infinity, duration: 0.6, ease: 'linear' } : {}}
            className="inline-block w-[2px] h-[1em] bg-blue-400 ml-[2px] align-middle"
        />
    );
}

function ScrollText() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const hero = document.getElementById('hero-scroll-wrapper');
        if (!hero) return;

        const onScroll = () => {
            const rect = hero.getBoundingClientRect();
            const scrolled = -rect.top;
            const total = rect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrolled / total));

            setVisible(progress < 0.999);

            const idx = Math.min(
                SCROLL_TEXTS.length - 1,
                Math.floor(progress / SLOT)
            );
            setActiveIdx(idx);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    const item = SCROLL_TEXTS[activeIdx];

    return (
        <div
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
            style={{ maxWidth: '360px' }}
        >
            <TypewriterCard item={item} activeIdx={activeIdx} />
        </div>
    );
}

// Separated so hooks always run in the same order per card
function TypewriterCard({ item, activeIdx }) {
    const tag  = useTypewriter(item.tag,  { delay: 38, startDelay: 60 });
    const body = useTypewriter(item.body, { delay: 16, startDelay: 60 + item.tag.length * 38 + 280 });

    return (
        <>
            {/* Tag — small blue mono label */}
            <p
                style={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(96,165,250,0.9)',
                    marginBottom: '18px',
                    minHeight: '1em',
                    fontWeight: 500,
                }}
            >
                {tag.displayed}
                <Cursor visible={!tag.done} />
            </p>

            {/* Heading — vapour canvas animation, delayed so tag types first */}
            <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.45, ease: 'easeOut' }}
                style={{ height: '5.5rem', pointerEvents: 'none', marginBottom: '20px' }}
            >
                <VaporizeTextCycle
                    texts={SCROLL_TEXTS.map(t => t.heading)}
                    externalTextIndex={activeIdx}
                    font={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '32px',
                        fontWeight: 700,
                    }}
                    color="rgb(255, 255, 255)"
                    spread={4}
                    density={6}
                    animation={{
                        vaporizeDuration: 0.75,
                        fadeInDuration: 0.55,
                        waitDuration: 0,
                    }}
                    direction="left-to-right"
                    alignment="left"
                />
            </motion.div>

            {/* Body — typewriter, delayed so heading appears first */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={activeIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.85, duration: 0.35, ease: 'easeOut' }}
                    style={{
                        fontSize: '0.9rem',
                        color: 'rgba(209,213,219,0.85)',
                        lineHeight: '1.8',
                        minHeight: '4.5rem',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                    }}
                >
                    {body.displayed}
                    {!body.done && <Cursor visible={true} />}
                </motion.p>
            </AnimatePresence>

            {/* Progress — simple dashes like screenshot */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px', alignItems: 'center' }}>
                {SCROLL_TEXTS.map((_, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'block',
                            height: '3px',
                            width: i === activeIdx ? '36px' : '16px',
                            borderRadius: '99px',
                            background: i === activeIdx
                                ? 'rgba(96,165,250,1)'
                                : 'rgba(255,255,255,0.2)',
                            transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s ease',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

const Hero = () => {
    const featuresRef = useRef(null);
    const videoRef    = useRef(null);

    // Refs for the four feature badges
    const feat1Ref = useRef(null);
    const feat2Ref = useRef(null);
    const feat3Ref = useRef(null);
    const feat4Ref = useRef(null);

    useEffect(() => {
        const section = featuresRef.current;
        if (!section) return;

        // ── Video scrubbing via ScrollTrigger ─────────────────────────────
        let videoST;
        const initVideoScrub = () => {
            const vid = videoRef.current;
            if (!vid || !Number.isFinite(vid.duration)) return;

            const proxy = { time: 0 };
            videoST = ScrollTrigger.create({
                trigger:  section,
                start:    'top top',
                end:      'bottom bottom',
                scrub:    1.2,            // smooth lag in seconds
                onUpdate: (self) => {
                    const target = self.progress * vid.duration;
                    // Lerp for extra smoothness
                    proxy.time += (target - proxy.time) * 0.15;
                    if (Math.abs(vid.currentTime - proxy.time) > 0.01) {
                        vid.currentTime = proxy.time;
                    }
                },
            });
        };

        const vid = videoRef.current;
        if (vid) {
            if (vid.readyState >= 1) {
                initVideoScrub();
            } else {
                vid.addEventListener('loadedmetadata', initVideoScrub, { once: true });
            }
        }

        // ── Feature badge animations ──────────────────────────────────────
        const badges = [
            { ref: feat1Ref, start: '10%', fromX: -30 },
            { ref: feat2Ref, start: '30%', fromX: -30 },
            { ref: feat3Ref, start: '50%', fromX:  30 },
            { ref: feat4Ref, start: '70%', fromX:  30 },
        ];

        const sts = badges.map(({ ref, start, fromX }) => {
            if (!ref.current) return null;
            gsap.set(ref.current, { opacity: 0, x: fromX });
            return ScrollTrigger.create({
                trigger:  section,
                start:    `top+=${parseFloat(start) / 100 * (section.scrollHeight - window.innerHeight)}px top`,
                end:      `top+=${(parseFloat(start) / 100 + 0.18) * (section.scrollHeight - window.innerHeight)}px top`,
                scrub:    false,
                onEnter:  () => gsap.to(ref.current, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }),
                onLeaveBack: () => gsap.to(ref.current, { opacity: 0, x: fromX, duration: 0.4, ease: 'power2.in' }),
            });
        });

        return () => {
            videoST?.kill();
            sts.forEach(st => st?.kill());
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className=" flex flex-col">
            {/* Hero Section */}
            {/* Hero Section Container for Scroll Action */}
            <div id="hero-scroll-wrapper" className="relative h-[250vh]">
                <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">
                    
                    {/* Spline Model Background */}
                    <div className='absolute inset-0 w-full h-screen -z-10 opacity-90'>
                        <ScooterModel/>
                    </div>

                    {/* Scroll-Driven Left Text Panel */}
                    <ScrollText />

                </div>
            </div>

            {/* Features Section - Dark Theme Redesign with Scroll Animation */}
            <section ref={featuresRef} className="bg-[#1a1a1a] relative h-[250vh]">
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 pt-10">
                    <div className="max-w-7xl w-full mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10 relative z-20">
                            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">
                                ONLINE STORE <br />
                                <strong className="font-bold">SCOOTERS</strong>
                            </h2>
                        </div>

                        {/* Central Interactive Area */}
                        <div className="relative border border-white/10 rounded-3xl bg-[#222222]/80 backdrop-blur-md p-6 md:p-10 min-h-[500px] flex items-center justify-center">
                            
                            {/* Central Scooter Video */}
                            <div className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg flex justify-center">
                                <video
                                    ref={videoRef}
                                    src="Assets/Video_Generation_From_Request.mp4"
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-auto object-contain scale-125 md:scale-150"
                                />
                            </div>

                            {/* Feature Points — animated by GSAP ScrollTrigger */}
                            {/* 1. Top Left — Speed */}
                            <div
                                ref={feat1Ref}
                                className="absolute top-[15%] left-[5%] md:left-[10%] text-white flex items-center gap-4 cursor-pointer group z-20"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="font-bold text-lg">45 km/h</p>
                                    <p className="text-xs text-gray-400">Top Speed</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                    <Gauge className="w-5 h-5" />
                                </div>
                                <div className="hidden lg:block absolute left-full top-1/2 w-16 h-px bg-gradient-to-r from-white/30 to-transparent -translate-y-1/2" />
                            </div>

                            {/* 2. Bottom Left — Range */}
                            <div
                                ref={feat2Ref}
                                className="absolute bottom-[20%] left-[5%] md:left-[5%] text-white flex items-center gap-4 cursor-pointer group z-20"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="font-bold text-lg">60 km</p>
                                    <p className="text-xs text-gray-400">Range per charge</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                    <Repeat className="w-5 h-5" />
                                </div>
                                <div className="hidden lg:block absolute left-full top-1/2 w-24 h-px bg-gradient-to-r from-white/30 to-transparent -translate-y-1/2 -rotate-[15deg] origin-left" />
                            </div>

                            {/* 3. Top Right — Display */}
                            <div
                                ref={feat3Ref}
                                className="absolute top-[25%] right-[5%] md:right-[10%] text-white flex items-center flex-row-reverse gap-4 cursor-pointer group z-20"
                            >
                                <div className="text-left hidden sm:block">
                                    <p className="font-bold text-lg">Smart Dash</p>
                                    <p className="text-xs text-gray-400">Digital Display</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                    <MonitorSmartphone className="w-5 h-5" />
                                </div>
                                <div className="hidden lg:block absolute right-full top-1/2 w-16 h-px bg-gradient-to-l from-white/30 to-transparent -translate-y-1/2" />
                            </div>

                            {/* 4. Bottom Right — App */}
                            <div
                                ref={feat4Ref}
                                className="absolute bottom-[25%] right-[5%] md:right-[5%] text-white flex items-center flex-row-reverse gap-4 cursor-pointer group z-20"
                            >
                                <div className="text-left hidden sm:block">
                                    <p className="font-bold text-lg">App Control</p>
                                    <p className="text-xs text-gray-400">Keyless Entry</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <div className="hidden lg:block absolute right-full top-1/2 w-24 h-px bg-gradient-to-l from-white/30 to-transparent -translate-y-1/2 rotate-[10deg] origin-right" />
                            </div>
                            
                            {/* Background subtle elements */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                               <span className="text-[120px] md:text-[200px] font-black tracking-widest text-white whitespace-nowrap">VERSION O</span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            
            {/* Promo Cards Section */}
            <section className="bg-[#1a1a1a] px-6 pb-24 relative z-30">
                <div className="max-w-7xl mx-auto">
                    {/* Bottom Promo Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Red Accent Card */}
                        <motion.div 
                            className="bg-red-600 rounded-3xl p-8 md:p-12 relative overflow-hidden flex items-center min-h-[250px] group cursor-pointer"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative z-10 w-2/3">
                                <h3 className="text-3xl font-bold text-white mb-3">Version Mini</h3>
                                <p className="text-red-100 text-sm mb-6 max-w-[250px]">Compact, lightweight, and perfect for quick city commutes.</p>
                                <button className="text-white border border-white/40 px-6 py-2 rounded text-sm font-semibold hover:bg-white hover:text-red-600 transition">
                                    GO TO CATALOG
                                </button>
                            </div>
                            <img src={scooterImg} alt="Scooter Wheel" className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 md:w-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                        </motion.div>

                        {/* Light Card */}
                        <motion.div 
                            className="bg-[#E5E5E5] rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden flex flex-col justify-center min-h-[250px] group cursor-pointer"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                           <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">Parts & Tuning</h3>
                                <p className="text-gray-600 text-sm mb-6 max-w-[280px]">Official accessories and parts to customize your Version rider experience.</p>
                                <button className="text-gray-900 border border-gray-400 px-6 py-2 rounded text-sm font-semibold hover:bg-gray-900 hover:text-white transition">
                                    GO TO CATALOG
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
            
            <ProductReview />
        </div>
    );
};

export default Hero;