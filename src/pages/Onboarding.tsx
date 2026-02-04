import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Shield, Briefcase, Users, Wallet, Check, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { setLanguage, completeOnboarding, user } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const interests = [
    { id: 'health', name: t('interestHealth'), icon: Heart, color: 'from-health to-community' },
    { id: 'career', name: t('interestCareer'), icon: Briefcase, color: 'from-career to-secondary' },
    { id: 'safety', name: t('interestSafety'), icon: Shield, color: 'from-safety to-accent' },
    { id: 'finance', name: t('interestFinance'), icon: Wallet, color: 'from-finance to-accent' },
    { id: 'community', name: t('interestCommunity'), icon: Users, color: 'from-community to-primary' },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setLanguage(code);
  };

  const handleComplete = () => {
    completeOnboarding(selectedInterests);
    navigate('/dashboard');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen sherise-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-primary" : s < step ? "w-8 bg-primary/50" : "w-2 bg-muted"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={step}>
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              transition={{ duration: 0.3 }}
              className="sherise-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                <Globe className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="font-display text-2xl font-bold mb-2">{t('onboardingLanguageTitle')}</h1>
              <p className="text-muted-foreground mb-8">{t('onboardingLanguageSubtitle')}</p>

              <div className="grid gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
                      selectedLanguage === lang.code
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium flex-1 text-left">{lang.name}</span>
                    {selectedLanguage === lang.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>

              <Button variant="hero" size="lg" className="w-full mt-8" onClick={() => setStep(2)}>
                {t('continue')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              transition={{ duration: 0.3 }}
              className="sherise-card text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="font-display text-2xl font-bold mb-2">{t('onboardingInterestsTitle')}</h1>
              <p className="text-muted-foreground mb-8">{t('onboardingInterestsSubtitle')}</p>

              <div className="grid gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                      interest.color
                    )}>
                      <interest.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium flex-1 text-left">{interest.name}</span>
                    {selectedInterests.includes(interest.id) && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button variant="hero" size="lg" className="flex-1" onClick={() => setStep(3)}>
                  {t('continue')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              transition={{ duration: 0.3 }}
              className="sherise-card text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center mx-auto mb-6 shadow-glow-primary"
              >
                <Check className="h-10 w-10 text-white" />
              </motion.div>
              
              <h1 className="font-display text-2xl font-bold mb-2">
                {t('onboardingCompleteTitle')}, {user?.name?.split(' ')[0] || t('friend')}! 🎉
              </h1>
              <p className="text-muted-foreground mb-8">
                {t('onboardingCompleteSubtitle')}
              </p>

              <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left">
                <p className="text-sm text-muted-foreground mb-2">{t('onboardingPersonalized')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.length > 0 ? (
                    selectedInterests.map(id => {
                      const interest = interests.find(i => i.id === id);
                      return interest ? (
                        <span key={id} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {interest.name}
                        </span>
                      ) : null;
                    })
                  ) : (
                    <span className="text-sm text-muted-foreground">{t('onboardingAllTopics')}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button variant="hero" size="lg" className="flex-1" onClick={handleComplete}>
                  {t('letsGo')}
                  <Sparkles className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
