import { useState } from 'react';
import { Bell, Mail, MessageSquare, FileText, Zap } from 'lucide-react';

const notifications = [
  { id: 'email_digest', icon: Mail, label: 'Email Digest', desc: 'Weekly summary of your activity' },
  { id: 'chat_replies', icon: MessageSquare, label: 'Chat Replies', desc: 'When AI finishes processing your query' },
  { id: 'doc_ready', icon: FileText, label: 'Document Ready', desc: 'When document processing is complete' },
  { id: 'product_updates', icon: Zap, label: 'Product Updates', desc: 'New features and improvements' },
];

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => {
  return (
    <button onClick={onToggle} className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${on ? 'gradient-bg-primary glow-blue' : 'bg-muted/60'}`}>
      <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all duration-300 ${on ? 'left-6' : 'left-1'}`} />
    </button>
  );
};

const NotificationSettings = ({ onBack }: { onBack: () => void }) => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    email_digest: true, chat_replies: true, doc_ready: true, product_updates: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-2xl space-y-6">
      <div className="animate-fade-in">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">← Back to Settings</button>
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Choose what you get notified about</p>
      </div>

      <div className="glass-subtle rounded-2xl overflow-hidden divide-y divide-border/30 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {notifications.map(n => (
          <div key={n.id} className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
              <n.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{n.label}</p>
              <p className="text-xs text-muted-foreground">{n.desc}</p>
            </div>
            <Toggle on={settings[n.id]} onToggle={() => toggle(n.id)} />
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm glow-blue hover:opacity-90 transition-all active:scale-[0.98]">
        {saved ? '✓ Saved!' : 'Save Preferences'}
      </button>
    </div>
  );
};

export default NotificationSettings;
