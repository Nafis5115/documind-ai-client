import { useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

const themes = [
  { id: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
  { id: 'light', label: 'Light', icon: Sun, desc: 'Classic bright look' },
  { id: 'system', label: 'System', icon: Monitor, desc: 'Follow OS preference' },
];

const accentColors = [
  { name: 'Blue', value: 'hsl(230, 90%, 62%)' },
  { name: 'Purple', value: 'hsl(270, 80%, 60%)' },
  { name: 'Cyan', value: 'hsl(190, 90%, 50%)' },
  { name: 'Green', value: 'hsl(150, 70%, 45%)' },
  { name: 'Pink', value: 'hsl(330, 80%, 60%)' },
  { name: 'Orange', value: 'hsl(25, 90%, 55%)' },
];

const fontSizes = ['Small', 'Medium', 'Large'];

const AppearanceSettings = ({ onBack }: { onBack: () => void }) => {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-2xl space-y-6">
      <div className="animate-fade-in">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">← Back to Settings</button>
        <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize how DocuMind looks</p>
      </div>

      {/* Theme */}
      <div className="glass-subtle rounded-2xl p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-sm font-semibold text-foreground">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(t => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`p-4 rounded-xl text-center transition-all hover:scale-[1.02] active:scale-[0.98] ${theme === t.id ? 'ring-2 ring-primary bg-primary/5 glow-blue' : 'bg-muted/30 hover:bg-muted/50'}`}>
              <t.icon className={`w-6 h-6 mx-auto mb-2 ${theme === t.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="text-sm font-medium text-foreground">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div className="glass-subtle rounded-2xl p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-sm font-semibold text-foreground">Accent Color</h3>
        <div className="flex items-center gap-3">
          {accentColors.map((c, i) => (
            <button key={c.name} onClick={() => setAccent(i)} className={`w-10 h-10 rounded-xl transition-all hover:scale-110 ${accent === i ? 'ring-2 ring-white ring-offset-2 ring-offset-background scale-110' : ''}`} style={{ backgroundColor: c.value }} title={c.name} />
          ))}
        </div>
      </div>

      {/* Font size */}
      <div className="glass-subtle rounded-2xl p-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-sm font-semibold text-foreground">Font Size</h3>
        <div className="flex items-center gap-3">
          {fontSizes.map((s, i) => (
            <button key={s} onClick={() => setFontSize(i)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${fontSize === i ? 'gradient-bg-primary text-primary-foreground glow-blue' : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              {s}
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

export default AppearanceSettings;
