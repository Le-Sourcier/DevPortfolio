// context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: (e?: React.MouseEvent) => void;
  isTransitioning: boolean;
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
  isTransitioning: false,
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

// Store click position globally for animation origin
let clickX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
let clickY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate resolved theme based on system preference
  const getResolvedTheme = useCallback((t: Theme): "dark" | "light" => {
    if (t === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  }, []);

  // Circle reveal animation
  const performTransition = useCallback((newResolved: "dark" | "light") => {
    const root = document.documentElement;
    const oldResolved = root.classList.contains('dark') ? 'dark' : 'light';

    // If same theme, just apply without animation
    if (newResolved === oldResolved) {
      setResolvedTheme(newResolved);
      return;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove("light", "dark");
      root.classList.add(newResolved);
      setResolvedTheme(newResolved);
      return;
    }

    setIsTransitioning(true);

    // Calculate the radius needed to cover entire screen
    const x = clickX;
    const y = clickY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isDarkening = newResolved === 'dark';

    // Try View Transitions API first (Chrome 111+)
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        root.classList.remove("light", "dark");
        root.classList.add(newResolved);
        setResolvedTheme(newResolved);
      });

      transition.ready.then(() => {
        // Dark → Light: cercle clair s'étend depuis le bouton (::view-transition-new expands)
        // Light → Dark: cercle clair se rétracte vers le bouton (::view-transition-old shrinks)
        document.documentElement.animate(
          {
            clipPath: isDarkening
              ? [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]
              : [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: isDarkening ? '::view-transition-old(root)' : '::view-transition-new(root)',
          }
        );
      });

      transition.finished.finally(() => {
        setIsTransitioning(false);
      });

      return;
    }

    // Fallback animation for browsers without View Transitions API
    if (isDarkening) {
      // Light → Dark: On montre d'abord le light qui se rétracte vers le bouton
      // Créer overlay LIGHT par-dessus, appliquer dark, puis rétracter le light
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        pointer-events: none;
        background-color: #ffffff;
        clip-path: circle(${endRadius}px at ${x}px ${y}px);
      `;
      document.body.appendChild(overlay);

      // Appliquer le thème dark immédiatement (caché sous l'overlay)
      root.classList.remove("light", "dark");
      root.classList.add(newResolved);
      setResolvedTheme(newResolved);

      // Animer l'overlay light qui se rétracte
      const animation = overlay.animate(
        [
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
          { clipPath: `circle(0px at ${x}px ${y}px)` }
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        }
      );

      animation.onfinish = () => {
        overlay.remove();
        setIsTransitioning(false);
      };
    } else {
      // Dark → Light: Le cercle light s'étend depuis le bouton
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        pointer-events: none;
        background-color: #ffffff;
        clip-path: circle(0px at ${x}px ${y}px);
      `;
      document.body.appendChild(overlay);

      // Animer l'overlay light qui s'étend
      const animation = overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` }
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        }
      );

      // Appliquer le thème à mi-parcours
      setTimeout(() => {
        root.classList.remove("light", "dark");
        root.classList.add(newResolved);
        setResolvedTheme(newResolved);
      }, 250);

      animation.onfinish = () => {
        overlay.remove();
        setIsTransitioning(false);
      };
    }

  }, []);

  // Initial theme application (no animation)
  useEffect(() => {
    const resolved = getResolvedTheme(theme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    setResolvedTheme(resolved);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        // Use center of screen for system-triggered changes
        clickX = window.innerWidth / 2;
        clickY = window.innerHeight / 2;
        performTransition(getResolvedTheme("system"));
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, getResolvedTheme, performTransition]);

  // Set theme
  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    performTransition(getResolvedTheme(newTheme));
  }, [storageKey, getResolvedTheme, performTransition]);

  // Toggle theme: light → dark → system → light
  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    // Capture click position for animation origin
    if (e) {
      clickX = e.clientX;
      clickY = e.clientY;
    } else {
      clickX = window.innerWidth / 2;
      clickY = window.innerHeight / 2;
    }

    let newTheme: Theme;
    if (theme === "light") {
      newTheme = "dark";
    } else if (theme === "dark") {
      newTheme = "system";
    } else {
      newTheme = "light";
    }

    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    performTransition(getResolvedTheme(newTheme));
  }, [theme, storageKey, getResolvedTheme, performTransition]);

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      isTransitioning,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
