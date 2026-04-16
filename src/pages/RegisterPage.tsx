import { useState } from 'react';
import { FileText, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User } from 'lucide-react';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => Promise<any>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

const RegisterPage = ({ onRegister, onSwitchToLogin, isLoading }: RegisterPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service');
      return;
    }
    try {
      await onRegister(name, email, password);
    } catch {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center glow-blue">
            <FileText className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">DocuMind AI</h1>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground text-sm">Start analyzing documents with AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in-fast">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:bg-muted/60 focus:border-primary/40 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.15)]"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-border accent-primary" />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <button type="button" className="text-primary hover:text-primary/80 transition-colors">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</button>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg-primary text-primary-foreground font-medium text-sm glow-blue hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
