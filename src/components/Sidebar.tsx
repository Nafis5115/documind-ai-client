import { useState, useRef } from "react";
import {
  FileText,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Plus,
  Upload,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  LogOut,
} from "lucide-react";
import type { ChatSession, Document } from "@/lib/store";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  activeChat: string;
  setActiveChat: (id: string) => void;
  chats: ChatSession[];
  documents: Document[];
  onCreateChat: () => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onUpload: (file: File) => void;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "documents", label: "Documents", icon: FileText },
  // { to: "chat", label: "Chat", icon: MessageSquare },
  { to: "settings", label: "Settings", icon: Settings },
];

const groupChatsByDate = (chats: ChatSession[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);

  const groups: { label: string; chats: ChatSession[] }[] = [
    { label: "Today", chats: [] },
    { label: "Yesterday", chats: [] },
    { label: "Older", chats: [] },
  ];

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt);
    if (chatDate >= today) groups[0].chats.push(chat);
    else if (chatDate >= yesterday) groups[1].chats.push(chat);
    else groups[2].chats.push(chat);
  });

  return groups.filter((g) => g.chats.length > 0);
};

const Sidebar = ({
  activeChat,
  setActiveChat,
  chats,
  onCreateChat,
  onDeleteChat,
  onRenameChat,
  sidebarOpen,
  setSidebarOpen,
  onUpload,
}: SidebarProps) => {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [editingChat, setEditingChat] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chatGroups = groupChatsByDate(chats);

  const startRename = (chat: ChatSession) => {
    setEditingChat(chat.id);
    setEditTitle(chat.title);
  };

  const confirmRename = () => {
    if (editingChat && editTitle.trim()) {
      onRenameChat(editingChat, editTitle.trim());
    }
    setEditingChat(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:relative z-50 h-full w-72 flex-shrink-0 transition-transform duration-300 ease-out
        glass-strong rounded-none md:rounded-2xl overflow-hidden flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-[110%] md:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg-primary flex items-center justify-center glow-blue">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold gradient-text">DocuMind AI</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              onClick={() => setSidebarOpen(false)}
              to={item.to}
              key={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 
     ${
       isActive
         ? "gradient-bg-primary text-primary-foreground glow-blue"
         : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
     }`
              }
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Upload button */}
        <div className="px-3 mt-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt,.png,.jpg,.jpeg,.gif,.webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files)
                Array.from(e.target.files).forEach((f) => onUpload(f));
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-bg-primary text-primary-foreground font-medium text-sm glow-blue hover:opacity-90 transition-all duration-200 active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 mt-4 overflow-hidden flex flex-col min-h-0">
          <div className="px-4 pb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Chat History
            </span>
            <button
              onClick={onCreateChat}
              className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-3">
            {chatGroups.map((group) => (
              <div key={group.label}>
                <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                        ${
                          activeChat === chat.id
                            ? "bg-muted/80 text-foreground"
                            : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                        }`}
                      onClick={() => {
                        setActiveChat(chat.id);
                        setSidebarOpen(false);
                      }}
                      onMouseEnter={() => setHoveredChat(chat.id)}
                      onMouseLeave={() => setHoveredChat(null)}
                    >
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      {editingChat === chat.id ? (
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={confirmRename}
                          onKeyDown={(e) =>
                            e.key === "Enter" && confirmRename()
                          }
                          className="flex-1 bg-transparent text-sm outline-none border-b border-primary/50"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="flex-1 text-sm truncate">
                          {chat.title}
                        </span>
                      )}
                      {hoveredChat === chat.id && editingChat !== chat.id && (
                        <div className="flex items-center gap-0.5 animate-fade-in-fast">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startRename(chat);
                            }}
                            className="p-1 rounded-md hover:bg-muted transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-1 rounded-md hover:bg-destructive/20 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full gradient-bg-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
              {/* {user.initials} */}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {/* {user.name} */}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {/* {user.plan} */}
              </p>
            </div>
            <button
              title="Sign out"
              className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
