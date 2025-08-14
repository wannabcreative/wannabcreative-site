import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguageContext } from "@/lib/i18n";
import { 
  BookOpen, 
  Search,
  Calendar,
  ArrowRight,
  Hand,
  Sparkles
} from "lucide-react";
import { type BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, language } = useLanguageContext();

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const filteredPosts = blogPosts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categories = [
    { key: "palmistry", label: "손금 분석", icon: Hand },
    { key: "fortune", label: "사주풀이", icon: Sparkles },
    { key: "tips", label: "운세 팁", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
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
            <Link href="/palmreader">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                손금보기
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-3xl rounded-full"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-mystic-gold to-mystic-violet bg-clip-text text-transparent">
                운세 블로그
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              손금과 사주풀이의 깊이 있는 정보를 전해드립니다
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            {categories.map(({ key, label, icon: Icon }) => (
              <Badge key={key} variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="relative w-12 h-12 mx-auto mb-4">
              <div className="absolute inset-0 border-2 border-mystic-gold/30 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-transparent border-t-mystic-gold rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-300">글을 불러오는 중...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-0">
                  {post.imageUrl && (
                    <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-t-lg relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-mystic-gold/20 border-mystic-gold/30 text-mystic-gold text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.createdAt!).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mystic-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="w-full justify-between text-mystic-gold hover:bg-mystic-gold/10 p-0">
                        자세히 읽기
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-mystic-gold mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">아직 게시된 글이 없습니다</h3>
            <p className="text-gray-300 mb-6">곧 흥미로운 운세 콘텐츠를 선보일 예정입니다!</p>
            <Link href="/palmreader">
              <Button className="mystic-gold-gradient text-slate-900 font-semibold">
                손금보기 체험하기
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}