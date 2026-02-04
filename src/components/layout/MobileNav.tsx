import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Shield, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export function MobileNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('navHome') },
    { path: '/health', icon: Heart, label: t('communityHealth') },
    { path: '/safety', icon: Shield, label: t('navSafety').split(' ')[0] },
    { path: '/career', icon: Briefcase, label: t('communityCareer') },
    { path: '/community', icon: Users, label: t('navCommunity') },
  ];

  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className="h-5 w-5 relative z-10" />
              <span className="text-xs font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
