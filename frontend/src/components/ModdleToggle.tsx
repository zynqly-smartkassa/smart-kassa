import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";

type Theme = "light" | "dark" | "system";

/**
 * A Theme Switcher
 * @returns A Button with a Dropdown Menu to toggle between Themes
 */
export function ModeToggle() {
  const { setTheme } = useTheme();
  const [buttonSelected, setButtonSelected] = useState("");

  const handleSetTheme = (theme: Theme) => {
    setTheme(theme);
    setButtonSelected(theme.toString());
    StatusBar.setStyle({ style: theme === "dark" ? Style.Light : Style.Dark });
    StatusBar.setBackgroundColor({
      color: theme === "dark" ? "#000000" : "FFFFFF",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={`hover:cursor-pointer ${
            buttonSelected === "light" && "bg-zinc-100 dark:bg-zinc-800"
          }`}
          onClick={() => handleSetTheme("light")}
        >
          Hell
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`hover:cursor-pointer ${
            buttonSelected === "dark" && "bg-zinc-100 dark:bg-zinc-800"
          }`}
          onClick={() => handleSetTheme("dark")}
        >
          Dunkel
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`hover:cursor-pointer ${
            buttonSelected === "system" && "bg-zinc-100 dark:bg-zinc-800"
          }`}
          onClick={() => handleSetTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
