import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import type { User } from "../lib/auth-store";
import { useAppState } from "../lib/store";
import type { ChatMessage, ChatSession, Document } from "../lib/store";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { useIsMobile } from "../hooks/use-mobile";

export interface AppLayoutContext {
  documents: Document[];
  chats: ChatSession[];
  activeChat: string;
  setActiveChat: (id: string) => void;
  createChat: (document?: Document) => string;
  addDocument: (file: File) => Document;
  deleteDocument: (id: string) => void;
  addMessage: (
    id: string,
    message: Omit<ChatMessage, "id" | "timestamp">,
  ) => void;
}

interface AppLayoutProps {
  user: User;
  onLogout: () => void;
}

const AppLayout = ({ user, onLogout }: AppLayoutProps) => {
  const state = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (id && id !== state.activeChat) {
      state.setActiveChat(id);
    }
  }, [id, state]);

  const activeChat = state.chats.find((chat) => chat.id === state.activeChat);

  const handleSidebarUpload = (file: File) => {
    const document = state.addDocument(file);
    const newid = state.createChat(document);
    navigate(`/chat/${newid}`);
  };

  const handleSendMessage = (
    id: string,
    message: Omit<ChatMessage, "id" | "timestamp">,
  ) => {
    state.addMessage(id, message);
    setTimeout(() => {
      state.addMessage(id, {
        role: "ai",
        content:
          "Thank you for your question! I've analyzed the document and here's what I found:\n\nThis is a simulated AI response. In a production environment, this would contain intelligent analysis of your document based on the context provided.\n\nKey takeaways would appear here with relevant citations and insights.",
        sources: ["Page 1, Section 1"],
      });
    }, 2500);
  };

  const handleCreateChat = () => {
    state.setActiveChat("");
    navigate("/chat");
  };

  const handleDeleteChat = (idToDelete: string) => {
    const remainingChats = state.chats.filter((chat) => chat.id !== idToDelete);

    state.deleteChat(idToDelete);

    if (location.pathname === `/chat/${idToDelete}`) {
      navigate(
        remainingChats.length > 0 ? `/chat/${remainingChats[0].id}` : "/chat",
      );
    }
  };

  return (
    <div className="h-screen flex gap-3 p-3 overflow-hidden">
      <Sidebar
        activeChat={state.activeChat}
        setActiveChat={(id) => {
          state.setActiveChat(id);
          navigate(`/chat/${id}`);
        }}
        chats={state.chats}
        documents={state.documents}
        onCreateChat={handleCreateChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={state.renameChat}
        sidebarOpen={state.sidebarOpen}
        setSidebarOpen={state.setSidebarOpen}
        onUpload={handleSidebarUpload}
        user={user}
        onLogout={() => {
          onLogout();
          navigate("/login");
        }}
      />

      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {isMobile === true && (
          <TopBar
            sidebarOpen={state.sidebarOpen}
            setSidebarOpen={state.setSidebarOpen}
          />
        )}

        <main className="flex-1 flex gap-3 min-h-0">
          <div className="flex-1 glass-subtle rounded-2xl flex flex-col min-w-0 overflow-hidden">
            <Outlet
              context={{
                documents: state.documents,
                chats: state.chats,
                activeChat: activeChat?.id ?? state.activeChat,
                setActiveChat: state.setActiveChat,
                createChat: state.createChat,
                addDocument: state.addDocument,
                deleteDocument: state.deleteDocument,
                addMessage: handleSendMessage,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
