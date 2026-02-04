import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Settings as SettingsIcon, Globe, Moon, Sun, Eye, Type, Accessibility } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

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

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export default function SettingsPage() {
  const { language, setLanguage, darkMode, toggleDarkMode, highContrast, toggleHighContrast, fontSize, setFontSize } = useApp();
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-community flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('settingsTitle')}</h1>
          </div>
          <p className="text-muted-foreground">{t('settingsSubtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Language */}
          <motion.div variants={itemVariants} className="sherise-card">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold">{t('settingsLanguage')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                    language === lang.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div variants={itemVariants} className="sherise-card">
            <div className="flex items-center gap-3 mb-4">
              {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <h2 className="font-display text-lg font-bold">{t('settingsAppearance')}</h2>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t('settingsDarkMode')}</p>
                  <p className="text-sm text-muted-foreground">{t('settingsDarkModeDesc')}</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </motion.div>

          {/* Accessibility */}
          <motion.div variants={itemVariants} className="sherise-card">
            <div className="flex items-center gap-3 mb-4">
              <Accessibility className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold">{t('settingsAccessibility')}</h2>
            </div>
            <div className="space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('settingsHighContrast')}</p>
                    <p className="text-sm text-muted-foreground">{t('settingsHighContrastDesc')}</p>
                  </div>
                </div>
                <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
              </div>

              {/* Font Size */}
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <Type className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('settingsFontSize')}</p>
                    <p className="text-sm text-muted-foreground">{t('settingsFontSizeDesc')}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(['normal', 'large', 'extra-large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                        fontSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      )}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div variants={itemVariants} className="sherise-card text-center">
            <p className="text-sm text-muted-foreground">
              {t('settingsAbout')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
