
"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    toggleTheme(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
    >
      {!mounted ? (
        <span className="w-4 h-4" />
      ) : theme === "dark" ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}




// "use client";

// import { Sun, Moon } from "lucide-react";
// import { useTheme } from "@/components/providers/ThemeProvider";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       aria-label="Toggle theme"
//       className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
//     >
//       {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
//     </button>
//   );
// }