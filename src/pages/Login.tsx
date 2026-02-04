import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, hasCompletedOnboarding } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    if (hasCompletedOnboarding) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen sherise-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="sherise-card">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center shadow-glow-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold sherise-gradient-text">{t('appName')}</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold mb-2">{t('loginTitle')}</h1>
            <p className="text-muted-foreground">{t('loginSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t('loginEmail')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('loginPassword')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="#" className="text-sm text-primary hover:underline">
                {t('loginForgotPassword')}
              </Link>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              {t('signIn')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            {t('loginNoAccount')}{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              {t('loginSignUpLink')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
