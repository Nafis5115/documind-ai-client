import { useState } from 'react';
import { User, Camera } from 'lucide-react';

const ProfileSettings = ({ onBack }: { onBack: () => void }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@documind.ai');
  const [bio, setBio] = useState('AI enthusiast and document workflow optimizer.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-2xl space-y-6">
      <div className="animate-fade-in">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">← Back to Settings</button>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <div className="glass-subtle rounded-2xl p-6 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl gradient-bg-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
              JD
            </div>
            <button className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Profile Photo</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all resize-none" />
          </div>
        </div>

        <button onClick={handleSave} className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm glow-blue hover:opacity-90 transition-all active:scale-[0.98]">
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
