import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Briefcase, Star, MapPin, Clock, Users, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { mentors, jobOpportunities, onlineCourses, networkingEvents } from '@/data/mockData';

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

export default function Career() {
  const { t } = useTranslation();

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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-career to-secondary flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{t('careerTitle')}</h1>
          </div>
          <p className="text-muted-foreground">{t('careerSubtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Mentors */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">{t('careerMentors')}</h2>
              <Button variant="ghost" size="sm">
                {t('viewAll')} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="sherise-card text-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-career to-secondary flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                    {mentor.avatar}
                  </div>
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{mentor.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{mentor.company}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-finance fill-finance" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor.expertise.map((exp) => (
                      <span key={exp} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Job Opportunities */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">{t('careerJobs')}</h2>
              <Button variant="ghost" size="sm">
                {t('viewAll')} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {jobOpportunities.map((job) => (
                <div key={job.id} className="sherise-card module-career flex flex-col sm:flex-row sm:items-center gap-4 group cursor-pointer">
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-career transition-colors">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.type}
                    </span>
                    <span className="font-medium text-career">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <Button size="sm">{t('apply')}</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Online Courses */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">{t('careerCourses')}</h2>
              <Button variant="ghost" size="sm">
                {t('viewAll')} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {onlineCourses.map((course) => (
                <div key={course.id} className="sherise-card group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-community flex items-center justify-center mb-3">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{course.provider}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{course.enrolled.toLocaleString()} {t('careerEnrolled')}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Networking Events */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">{t('careerEvents')}</h2>
              <Button variant="ghost" size="sm">
                {t('viewAll')} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {networkingEvents.map((event) => (
                <div key={event.id} className="sherise-card flex items-start gap-4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex flex-col items-center justify-center shrink-0 text-white">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {event.type}
                    </span>
                    <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {event.attendees} {t('careerAttendees')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
