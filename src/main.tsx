import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./context/global";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AppRouter />
        <Toaster />
      </GlobalProvider>
    </QueryClientProvider>
  </StrictMode>,
);
