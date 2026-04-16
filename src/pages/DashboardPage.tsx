import { FileText, MessageSquare, Zap, TrendingUp, Upload, ArrowRight, Clock } from 'lucide-react';
import type { Document, ChatSession } from '@/lib/store';

interface DashboardPageProps {
  documents: Document[];
  chats: ChatSession[];
  setActivePage: (page: string) => void;
}

const stats = [
  { label: 'Documents', value: '6', icon: FileText, color: 'from-[hsl(230,80%,55%)] to-[hsl(270,70%,55%)]' },
  { label: 'Conversations', value: '4', icon: MessageSquare, color: 'from-[hsl(270,70%,55%)] to-[hsl(330,70%,60%)]' },
  { label: 'AI Queries', value: '24', icon: Zap, color: 'from-[hsl(190,80%,45%)] to-[hsl(230,80%,55%)]' },
  { label: 'Insights', value: '12', icon: TrendingUp, color: 'from-[hsl(150,60%,45%)] to-[hsl(190,70%,50%)]' },
];

const DashboardPage = ({ documents, chats, setActivePage }: DashboardPageProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
      {/* Welcome */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, <span className="gradient-text">John</span></h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your documents.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        {stats.map((stat, i) => (
          <div key={stat.label} className="glass-subtle rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <div className="glass-subtle rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">Recent Documents</h2>
            <button onClick={() => setActivePage('documents')} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {documents.slice(0, 4).map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-all cursor-pointer group">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} • {doc.type.toUpperCase()}</p>
                </div>
                <span className="text-xs text-muted-foreground/60">{doc.uploadedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Chats */}
        <div className="glass-subtle rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">Recent Chats</h2>
            <button onClick={() => setActivePage('chat')} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {chats.slice(0, 4).map(chat => (
              <div key={chat.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-all cursor-pointer group">
                <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                  <MessageSquare className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">{chat.messages.length} messages</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                  <Clock className="w-3 h-3" />
                  {chat.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Upload */}
      <div className="glass-subtle rounded-2xl p-8 text-center animate-fade-in border border-dashed border-primary/20 hover:border-primary/40 transition-all cursor-pointer group" style={{ animationDelay: '0.4s' }}>
        <div className="w-14 h-14 rounded-2xl gradient-bg-primary mx-auto mb-4 flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
          <Upload className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Upload a Document</h3>
        <p className="text-sm text-muted-foreground">Drag & drop or click to upload PDF, text, or image files</p>
      </div>
    </div>
  );
};

export default DashboardPage;
