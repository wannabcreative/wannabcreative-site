import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguageContext } from "@/lib/i18n";
import { LanguageSelector } from "@/components/ui/language-selector";
import { 
  Hand, 
  BookOpen,
  Star,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const { t, language } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 mystic-gold-gradient rounded-full flex items-center justify-center">
              <Sparkles className="text-slate-900 text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-mystic-gold to-amber-300 bg-clip-text text-transparent">
              WannaB Creative
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </nav>
      </header>

      <main className="relative px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-3xl rounded-full"></div>
            <h2 className="relative text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-mystic-gold to-mystic-violet bg-clip-text text-transparent">
                운명을 읽는
              </span>
              <br />
              <span className="font-serif text-mystic-gold">신비로운 공간</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              손금 분석과 사주풀이의 모든것을 한 곳에서 경험해보세요
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Palm Reading Service */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Hand className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-mystic-gold mb-4">손금 분석</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  AI 기반의 정밀한 손금 분석으로 사랑, 재물, 건강운을 알아보세요. 
                  생년월일과 함께 더욱 정확한 운세를 제공합니다.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <div>• 사랑운, 재물운, 건강운 분석</div>
                  <div>• 5개국 언어 지원</div>
                  <div>• 개인별 맞춤 조언</div>
                </div>
                <Link href="/palmreader">
                  <Button className="w-full mystic-gold-gradient text-slate-900 font-semibold py-3 text-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    손금보기 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Blog Service */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 mystic-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-3xl text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-mystic-gold mb-4">운세 블로그</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  손금과 사주풀이에 관한 전문적인 정보와 최신 뉴스를 확인하세요.
                  전문가들의 깊이 있는 해석을 만나보실 수 있습니다.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <div>• 전문가 칼럼</div>
                  <div>• 운세 뉴스 & 트렌드</div>
                  <div>• 실전 사주풀이 팁</div>
                </div>
                <Link href="/blog">
                  <Button className="w-full mystic-gold-gradient text-slate-900 font-semibold py-3 text-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    블로그 둘러보기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-mystic-gold mb-8">왜 WannaB Creative인가요?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Star className="w-12 h-12 text-mystic-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">정확한 분석</h4>
              <p className="text-gray-300 text-sm">AI와 전통 기법의 완벽한 조화</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-mystic-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">신비로운 경험</h4>
              <p className="text-gray-300 text-sm">몰입감 있는 운세 체험</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-mystic-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">전문 콘텐츠</h4>
              <p className="text-gray-300 text-sm">깊이 있는 운세 정보 제공</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}