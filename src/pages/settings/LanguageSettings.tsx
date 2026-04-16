import { useState } from 'react';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
];

const regions = ['United States', 'United Kingdom', 'European Union', 'Asia Pacific'];

const LanguageSettings = ({ onBack }: { onBack: () => void }) => {
  const [lang, setLang] = useState('en');
  const [region, setRegion] = useState('United States');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-2xl space-y-6">
      <div className="animate-fade-in">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">← Back to Settings</button>
        <h1 className="text-2xl font-bold text-foreground">Language & Region</h1>
        <p className="text-sm text-muted-foreground mt-1">Set your preferred language and region</p>
      </div>

      {/* Language */}
      <div className="glass-subtle rounded-2xl p-6 space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Interface Language</h3>
        <div className="grid grid-cols-2 gap-2">
          {languages.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} className={`flex items-center justify-between p-3 rounded-xl transition-all text-left ${lang === l.code ? 'ring-2 ring-primary bg-primary/5' : 'bg-muted/30 hover:bg-muted/50'}`}>
              <div>
                <p className="text-sm font-medium text-foreground">{l.label}</p>
                <p className="text-xs text-muted-foreground">{l.native}</p>
              </div>
              {lang === l.code && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="glass-subtle rounded-2xl p-6 space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-sm font-semibold text-foreground">Region</h3>
        <div className="grid grid-cols-2 gap-2">
          {regions.map(r => (
            <button key={r} onClick={() => setRegion(r)} className={`p-3 rounded-xl text-sm text-left transition-all ${region === r ? 'ring-2 ring-primary bg-primary/5 font-medium text-foreground' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm glow-blue hover:opacity-90 transition-all active:scale-[0.98]">
        {saved ? '✓ Saved!' : 'Save Preferences'}
      </button>
    </div>
  );
};

export default LanguageSettings;
