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

      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search documents, chats..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(230,90%,62%,0.15)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground glow-blue cursor-pointer hover:scale-105 transition-transform">
          JD
        </div>
      </div>
    </header>
  );
};

export default TopBar;
