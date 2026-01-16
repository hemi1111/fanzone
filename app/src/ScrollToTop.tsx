import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, state } = location as any;

  useEffect(() => {
    // Force scroll to top on all navigation, including back/forward
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If a scroll target was provided via navigation state, scroll to it smoothly
    if (state && state.scrollTo) {
      const el = document.getElementById(state.scrollTo);
      if (el) {
        // Delay slightly to ensure layout is ready
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
