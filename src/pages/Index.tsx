import { useAppState } from "../lib/store";
import type { User } from "../lib/auth-store";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DocumentPanel from "../components/DocumentPanel";
import ChatInterface from "../components/ChatInterface";
import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import SettingsPage from "../pages/SettingsPage";

interface IndexProps {
  user: User;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const state = useAppState();
  const activeChat = state.chats.find((c) => c.id === state.activeChat);
  const activeDoc = activeChat?.documentId
    ? state.documents.find((d) => d.id === activeChat.documentId)
    : undefined;

  const handleSidebarUpload = (file: File) => {
    const document = state.addDocument(file);
    state.createChat(document);
  };

  const handleSendMessage = (chatId: string, content: string) => {
    state.addMessage(chatId, { role: "user", content });
    // Simulate AI response
    setTimeout(() => {
      state.addMessage(chatId, {
        role: "ai",
        content:
          "Thank you for your question! I've analyzed the document and here's what I found:\n\nThis is a simulated AI response. In a production environment, this would contain intelligent analysis of your document based on the context provided.\n\nKey takeaways would appear here with relevant citations and insights.",
        sources: ["Page 1, Section 1"],
      });
    }, 2500);
  };

  return (
    <div className="h-screen flex gap-3 p-3 overflow-hidden">
      <Sidebar
        activePage={state.activePage}
        setActivePage={state.setActivePage}
        activeChat={state.activeChat}
        setActiveChat={state.setActiveChat}
        chats={state.chats}
        documents={state.documents}
        onCreateChat={state.createChat}
        onDeleteChat={state.deleteChat}
        onRenameChat={state.renameChat}
        sidebarOpen={state.sidebarOpen}
        setSidebarOpen={state.setSidebarOpen}
        onUpload={handleSidebarUpload}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <TopBar
          sidebarOpen={state.sidebarOpen}
          setSidebarOpen={state.setSidebarOpen}
          activePage={state.activePage}
        />

        <main className="flex-1 flex gap-3 min-h-0">
          <div className="flex-1 glass-subtle rounded-2xl flex flex-col min-w-0 overflow-hidden">
            {state.activePage === "dashboard" && (
              <DashboardPage
                documents={state.documents}
                chats={state.chats}
                setActivePage={state.setActivePage}
              />
            )}
            {state.activePage === "documents" && (
              <DocumentsPage
                documents={state.documents}
                setActivePage={state.setActivePage}
                onUpload={(file) => state.addDocument(file)}
                onDelete={state.deleteDocument}
              />
            )}
            {state.activePage === "chat" && (
              <ChatInterface
                chat={activeChat}
                onSendMessage={handleSendMessage}
              />
            )}
            {state.activePage === "settings" && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
