import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Wallet, PiggyBank, TrendingUp, Target, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { budgetData, financialTips } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';

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

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--community))',
  'hsl(var(--finance))',
  'hsl(var(--career))',
  'hsl(var(--health))',
];

const iconMap: Record<string, any> = {
  'piggy-bank': PiggyBank,
  'chart-bar': Wallet,
  'trending-up': TrendingUp,
  'handshake': Target,
};

export default function Finance() {
  const { t } = useTranslation();

  const expenseData = Object.entries(budgetData.expenses).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: COLORS[index % COLORS.length],
  }));

  const totalExpenses = Object.values(budgetData.expenses).reduce((a, b) => a + b, 0);
  const savingsProgress = (budgetData.savingsGoal.current / budgetData.savingsGoal.target) * 100;

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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-finance to-accent flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('financeTitle')}</h1>
          </div>
          <p className="text-muted-foreground">{t('financeSubtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Overview Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sherise-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-career to-secondary flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">{t('financeIncome')}</span>
              </div>
              <p className="text-2xl font-bold">${budgetData.income.toLocaleString()}</p>
            </div>
            <div className="sherise-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">{t('financeExpenses')}</span>
              </div>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className="sherise-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-finance to-accent flex items-center justify-center">
                  <PiggyBank className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">{t('financeSavings')}</span>
              </div>
              <p className="text-2xl font-bold">${budgetData.expenses.savings.toLocaleString()}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Chart */}
            <motion.div variants={itemVariants} className="sherise-card module-finance">
              <h2 className="font-display text-xl font-bold mb-4">{t('financeBudget')}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value}`, '']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.75rem',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Savings Goal */}
            <motion.div variants={itemVariants} className="sherise-card">
              <h2 className="font-display text-xl font-bold mb-4">{t('financeSavingsGoal')}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-finance to-accent flex items-center justify-center">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{budgetData.savingsGoal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${budgetData.savingsGoal.current.toLocaleString()} of ${budgetData.savingsGoal.target.toLocaleString()}
                  </p>
                </div>
              </div>
              <Progress value={savingsProgress} className="h-4 mb-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{savingsProgress.toFixed(0)}% {t('financeComplete')}</span>
                <span>${(budgetData.savingsGoal.target - budgetData.savingsGoal.current).toLocaleString()} {t('financeToGo')}</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-3">{t('financeMonthlyContribution')}</h4>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span>{t('financeAutoSave')}</span>
                  <span className="font-semibold text-finance">${budgetData.expenses.savings}{t('financeMonth')}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Financial Tips */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-xl font-bold mb-4">{t('financeTips')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {financialTips.map((tip) => {
                const Icon = iconMap[tip.icon] || Wallet;
                return (
                  <div key={tip.id} className="sherise-card group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-finance to-accent flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-finance transition-colors">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
