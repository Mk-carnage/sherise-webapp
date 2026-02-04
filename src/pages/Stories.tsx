import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { successStories } from '@/data/mockData';
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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<typeof successStories[0] | null>(null);
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4 shadow-glow-accent">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{t('storiesTitle')}</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t('storiesSubtitle')}
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              className="sherise-card group cursor-pointer overflow-hidden"
              onClick={() => setSelectedStory(story)}
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center text-white font-bold text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  {story.image}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {story.category}
                  </span>
                  <h3 className="font-display text-lg font-bold mt-2 group-hover:text-primary transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{story.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{story.preview}</p>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 text-primary">
                <span className="text-sm font-medium group-hover:underline">{t('storiesReadFull')}</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Modal */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedStory && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {selectedStory.image}
                    </div>
                    <div>
                      <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {selectedStory.category}
                      </span>
                      <DialogTitle className="font-display text-xl mt-2">{selectedStory.name}</DialogTitle>
                      <DialogDescription>{selectedStory.title}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-foreground leading-relaxed">{selectedStory.fullStory}</p>
                  <div className="p-4 bg-gradient-to-r from-primary/10 via-community/10 to-accent/10 rounded-xl">
                    <p className="text-sm italic text-center">
                      "{t('storiesQuote')}"
                    </p>
                  </div>
                </div>
                <Button variant="hero" onClick={() => setSelectedStory(null)} className="w-full">
                  <Sparkles className="h-4 w-4" /> {t('storiesShare')}
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
