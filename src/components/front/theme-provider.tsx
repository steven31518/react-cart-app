import { createContext, useContext, useEffect, useState } from "react";

type theme = "dark" | "light" | "system" | "cyberpunk";

type ThemeProviderProps = {
  children: React.ReactNode;
  defualtTheme?: theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: theme;
  setTheme: (theme: theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export default function ThemeProvider({
  children,
  defualtTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<theme>(
    () => (localStorage.getItem(storageKey) as theme) || defualtTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "cyberpunk");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
