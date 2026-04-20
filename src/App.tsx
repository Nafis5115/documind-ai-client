import { TooltipProvider } from "./components/ui/tooltip";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => (
  <TooltipProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          color: "white",
          backgroundColor: "black",
        },
      }}
    />
    {children}
  </TooltipProvider>
);

export default App;
