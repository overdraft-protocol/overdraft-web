import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { redirectToDevHost } from "./config";
import "./index.css";
import App from "./App.tsx";

redirectToDevHost();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
