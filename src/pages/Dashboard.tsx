import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Heart, Shield, Briefcase, Users, Wallet, Sparkles, ChevronRight, Calendar, Lightbulb, Quote } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { wellnessTips, inspirationalQuotes, upcomingReminders } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { user } = useApp();
  const { t } = useTranslation();
  const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  const nextReminder = upcomingReminders[0];

  const modules = [
    { path: '/health', icon: Heart, title: t('dashboardHealthHub'), description: t('dashboardHealthDesc'), color: 'from-health to-community', module: 'health' },
    { path: '/safety', icon: Shield, title: t('dashboardSafetySupport'), description: t('dashboardSafetyDesc'), color: 'from-safety to-accent', module: 'safety' },
    { path: '/career', icon: Briefcase, title: t('dashboardCareer'), description: t('dashboardCareerDesc'), color: 'from-career to-secondary', module: 'career' },
    { path: '/community', icon: Users, title: t('dashboardCommunity'), description: t('dashboardCommunityDesc'), color: 'from-community to-primary', module: 'community' },
    { path: '/finance', icon: Wallet, title: t('dashboardFinance'), description: t('dashboardFinanceDesc'), color: 'from-finance to-accent', module: 'finance' },
    { path: '/stories', icon: Sparkles, title: t('dashboardStories'), description: t('dashboardStoriesDesc'), color: 'from-accent to-primary', module: 'stories' },
  ];

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
            {t('dashboardWelcome')}, <span className="sherise-gradient-text">{user?.name?.split(' ')[0] || t('friend')}</span>! 👋
          </h1>
          <p className="text-muted-foreground">{t('dashboardSubtitle')}</p>
        </motion.div>

        {/* Quick Stats Widgets */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {/* Wellness Tip */}
          <motion.div variants={itemVariants} className="sherise-card module-health">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-health to-community flex items-center justify-center shrink-0">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">{t('dashboardWellnessTip')}</h3>
                <p className="text-sm">{randomTip}</p>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Reminder */}
          <motion.div variants={itemVariants} className="sherise-card module-career">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-career to-secondary flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">{t('dashboardUpcoming')}</h3>
                <p className="text-sm">{nextReminder.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Inspirational Quote */}
          <motion.div variants={itemVariants} className="sherise-card module-community">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-community to-primary flex items-center justify-center shrink-0">
                <Quote className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">{t('dashboardDailyInspiration')}</h3>
                <p className="text-sm italic">"{randomQuote.quote}"</p>
                <p className="text-xs text-muted-foreground mt-1">— {randomQuote.author}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Module Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {modules.map((module) => (
            <motion.div key={module.path} variants={itemVariants}>
              <Link to={module.path} className="block">
                <div className={`sherise-card module-${module.module} group`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}
