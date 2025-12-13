import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGSAP";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      const hasTouchScreen = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;
      const hasFineMouse = window.matchMedia('(pointer: fine)').matches;
      
      // Only show cursor on devices with fine pointer (mouse)
      setIsTouchDevice(!hasFineMouse || hasTouchScreen);
    };

    checkTouchDevice();
    
    // Re-check on resize (for devices that can switch modes)
    window.addEventListener('resize', checkTouchDevice);
    
    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;

    // Set initial position off-screen
    gsap.set([cursor, cursorOuter], { xPercent: -50, yPercent: -50 });

    // Mouse position tracking with GSAP for smooth animation
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    const xOuterTo = gsap.quickTo(cursorOuter, "x", { duration: 0.3, ease: "power2.out" });
    const yOuterTo = gsap.quickTo(cursorOuter, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      xTo(e.clientX);
      yTo(e.clientY);
      xOuterTo(e.clientX);
      yOuterTo(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Interactive elements handling
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";

      if (isInteractive) {
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(cursorOuter, {
          scale: 1.5,
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(cursorOuter, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease"
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>

      {/* Outer ring */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          opacity: isVisible ? 0.6 : 0,
          transition: "opacity 0.3s ease"
        }}
      >
        <div className="w-8 h-8 border border-foreground/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  );
};

export default CustomCursor;
