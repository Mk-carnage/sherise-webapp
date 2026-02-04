import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Shield, Briefcase, Users, Wallet, Sparkles, User, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useSidebar } from './AppLayout';
import { useTranslation } from '@/hooks/useTranslation';


export function DesktopSidebar() {
  const location = useLocation();
  const { user, logout } = useApp();
  const { collapsed, setCollapsed } = useSidebar();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('navDashboard'), color: 'text-primary' },
    { path: '/health', icon: Heart, label: t('navHealth'), color: 'text-health' },
    { path: '/safety', icon: Shield, label: t('navSafety'), color: 'text-safety' },
    { path: '/career', icon: Briefcase, label: t('navCareer'), color: 'text-career' },
    { path: '/community', icon: Users, label: t('navCommunity'), color: 'text-community' },
    { path: '/finance', icon: Wallet, label: t('navFinance'), color: 'text-finance' },
    { path: '/stories', icon: Sparkles, label: t('navStories'), color: 'text-accent' },
  ];

  const bottomItems = [
    { path: '/profile', icon: User, label: t('navProfile') },
    { path: '/settings', icon: Settings, label: t('navSettings') },
  ];

  return (
    <aside 
      style={{
        width: collapsed ? '5rem' : '16rem',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      className="hidden md:flex flex-col bg-sidebar border-r border-sidebar-border fixed top-0 left-0 bottom-0 z-40"
    >
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        {!collapsed ? (
          // Expanded: Logo and button in same row
          <div className="flex items-center justify-between gap-2">
            <Link to="/dashboard" className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold sherise-gradient-text whitespace-nowrap truncate">
                SheRise
              </span>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="flex-shrink-0 h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          // Collapsed: Logo and button stacked vertically
          <div className="flex flex-col items-center gap-2">
            <Link to="/dashboard" className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Language Switcher - Only show when expanded */}
      

      {/* Navigation - Scrollable but hidden scrollbar */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {isActive && !collapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-r-full" />
              )}
              <Icon className={cn("h-5 w-5 shrink-0", isActive && item.color)} />
              {!collapsed && (
                <span className="font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1 flex-shrink-0">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 mt-2",
          collapsed ? "flex-col" : ""
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shrink-0">
            {user?.avatar || 'U'}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout} 
                className="h-8 w-8"
                
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
          {collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout} 
              className="h-8 w-8"
              
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}