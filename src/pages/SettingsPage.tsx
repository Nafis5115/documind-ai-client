import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, ChevronRight } from 'lucide-react';
import ProfileSettings from './settings/ProfileSettings';
import SecuritySettings from './settings/SecuritySettings';
import BillingSettings from './settings/BillingSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import NotificationSettings from './settings/NotificationSettings';
import LanguageSettings from './settings/LanguageSettings';

const sections = [
  {
    title: 'Account',
    items: [
      { id: 'profile', icon: User, label: 'Profile', desc: 'Manage your name, email, and avatar' },
      { id: 'security', icon: Shield, label: 'Security', desc: 'Password, two-factor authentication' },
      { id: 'billing', icon: CreditCard, label: 'Billing', desc: 'Manage subscription and payment methods' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'appearance', icon: Palette, label: 'Appearance', desc: 'Theme, colors, and display settings' },
      { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Email and in-app notification preferences' },
      { id: 'language', icon: Globe, label: 'Language', desc: 'Interface language and region' },
    ],
  },
];

const subPages: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  profile: ProfileSettings,
  security: SecuritySettings,
  billing: BillingSettings,
  appearance: AppearanceSettings,
  notifications: NotificationSettings,
  language: LanguageSettings,
};

const SettingsPage = () => {
  const [subPage, setSubPage] = useState<string | null>(null);

  if (subPage && subPages[subPage]) {
    const SubComponent = subPages[subPage];
    return <SubComponent onBack={() => setSubPage(null)} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-3xl space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile card */}
      <div className="glass-subtle rounded-2xl p-6 flex items-center gap-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="w-16 h-16 rounded-2xl gradient-bg-accent flex items-center justify-center text-xl font-bold text-primary-foreground glow-purple">
          JD
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">John Doe</h2>
          <p className="text-sm text-muted-foreground">john@documind.ai</p>
          <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full gradient-bg-primary text-primary-foreground font-medium">Pro Plan</span>
        </div>
        <button onClick={() => setSubPage('profile')} className="px-4 py-2 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
          Edit Profile
        </button>
      </div>

      {/* Setting sections */}
      {sections.map((section, si) => (
        <div key={section.title} className="space-y-3 animate-fade-in" style={{ animationDelay: `${0.2 + si * 0.1}s` }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
          <div className="glass-subtle rounded-2xl overflow-hidden divide-y divide-border/30">
            {section.items.map(item => (
              <button key={item.label} onClick={() => setSubPage(item.id)} className="w-full flex items-center gap-4 p-4 hover:bg-muted/30 transition-all text-left group">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Danger zone */}
      <div className="glass-subtle rounded-2xl p-6 border border-destructive/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-sm font-semibold text-destructive mb-1">Danger Zone</h3>
        <p className="text-xs text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
        <button className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
