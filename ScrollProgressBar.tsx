import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar
 * A thin, color-changing progress bar at the very top of the screen
 * that tracks the user's scroll position, styled with a coffee-inspired gradient.
 * 
 * Features:
 * - Fixed at top-0 z-50 above all content and navbars.
 * - Dynamic color-changing stops reflecting the roasting journey from golden crema & parchment
 *   to medium amber roast, rich Ethiopian Buna, and deep espresso.
 * - Gentle ambient gradient animation for an organic, color-shifting coffee glow.
 * - Sleek leading-edge amber droplet with glow.
 */
export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          if (scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate dynamic hue shifts based on progress
  // At top (0%): light golden honey / crema
  // At mid (50%): rich caramel / cinnamon roast
  // At bottom (100%): intense dark espresso roast
  const getCoffeeGlowColor = () => {
    if (scrollProgress < 25) return 'rgba(245, 158, 11, 0.6)'; // amber-500
    if (scrollProgress < 60) return 'rgba(217, 119, 6, 0.6)';  // amber-600
    if (scrollProgress < 85) return 'rgba(180, 83, 9, 0.7)';   // amber-700
    return 'rgba(120, 53, 15, 0.8)';                           // amber-900 / espresso
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-stone-900/10 backdrop-blur-[1px]"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out relative animate-coffee-gradient rounded-r-full"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, 
            #fef3c7 0%, 
            #fbbf24 15%, 
            #f59e0b 30%, 
            #d97706 45%, 
            #b45309 60%, 
            #78350f 80%, 
            #451a03 92%, 
            #2a170c 100%
          )`,
          boxShadow: `0 0 10px ${getCoffeeGlowColor()}, 0 1px 3px rgba(42, 23, 12, 0.4)`,
        }}
      >
        {/* Leading edge glow tip with coffee crema bead */}
        {scrollProgress > 0 && scrollProgress < 99.8 && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 ring-2 ring-amber-500/50 shadow-[0_0_8px_#f59e0b,0_0_12px_#d97706] transition-transform duration-150"
            style={{
              backgroundColor: scrollProgress < 40 ? '#fde68a' : scrollProgress < 75 ? '#f59e0b' : '#d97706',
            }}
          />
        )}
      </div>
    </div>
  );
};
