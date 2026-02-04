import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { User, Calendar, Heart, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

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

const interestColors: Record<string, string> = {
  health: 'from-health to-community',
  career: 'from-career to-secondary',
  safety: 'from-safety to-accent',
  finance: 'from-finance to-accent',
  community: 'from-community to-primary',
};

export default function Profile() {
  const { user, logout } = useApp();
  const { t } = useTranslation();

  const interestLabels: Record<string, string> = {
    health: t('interestHealth'),
    career: t('interestCareer'),
    safety: t('interestSafety'),
    finance: t('interestFinance'),
    community: t('interestCommunity'),
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants} className="sherise-card text-center py-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl">
              {user?.avatar || 'U'}
            </div>
            <h1 className="font-display text-2xl font-bold mb-1">{user?.name || 'User'}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{t('profileMemberSince')}</span>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div variants={itemVariants} className="sherise-card">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              {t('profileInterests')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.interests && user.interests.length > 0 ? (
                user.interests.map((interest) => (
                  <span
                    key={interest}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${interestColors[interest] || 'from-primary to-accent'} text-white`}
                  >
                    {interestLabels[interest] || interest}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">{t('profileNoInterests')}</p>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="sherise-card">
            <h2 className="font-display text-lg font-bold mb-4">{t('profileQuickLinks')}</h2>
            <div className="space-y-2">
              <Link to="/settings" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium">{t('navSettings')}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Logout */}
          <motion.div variants={itemVariants}>
            <Button variant="outline" className="w-full" onClick={logout}>
              {t('signOut')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
