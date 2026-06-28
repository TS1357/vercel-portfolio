import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SoundProvider } from "./sound/SoundProvider.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </StrictMode>,
);
