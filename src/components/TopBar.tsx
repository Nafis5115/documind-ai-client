import { Search, Menu, PanelRight } from "lucide-react";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopBar = ({ sidebarOpen, setSidebarOpen }: TopBarProps) => {
  return (
    <header className="h-14 flex items-center gap-3 px-4 glass-subtle rounded-2xl">
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </header>
  );
};

export default TopBar;
