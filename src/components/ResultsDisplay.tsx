import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '../state/store';
import { 
  BarChart3, 
  FileText, 
  Megaphone, 
  Share2, 
  Copy, 
  Download,
  CheckCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResultsDisplay: React.FC = () => {
  const { launchKit, reset } = useAppStore();
  const { toast } = useToast();

  if (!launchKit) return null;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying manually",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const sections = [
    {
      id: 'market_analysis',
      title: 'Market Analysis',
      icon: BarChart3,
      content: launchKit.market_analysis,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      id: 'product_copy',
      title: 'Product Copy',
      icon: FileText,
      content: launchKit.product_copy,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      id: 'ad_copy',
      title: 'Ad Copy',
      icon: Megaphone,
      content: launchKit.ad_copy,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Success header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold text-gradient">
            Your Launch Kit is Ready!
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's your comprehensive marketing strategy. You can copy individual sections or download the complete kit.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => copyToClipboard(
              `Market Analysis:\n${launchKit.market_analysis}\n\nProduct Copy:\n${launchKit.product_copy}\n\nAd Copy:\n${launchKit.ad_copy}\n\nSocial Media Posts:\n${launchKit.social_posts.join('\n\n')}`,
              'Complete launch kit'
            )}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Copy All
          </Button>
          <Button 
            variant="outline" 
            onClick={reset}
            className="gap-2"
          >
            Create Another
          </Button>
        </div>
      </div>

      {/* Main sections */}
      <div className="grid gap-8">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Card key={section.id} className="gradient-border">
              <div className="bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${section.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(section.content, section.title)}
                      className="gap-2 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-card-foreground whitespace-pre-wrap leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}

        {/* Social Media Posts */}
        {launchKit.social_posts && launchKit.social_posts.length > 0 && (
          <Card className="gradient-border">
            <div className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Share2 className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">Social Media Posts</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(launchKit.social_posts.join('\n\n'), 'Social media posts')}
                    className="gap-2 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Copy className="w-4 h-4" />
                    Copy All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {launchKit.social_posts.map((post, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-background/30 border border-border/30 relative group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                              Post {index + 1}
                            </span>
                          </div>
                          <p className="text-card-foreground whitespace-pre-wrap leading-relaxed">
                            {post}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(post, `Social post ${index + 1}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity gap-1 shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;