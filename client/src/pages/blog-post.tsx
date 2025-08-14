import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguageContext } from "@/lib/i18n";
import { 
  ArrowLeft,
  Calendar,
  Sparkles,
  Share2
} from "lucide-react";
import { type BlogPost } from "@shared/schema";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const { t, language } = useLanguageContext();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", params?.slug],
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="absolute inset-0 border-2 border-mystic-gold/30 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent border-t-mystic-gold rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300">글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">글을 찾을 수 없습니다</h2>
          <Link href="/blog">
            <Button className="mystic-gold-gradient text-slate-900 font-semibold">
              블로그로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <div className="w-10 h-10 mystic-gold-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Sparkles className="text-slate-900 text-lg" />
              </div>
            </Link>
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-mystic-gold to-amber-300 bg-clip-text text-transparent cursor-pointer">
                WannaB Creative
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/blog">
              <Button variant="ghost" className="text-white hover:text-mystic-gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                블로그
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative px-6 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {post.imageUrl && (
            <div className="h-64 md:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg relative overflow-hidden mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8 md:p-12">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="outline" className="bg-mystic-gold/20 border-mystic-gold/30 text-mystic-gold">
                  {post.category}
                </Badge>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.createdAt!).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-mystic-gold ml-auto"
                  onClick={() => {
                    navigator.share?.({
                      title: post.title,
                      url: window.location.href
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
                <Link href="/blog">
                  <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    블로그로 돌아가기
                  </Button>
                </Link>
                <Link href="/palmreader">
                  <Button className="mystic-gold-gradient text-slate-900 font-semibold">
                    손금보기 체험하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}