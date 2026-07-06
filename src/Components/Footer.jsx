import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";
import { cn } from "../lib/utils";

// ── TextHoverEffect ───────────────────────────────────────────────────────────
export const TextHoverEffect = ({ text, duration, className }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

// ── FooterBackgroundGradient ──────────────────────────────────────────────────
export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};

// ── Footer data ───────────────────────────────────────────────────────────────
const footerLinks = [
  {
    title: "About Us",
    links: [
      { label: "Company History", href: "/about" },
      { label: "Meet the Team", href: "/about" },
      { label: "Employee Handbook", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Support", href: "/contact" },
      { label: "Live Chat", href: "#", pulse: true },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-[#3ca2fa]" />,
    text: "hello@Vishionev.com",
    href: "mailto:hello@Vishionev.com",
  },
  {
    icon: <Phone size={18} className="text-[#3ca2fa]" />,
    text: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: <MapPin size={18} className="text-[#3ca2fa]" />,
    text: "Bengaluru, India",
  },
];

const socialLinks = [
  { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
  { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
  { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
  { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
  { icon: <Globe size={20} />, label: "Website", href: "#" },
];

// ── Main Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0F0F11] relative h-fit overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 py-8 md:px-10 md:py-12 z-40 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-14 pb-8 md:pb-10">

          {/* Brand section — full width on mobile */}
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-2xl md:text-3xl font-extrabold">&hearts;</span>
              <span className="text-white text-2xl md:text-3xl font-bold">Vishion</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-400 max-w-[300px]">
              Vishion is a next-generation electric scooter brand. Clean, fast, and smart — built for the streets.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm md:text-base font-semibold mb-3 md:mb-5">
                {section.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#3ca2fa] transition-colors text-xs md:text-sm"
                    >
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-sm md:text-base font-semibold mb-3 md:mb-5">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-[#3ca2fa] transition-colors text-xs md:text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 hover:text-[#3ca2fa] transition-colors text-xs md:text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700/50 my-5 md:my-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm space-y-3 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-5 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-500">
            &copy; {new Date().getFullYear()} Vishion. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect — compact, desktop only */}
      <div className="lg:flex hidden h-[20rem] -mt-32 -mb-20">
        <TextHoverEffect text="Vishion" className="z-50"/>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;
