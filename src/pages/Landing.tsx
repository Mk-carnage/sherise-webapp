import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Briefcase, Users, Wallet, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Landing() {
  const { t } = useTranslation();

  const features = [
    { icon: Heart, title: t('featureHealthTitle'), description: t('featureHealthDesc'), color: 'from-primary to-community' },
    { icon: Shield, title: t('featureSafetyTitle'), description: t('featureSafetyDesc'), color: 'from-safety to-accent' },
    { icon: Briefcase, title: t('featureCareerTitle'), description: t('featureCareerDesc'), color: 'from-career to-secondary' },
    { icon: Users, title: t('featureCommunityTitle'), description: t('featureCommunityDesc'), color: 'from-community to-primary' },
    { icon: Wallet, title: t('featureFinanceTitle'), description: t('featureFinanceDesc'), color: 'from-finance to-accent' },
    { icon: Sparkles, title: t('featureStoriesTitle'), description: t('featureStoriesDesc'), color: 'from-accent to-primary' },
  ];

  return (
    <div className="min-h-screen sherise-hero-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center shadow-glow-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold sherise-gradient-text">{t('appName')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">{t('landingLogin')}</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/signup">{t('signUp')}</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-soft"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">{t('landingTagline')}</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            {t('landingHeroTitle')}{' '}
            <span className="sherise-gradient-text">{t('landingHeroHighlight')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            {t('landingHeroDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                {t('landingGetStarted')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="#features">
                {t('landingExploreFeatures')}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16"
        >
          {[
            { value: '50K+', label: t('landingActiveUsers') },
            { value: '200+', label: t('landingExpertMentors') },
            { value: '98%', label: t('landingSatisfaction') },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold sherise-gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('landingFeaturesTitle')} <span className="sherise-gradient-text">{t('landingFeaturesHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('landingFeaturesSubtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="sherise-card group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-community to-accent p-8 md:p-16 text-center"
        >
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landingCtaTitle')}
            </h2>
            <p className="text-white/90 mb-8 max-w-lg mx-auto">
              {t('landingCtaDescription')}
            </p>
            <Button size="xl" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/signup">
                {t('landingCtaButton')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display font-bold sherise-gradient-text">{t('appName')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 {t('appName')}. {t('landingFooter')}
          </p>
        </div>
      </footer>
    </div>
  );
}
