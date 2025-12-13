import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Use useLayoutEffect on client, useEffect on server (SSR safety)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom hook for GSAP animations with proper cleanup
 * @param callback - Animation function that receives gsap context
 * @param deps - Dependency array for re-running animations
 */
export function useGSAP(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context>();

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(callback);

    return () => {
      ctx.current?.revert();
    };
  }, deps);

  return ctx;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger(
  trigger: React.RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
) {
  useIsomorphicLayoutEffect(() => {
    if (!trigger.current) return;

    const tween = gsap.from(trigger.current, {
      ...animation,
      scrollTrigger: {
        trigger: trigger.current,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        ...scrollTriggerVars,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [trigger]);
}

/**
 * Utility for staggered text reveal animation
 */
export function splitTextAnimation(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.8, stagger = 0.02, delay = 0, ease = 'power3.out' } = options;
  
  const text = element.textContent || '';
  element.innerHTML = '';
  
  // Create spans for each character
  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Utility for line-by-line text reveal
 */
export function splitLinesAnimation(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.6, stagger = 0.1, delay = 0, ease = 'power2.out' } = options;
  
  // Wrap each line in a container for clipping
  const lines = element.innerHTML.split('<br>');
  element.innerHTML = lines
    .map(
      (line) =>
        `<div class="line-wrapper" style="overflow:hidden;"><div class="line-content" style="transform:translateY(100%);opacity:0;">${line}</div></div>`
    )
    .join('');

  const lineContents = element.querySelectorAll('.line-content');

  return gsap.to(lineContents, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Check for reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Default GSAP settings for consistent animations
 */
export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
};

export { gsap, ScrollTrigger };

