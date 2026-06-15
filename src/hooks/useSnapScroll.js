import { useEffect } from 'react';

/**
 * useSnapScroll
 *
 * Attaches a debounced scroll listener that snaps to the nearest section
 * boundary whenever the user stops scrolling mid-section.
 *
 * Rules:
 *  - If a tracked section is > (1 - threshold) scrolled past → snap to its END
 *    (i.e. jump to the top of the next section).
 *  - If a tracked section is < threshold scrolled past → snap BACK to its START.
 *  - Otherwise (between the two zones) → leave the scroll position alone.
 *
 * @param {string}  selector   CSS selector that matches snap-section elements.
 * @param {number}  threshold  Fraction (0–1) defining the snap zones. Default 0.15.
 * @param {number}  debounceMs How long after the last scroll event to trigger the snap check.
 */
export function useSnapScroll(selector = '[data-snap]', threshold = 0.15, debounceMs = 250) {
    useEffect(() => {
        let isSnapping = false;
        let timer = null;

        function onScroll() {
            if (isSnapping) return;
            clearTimeout(timer);

            timer = setTimeout(() => {
                const sections = document.querySelectorAll(selector);

                for (const el of sections) {
                    const rect = el.getBoundingClientRect();
                    const h = el.offsetHeight;

                    // progress = fraction of section scrolled above the viewport top.
                    // 0  → section top is flush with the viewport top (just entered).
                    // 1  → section bottom is flush with the viewport top (just left).
                    const progress = -rect.top / h;

                    // Only act if we're partially inside this section.
                    if (progress > 0 && progress < 1) {
                        if (progress > 1 - threshold) {
                            // 85 %+ scrolled past → snap forward to next section.
                            isSnapping = true;
                            window.scrollTo({
                                top: window.scrollY + rect.bottom,
                                behavior: 'smooth',
                            });
                        } else if (progress < threshold) {
                            // < 15 % scrolled past → snap back to the section's own start.
                            isSnapping = true;
                            window.scrollTo({
                                top: window.scrollY + rect.top,
                                behavior: 'smooth',
                            });
                        }
                        // Found the active section; no need to check further.
                        break;
                    }
                }

                // Allow new snaps after the smooth-scroll animation settles (~900 ms).
                if (isSnapping) {
                    setTimeout(() => {
                        isSnapping = false;
                    }, 900);
                }
            }, debounceMs);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timer);
        };
    }, [selector, threshold, debounceMs]);
}
