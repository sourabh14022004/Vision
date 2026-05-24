import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div
        className="flex items-center justify-between px-5 py-3 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-semibold text-base tracking-tight select-none"
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            ✦
          </span>
          <span className="text-gray-200 font-medium">Vision</span>
        </Link>

        {/* Center Nav Pill */}
        <nav
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/products', label: 'Products' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2a2a2a] text-white shadow-sm border border-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          to="/products"
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-white px-5 py-2 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          Get Yours
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/products', label: 'Products' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-5 py-3 text-sm font-medium border-b border-white/5 transition-colors ${
                  isActive ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="p-3">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-sm font-medium text-white px-5 py-2.5 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Get Yours
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
