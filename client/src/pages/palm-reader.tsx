import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Hand, 
  Heart, 
  Coins, 
  Activity, 
  Star, 
  Lightbulb, 
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { type PalmReading } from "@shared/schema";

export default function PalmReader() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'loading' | 'results'>('upload');
  const [results, setResults] = useState<PalmReading | null>(null);
  const { toast } = useToast();

  const analyzePalmMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('palmImage', file);
      
      const response = await apiRequest('POST', '/api/palm-reading', formData);
      return response.json();
    },
    onSuccess: (data: PalmReading) => {
      setResults(data);
      setCurrentStep('results');
      toast({
        title: "분석 완료!",
        description: "손금 분석이 성공적으로 완료되었습니다.",
      });
    },
    onError: (error) => {
      console.error('Analysis failed:', error);
      toast({
        title: "분석 실패",
        description: "손금 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      setCurrentStep('upload');
    }
  });

  const handleFileSelect = (file: File) => {
    setCurrentStep('loading');
    analyzePalmMutation.mutate(file);
  };

  const resetApp = () => {
    setCurrentStep('upload');
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 mystic-gold-gradient rounded-full flex items-center justify-center">
              <Hand className="text-slate-900 text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-mystic-gold to-amber-300 bg-clip-text text-transparent">
              Palm Reader
            </h1>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:block bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            무료 체험
          </Button>
        </nav>
      </header>

      <main className="relative px-6">
        {/* Hero Section */}
        {currentStep === 'upload' && (
          <div className="py-12 text-center max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-3xl rounded-full"></div>
              <h2 className="relative text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-mystic-gold to-mystic-violet bg-clip-text text-transparent">
                  손금으로 알아보는
                </span>
                <br />
                <span className="font-serif text-mystic-gold">당신의 운명</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                AI 기술로 분석하는 정확한 손금 해석. 사진 한 장으로 
                <span className="text-mystic-gold font-semibold"> 사랑, 재물, 건강</span>의 운세를 확인하세요.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </div>
        )}

        {/* Loading Section */}
        {currentStep === 'loading' && (
          <div className="py-12 text-center max-w-2xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12">
              <div className="mb-8">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-mystic-gold/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-mystic-gold rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-transparent border-t-mystic-violet rounded-full animate-spin-reverse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Hand className="text-2xl text-mystic-gold" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-mystic-gold mb-4">손금 분석 중...</h3>
                <p className="text-gray-300 text-lg mb-6">AI가 당신의 손금을 정밀 분석하고 있습니다</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">이미지 처리</span>
                  <span className="text-mystic-emerald">완료</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">손금 라인 감지</span>
                  <span className="text-mystic-gold">진행 중...</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">운세 해석</span>
                  <span className="text-gray-500">대기 중</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {currentStep === 'results' && results && (
          <div className="py-12 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-mystic-gold">손금 분석 결과</h2>
              <p className="text-gray-300 text-lg">AI가 분석한 당신의 손금 운세입니다</p>
            </div>

            {/* Analysis Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Love */}
              <Card className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm border-pink-300/20 hover:transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-pink-300">감정선 (사랑)</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">운세 점수</span>
                      <span className="text-pink-300 font-semibold">{results.loveScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${results.loveScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {results.loveReading}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Money */}
              <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border-yellow-300/20 hover:transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mystic-gold-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                      <Coins className="text-2xl text-slate-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-300">재물선 (재운)</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">운세 점수</span>
                      <span className="text-yellow-300 font-semibold">{results.moneyScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="mystic-gold-gradient h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${results.moneyScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {results.moneyReading}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Health */}
              <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm border-green-300/20 hover:transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-300">생명선 (건강)</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">운세 점수</span>
                      <span className="text-green-300 font-semibold">{results.healthScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${results.healthScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {results.healthReading}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h3 className="text-2xl font-semibold text-mystic-gold mb-6 text-center">상세 분석 결과</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-mystic-violet mb-4 flex items-center">
                    <Star className="mr-2" />
                    주요 특징
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    {Array.isArray(results.features) && results.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="text-mystic-gold mt-1 mr-3 text-sm flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-mystic-violet mb-4 flex items-center">
                    <Lightbulb className="mr-2" />
                    조언
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    {Array.isArray(results.advice) && results.advice.map((advice, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="text-mystic-emerald mt-1 mr-3 text-sm flex-shrink-0" />
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={resetApp}
                  className="bg-gradient-to-r from-mystic-violet to-purple-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>다시 분석하기</span>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 mystic-gold-gradient rounded-full flex items-center justify-center">
                  <Hand className="text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-mystic-gold">Palm Reader</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI 기술과 전통 손금술의 만남. 정확하고 신뢰할 수 있는 손금 분석 서비스를 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-mystic-gold transition-colors">손금 분석</a></li>
                <li><a href="#" className="hover:text-mystic-gold transition-colors">운세 보기</a></li>
                <li><a href="#" className="hover:text-mystic-gold transition-colors">프리미엄</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-mystic-gold transition-colors">도움말</a></li>
                <li><a href="#" className="hover:text-mystic-gold transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-mystic-gold transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Palm Reader. Made with ❤️ for mystical insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
