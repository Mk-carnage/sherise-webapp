import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Heart, Brain, Activity, Moon, BookOpen, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cycleData, mentalWellnessTips, fitnessRoutines, healthResources } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

const iconMap: Record<string, any> = {
  brain: Brain,
  heart: Heart,
  activity: Activity,
  moon: Moon,
};

export default function Health() {
  const { t } = useTranslation();

  const phases = [
    { name: t('healthMenstrual'), color: 'bg-safety' },
    { name: t('healthFollicular'), color: 'bg-career' },
    { name: t('healthOvulation'), color: 'bg-primary' },
    { name: t('healthLuteal'), color: 'bg-accent' },
  ];

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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-health to-community flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('healthTitle')}</h1>
          </div>
          <p className="text-muted-foreground">{t('healthSubtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Cycle Tracker Chart */}
          <motion.div variants={itemVariants} className="sherise-card module-health">
            <h2 className="font-display text-xl font-bold mb-4">{t('healthCycleTracker')}</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {phases.map((phase) => (
                <div key={phase.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                  <span className="text-sm text-muted-foreground">{phase.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mental Wellness Tips */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('healthMentalWellness')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mentalWellnessTips.map((tip) => {
                const Icon = iconMap[tip.icon] || Brain;
                return (
                  <div key={tip.id} className="sherise-card">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-community to-primary flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Fitness Routines */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('healthFitnessRoutines')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fitnessRoutines.map((routine) => (
                <div key={routine.id} className="sherise-card group cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {routine.category}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-1">{routine.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{routine.duration}</span>
                    <span>•</span>
                    <span>{routine.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Health Resources */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('healthResources')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {healthResources.map((resource) => (
                <div key={resource.id} className="sherise-card group cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-health to-accent flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.category} • {resource.readTime} {t('healthRead')}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
