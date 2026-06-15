import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/contact' || path === '/about' || path === '/products') {
      setIsLightMode(false);
      return;
    }

    if (path !== '/') {
      setIsLightMode(false);
      return;
    }

    // Cache the light-section element so we don't querySelector on every scroll
    let lightSectionRef = null;
    let lightSectionTop = null;
    let rafId = null;

    const cacheLightSection = () => {
      lightSectionRef = document.querySelector('section.bg-white');
      if (lightSectionRef) {
        lightSectionTop = lightSectionRef.getBoundingClientRect().top + window.scrollY;
      }
    };

    // Initial cache — defer slightly so the DOM is ready
    cacheLightSection();

    const handleTheme = () => {
      if (lightSectionRef && lightSectionTop !== null) {
        setIsLightMode(window.scrollY + window.innerHeight * 0.25 >= lightSectionTop);
      } else {
        setIsLightMode(false);
      }
    };

    // Throttle to one call per animation frame
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleTheme();
        rafId = null;
      });
    };

    handleTheme();

    window.addEventListener('scroll', onScroll, { passive: true });
    // Recalculate cached position on resize
    const onResize = () => {
      cacheLightSection();
      handleTheme();
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div
        className="flex items-center justify-between px-5 py-3 rounded-2xl"
        style={{
          background: isLightMode 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(245, 245, 247, 0.8) 100%)' 
            : 'linear-gradient(135deg, rgba(26, 26, 26, 0.45) 0%, rgba(17, 17, 17, 0.55) 100%)',
          border: isLightMode 
            ? '1px solid rgba(0, 0, 0, 0.08)' 
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isLightMode 
            ? '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)' 
            : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-base tracking-tight select-none"
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all"
            style={{ 
              background: isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)', 
              border: isLightMode ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.15)',
              color: isLightMode ? '#1f2937' : '#e5e7eb'
            }}
          >
            ✦
          </span>
          <span className={`font-medium transition-colors ${isLightMode ? 'text-gray-800' : 'text-gray-200'}`}>Vishion</span>
        </Link>

        {/* Center Nav Pill */}
        <nav
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl transition-all"
          style={{
            background: isLightMode ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
            border: isLightMode ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.08)',
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
                    ? isLightMode 
                      ? 'bg-white text-gray-900 shadow-sm border border-black/5 font-semibold' 
                      : 'bg-[#2a2a2a] text-white shadow-sm border border-white/10'
                    : isLightMode 
                      ? 'text-gray-500 hover:text-gray-900 hover:bg-black/5' 
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
            background: isLightMode ? '#111827' : 'rgba(255,255,255,0.07)',
            border: isLightMode ? '1px solid #111827' : '1px solid rgba(255,255,255,0.15)',
            boxShadow: isLightMode ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          Get Yours
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden transition-colors ${isLightMode ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}
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
          className="md:hidden mt-2 rounded-2xl overflow-hidden transition-all"
          style={{
            background: isLightMode 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 245, 247, 0.95) 100%)' 
              : 'linear-gradient(135deg, rgba(26, 26, 26, 0.45) 0%, rgba(17, 17, 17, 0.55) 100%)',
            border: isLightMode 
              ? '1px solid rgba(0, 0, 0, 0.08)' 
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: isLightMode 
              ? '0 8px 32px rgba(0,0,0,0.08)' 
              : '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
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
                `block px-5 py-3 text-sm font-medium border-b transition-colors ${
                  isLightMode 
                    ? `border-black/5 ${isActive ? 'text-black bg-black/5' : 'text-gray-600 hover:text-black hover:bg-black/5'}`
                    : `border-white/5 ${isActive ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
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
                background: isLightMode ? '#111827' : 'rgba(255,255,255,0.07)',
                border: isLightMode ? '1px solid #111827' : '1px solid rgba(255,255,255,0.15)',
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
