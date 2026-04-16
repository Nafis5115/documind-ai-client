import { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';

const SecuritySettings = ({ onBack }: { onBack: () => void }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSave = () => {
    setSaved(true);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-2xl space-y-6">
      <div className="animate-fade-in">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">← Back to Settings</button>
        <h1 className="text-2xl font-bold text-foreground">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">Password and authentication settings</p>
      </div>

      {/* Change password */}
      <div className="glass-subtle rounded-2xl p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Change Password</h3>
        <div className="space-y-3">
          <div className="relative">
            <input type={showCurrent ? 'text' : 'password'} value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Current password" className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all pr-10" />
            <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <input type={showNew ? 'text' : 'password'} value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all pr-10" />
            <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground outline-none focus:border-primary/40 transition-all" />
        </div>
        <button onClick={handleSave} className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm glow-blue hover:opacity-90 transition-all active:scale-[0.98]">
          {saved ? '✓ Updated!' : 'Update Password'}
        </button>
      </div>

      {/* Two-factor */}
      <div className="glass-subtle rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account</p>
          </div>
          <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-7 rounded-full transition-all duration-300 relative ${twoFactor ? 'gradient-bg-primary glow-blue' : 'bg-muted/60'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all duration-300 ${twoFactor ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
        {twoFactor && (
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-foreground animate-fade-in">
            <p className="font-medium mb-1">✓ 2FA is enabled</p>
            <p className="text-xs text-muted-foreground">Your account is protected with two-factor authentication.</p>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="glass-subtle rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-sm font-semibold text-foreground mb-3">Active Sessions</h3>
        <div className="space-y-3">
          {[{ device: 'Chrome on MacOS', location: 'San Francisco, US', current: true }, { device: 'Safari on iPhone', location: 'San Francisco, US', current: false }].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <div>
                <p className="text-sm text-foreground">{s.device} {s.current && <span className="text-xs text-primary ml-1">(current)</span>}</p>
                <p className="text-xs text-muted-foreground">{s.location}</p>
              </div>
              {!s.current && <button className="text-xs text-destructive hover:underline">Revoke</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
