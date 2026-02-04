import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Shield, Phone, Scale, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { helplineNumbers, legalRights, safetyTips } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

export default function Safety() {
  const [sosDialogOpen, setSosDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleSOS = () => {
    setSosDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-safety to-accent flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('safetyTitle')}</h1>
          </div>
          <p className="text-muted-foreground">{t('safetySubtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* SOS Button */}
          <motion.div variants={itemVariants} className="sherise-card text-center py-8">
            <h2 className="font-display text-xl font-bold mb-4">{t('safetyEmergency')}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t('safetyEmergencyDesc')}
            </p>
            <Button
              variant="sos"
              size="xl"
              onClick={handleSOS}
              className="w-48 h-48 rounded-full text-2xl sos-button"
            >
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-12 w-12" />
                <span>{t('safetySos')}</span>
              </div>
            </Button>
          </motion.div>

          {/* Helpline Numbers */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('safetyHelplines')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helplineNumbers.map((helpline) => (
                <div key={helpline.id} className="sherise-card module-safety">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-safety to-destructive flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{helpline.name}</h3>
                      <p className="text-2xl font-bold text-safety mb-1">{helpline.number}</p>
                      <p className="text-sm text-muted-foreground">{helpline.description}</p>
                      <span className="inline-block mt-2 text-xs font-medium bg-safety/10 text-safety px-2 py-1 rounded-full">
                        {helpline.available}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Legal Rights */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('safetyLegalRights')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {legalRights.map((right) => (
                <div key={right.id} className="sherise-card group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-community flex items-center justify-center shrink-0">
                      <Scale className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{right.title}</h3>
                      <p className="text-sm text-muted-foreground">{right.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Safety Tips */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('safetySafetyTips')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safetyTips.map((tip) => (
                <div key={tip.id} className="sherise-card">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* SOS Dialog */}
        <Dialog open={sosDialogOpen} onOpenChange={setSosDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-safety">
                <AlertTriangle className="h-6 w-6" />
                {t('safetyAlertTitle')}
              </DialogTitle>
              <DialogDescription>
                {t('safetyAlertDesc')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-safety/10 flex items-center justify-center">
                    <span className="text-safety font-bold">1</span>
                  </div>
                  <span>{t('safetyAlertStep1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-safety/10 flex items-center justify-center">
                    <span className="text-safety font-bold">2</span>
                  </div>
                  <span>{t('safetyAlertStep2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-safety/10 flex items-center justify-center">
                    <span className="text-safety font-bold">3</span>
                  </div>
                  <span>{t('safetyAlertStep3')}</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                {t('safetyAlertNote')}
              </p>
            </div>
            <Button variant="destructive" onClick={() => setSosDialogOpen(false)} className="w-full">
              {t('safetyCloseAlert')}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
