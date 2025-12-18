import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./standard.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner";
import StoreProvider from "../redux/StoreProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StoreProvider>
        <App />
        <Toaster />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>
);
