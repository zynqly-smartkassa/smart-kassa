import { useContext } from "react";
import { ThemeProviderContext } from "../../components/providers/theme-provider";

/**
 * A Hook used to switch between Themes (Dark and Light Mode)
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
