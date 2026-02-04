import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Users, Heart, MessageCircle, Send, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';
import { communityPosts } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function Community() {
  const { t } = useTranslation();

  const discussionTopics = [
    { key: 'All', label: t('communityAll') },
    { key: 'Career', label: t('communityCareer') },
    { key: 'Health', label: t('communityHealth') },
    { key: 'Lifestyle', label: t('communityLifestyle') },
    { key: 'Education', label: t('communityEducation') },
    { key: 'Finance', label: t('communityFinance') },
    { key: 'Relationships', label: t('communityRelationships') },
  ];

  const [selectedTopic, setSelectedTopic] = useState('All');
  const [posts, setPosts] = useState(communityPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTopic, setNewPostTopic] = useState('Career');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPosts = selectedTopic === 'All' 
    ? posts 
    : posts.filter(post => post.topic === selectedTopic);

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'You',
        avatar: 'YO',
        title: newPostTitle,
        content: newPostContent,
        likes: 0,
        comments: 0,
        time: 'Just now',
        topic: newPostTopic,
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
      setDialogOpen(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-community to-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-2xl md:text-3xl font-bold">{t('communityTitle')}</h1>
                <p className="text-muted-foreground">{t('communitySubtitle')}</p>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4" /> {t('communityNewPost')}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t('communityCreatePost')}</DialogTitle>
                  <DialogDescription>
                    {t('communityCreatePostDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Input
                      placeholder={t('communityPostTitle')}
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t('communityPostContent')}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-32 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {discussionTopics.filter(t => t.key !== 'All').map((topic) => (
                      <button
                        key={topic.key}
                        onClick={() => setNewPostTopic(topic.key)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                          newPostTopic === topic.key
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreatePost} variant="hero" className="w-full">
                  <Send className="h-4 w-4" /> {t('post')}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Topic Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-nowrap sm:flex-wrap gap-2 mb-6 overflow-x-auto sm:overflow-visible pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {discussionTopics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => setSelectedTopic(topic.key)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedTopic === topic.key
                  ? "bg-primary text-primary-foreground shadow-glow-primary"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {topic.label}
            </button>
          ))}
        </motion.div>

        {/* Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="sherise-card module-community w-full"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community to-primary flex items-center justify-center text-white font-semibold shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-xs text-muted-foreground">• {post.time}</span>
                    <span className="text-xs font-medium bg-community/10 text-community px-2 py-0.5 rounded-full shrink-0">
                      {post.topic}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 break-words">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments} {t('communityComments')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}
