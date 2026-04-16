import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./lib/auth-store";
import Index from "./pages/Index.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user, isLoading, login, register, logout, isAuthenticated } =
    useAuth();
  const [authPage, setAuthPage] = useState<"login" | "register">("login");

  if (!isAuthenticated) {
    if (authPage === "register") {
      return (
        <RegisterPage
          onRegister={register}
          onSwitchToLogin={() => setAuthPage("login")}
          isLoading={isLoading}
        />
      );
    }
    return (
      <LoginPage
        onLogin={login}
        onSwitchToRegister={() => setAuthPage("register")}
        isLoading={isLoading}
      />
    );
  }

  return <Index user={user!} onLogout={logout} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthenticatedApp />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
