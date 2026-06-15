import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * ───────────
 * 1. Caches and restores scroll position for each page pathname.
 * 2. Works for both link clicks (PUSH) and back/forward browser buttons (POP).
 * 3. Smooth-scrolls to top when clicking a link to the current page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Cache to store scroll positions keyed by pathname
  const scrollPositions = useRef({});

  // 1. Set browser scroll restoration to manual to handle it ourselves
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 2. Cache scroll positions on user scroll events (throttled with RAF)
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        scrollPositions.current[pathname] = window.scrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  // 3. Handle scroll restoration on pathname change (restores cached position or defaults to 0)
  useEffect(() => {
    // Retrieve the cached scroll position for the pathname
    const savedPosition = scrollPositions.current[pathname] || 0;
    let isUserScrolling = false;

    // Stop our automated restoration attempts if the user interacts/scrolls manually
    const stopRestoration = () => {
      isUserScrolling = true;
    };

    window.addEventListener('wheel', stopRestoration, { passive: true });
    window.addEventListener('touchmove', stopRestoration, { passive: true });
    window.addEventListener('keydown', stopRestoration, { passive: true });

    // Scroll to the saved position
    const attemptRestore = () => {
      if (isUserScrolling) return;
      window.scrollTo(0, savedPosition);
    };

    attemptRestore(); // Attempt immediately

    // Execute at multiple intervals to account for lazy-loaded assets or component entry animations
    const timeouts = [20, 50, 100, 250, 500, 800].map((delay) =>
      setTimeout(attemptRestore, delay)
    );

    return () => {
      window.removeEventListener('wheel', stopRestoration);
      window.removeEventListener('touchmove', stopRestoration);
      window.removeEventListener('keydown', stopRestoration);
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  // 4. Listen to clicks on links pointing to the current page, and scroll to top smoothly
  useEffect(() => {
    const handleGlobalClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) return;

      try {
        const url = new URL(anchor.href, window.location.origin);
        const currentUrl = new URL(window.location.href);

        if (
          url.origin === currentUrl.origin &&
          url.pathname === currentUrl.pathname &&
          !url.hash // Do not intercept hash anchors
        ) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        // Safe check for invalid URLs
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
