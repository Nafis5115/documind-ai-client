import { TooltipProvider } from "./components/ui/tooltip";
import { ReactNode } from "react";

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => (
  <TooltipProvider>{children}</TooltipProvider>
);

export default App;
