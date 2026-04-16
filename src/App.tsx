import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./lib/auth-store";
import AppRouter from "./routes/router";
import { ReactNode } from "react";

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => (
  <TooltipProvider>{children}</TooltipProvider>
);

export default App;
