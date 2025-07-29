import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'ko' | 'en' | 'zh' | 'ja' | 'es';

export interface Translation {
  // Header
  appName: string;
  freeTrial: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // File Upload
  uploadTitle: string;
  uploadDescription: string;
  selectPhoto: string;
  selectAnotherPhoto: string;
  dragHere: string;
  uploadComplete: string;
  
  // Upload Guide
  guideTitle: string;
  guidePalm: string;
  guideLighting: string;
  guideClarity: string;
  guideStability: string;
  
  // Loading
  analyzing: string;
  analyzingDescription: string;
  imageProcessing: string;
  lineDetection: string;
  fortuneInterpretation: string;
  completed: string;
  inProgress: string;
  waiting: string;
  
  // Results
  resultsTitle: string;
  resultsDescription: string;
  
  // Reading Categories
  loveTitle: string;
  moneyTitle: string;
  healthTitle: string;
  fortuneScore: string;
  
  // Detailed Analysis
  detailedAnalysis: string;
  mainFeatures: string;
  advice: string;
  analyzeAgain: string;
  
  // Footer
  footerDescription: string;
  services: string;
  palmAnalysis: string;
  fortune: string;
  premium: string;
  support: string;
  help: string;
  contact: string;
  privacy: string;
  footerCopyright: string;
  
  // Toast Messages
  analysisComplete: string;
  analysisCompleteDesc: string;
  analysisFailed: string;
  analysisFailedDesc: string;
  
  // Error Messages
  imageOnly: string;
  fileTooLarge: string;
  readingNotFound: string;
}

const translations: Record<Language, Translation> = {
  ko: {
    appName: "Palm Reader",
    freeTrial: "무료 체험",
    
    heroTitle: "손금으로 알아보는",
    heroSubtitle: "당신의 운명",
    heroDescription: "AI 기술로 분석하는 정확한 손금 해석. 사진 한 장으로 사랑, 재물, 건강의 운세를 확인하세요.",
    
    uploadTitle: "손바닥 사진 업로드",
    uploadDescription: "손바닥을 펼쳐서 선명하게 촬영해주세요",
    selectPhoto: "사진 선택하기",
    selectAnotherPhoto: "다른 사진 선택",
    dragHere: "또는 여기에 파일을 드래그하세요",
    uploadComplete: "업로드 완료",
    
    guideTitle: "촬영 가이드",
    guidePalm: "손바닥을 펼쳐서 촬영",
    guideLighting: "충분한 조명 확보",
    guideClarity: "손금이 선명하게 보이도록",
    guideStability: "흔들림 없이 안정적으로",
    
    analyzing: "손금 분석 중...",
    analyzingDescription: "AI가 당신의 손금을 정밀 분석하고 있습니다",
    imageProcessing: "이미지 처리",
    lineDetection: "손금 라인 감지",
    fortuneInterpretation: "운세 해석",
    completed: "완료",
    inProgress: "진행 중...",
    waiting: "대기 중",
    
    resultsTitle: "손금 분석 결과",
    resultsDescription: "AI가 분석한 당신의 손금 운세입니다",
    
    loveTitle: "감정선 (사랑)",
    moneyTitle: "재물선 (재운)",
    healthTitle: "생명선 (건강)",
    fortuneScore: "운세 점수",
    
    detailedAnalysis: "상세 분석 결과",
    mainFeatures: "주요 특징",
    advice: "조언",
    analyzeAgain: "다시 분석하기",
    
    footerDescription: "AI 기술과 전통 손금술의 만남. 정확하고 신뢰할 수 있는 손금 분석 서비스를 제공합니다.",
    services: "서비스",
    palmAnalysis: "손금 분석",
    fortune: "운세 보기",
    premium: "프리미엄",
    support: "지원",
    help: "도움말",
    contact: "문의하기",
    privacy: "개인정보처리방침",
    footerCopyright: "© 2024 Palm Reader. Made with ❤️ for mystical insights.",
    
    analysisComplete: "분석 완료!",
    analysisCompleteDesc: "손금 분석이 성공적으로 완료되었습니다.",
    analysisFailed: "분석 실패",
    analysisFailedDesc: "손금 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
    
    imageOnly: "이미지 파일만 업로드 가능합니다.",
    fileTooLarge: "파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요.",
    readingNotFound: "손금 분석 결과를 찾을 수 없습니다."
  },
  
  en: {
    appName: "Palm Reader",
    freeTrial: "Free Trial",
    
    heroTitle: "Discover Your Destiny",
    heroSubtitle: "Through Palm Reading",
    heroDescription: "Accurate palm reading powered by AI technology. Discover insights about love, wealth, and health from just one photo.",
    
    uploadTitle: "Upload Palm Photo",
    uploadDescription: "Please take a clear photo of your open palm",
    selectPhoto: "Select Photo",
    selectAnotherPhoto: "Select Another Photo",
    dragHere: "Or drag files here",
    uploadComplete: "Upload Complete",
    
    guideTitle: "Photo Guide",
    guidePalm: "Open your palm fully",
    guideLighting: "Ensure good lighting",
    guideClarity: "Make palm lines visible",
    guideStability: "Keep camera steady",
    
    analyzing: "Analyzing Palm...",
    analyzingDescription: "AI is analyzing your palm lines precisely",
    imageProcessing: "Image Processing",
    lineDetection: "Palm Line Detection",
    fortuneInterpretation: "Fortune Interpretation",
    completed: "Completed",
    inProgress: "In Progress...",
    waiting: "Waiting",
    
    resultsTitle: "Palm Reading Results",
    resultsDescription: "Your AI-analyzed palm reading results",
    
    loveTitle: "Heart Line (Love)",
    moneyTitle: "Fate Line (Wealth)",
    healthTitle: "Life Line (Health)",
    fortuneScore: "Fortune Score",
    
    detailedAnalysis: "Detailed Analysis",
    mainFeatures: "Key Features",
    advice: "Advice",
    analyzeAgain: "Analyze Again",
    
    footerDescription: "Where AI technology meets traditional palmistry. Providing accurate and reliable palm reading services.",
    services: "Services",
    palmAnalysis: "Palm Analysis",
    fortune: "Fortune Reading",
    premium: "Premium",
    support: "Support",
    help: "Help",
    contact: "Contact",
    privacy: "Privacy Policy",
    footerCopyright: "© 2024 Palm Reader. Made with ❤️ for mystical insights.",
    
    analysisComplete: "Analysis Complete!",
    analysisCompleteDesc: "Palm reading analysis completed successfully.",
    analysisFailed: "Analysis Failed",
    analysisFailedDesc: "An error occurred during palm analysis. Please try again.",
    
    imageOnly: "Only image files can be uploaded.",
    fileTooLarge: "File size is too large. Please select a file under 5MB.",
    readingNotFound: "Palm reading results not found."
  },
  
  zh: {
    appName: "掌相大师",
    freeTrial: "免费试用",
    
    heroTitle: "通过手相",
    heroSubtitle: "探索您的命运",
    heroDescription: "AI技术驱动的精准手相解读。仅需一张照片，即可了解爱情、财富和健康运势。",
    
    uploadTitle: "上传手掌照片",
    uploadDescription: "请张开手掌拍摄清晰照片",
    selectPhoto: "选择照片",
    selectAnotherPhoto: "选择其他照片",
    dragHere: "或将文件拖拽到此处",
    uploadComplete: "上传完成",
    
    guideTitle: "拍照指南",
    guidePalm: "完全张开手掌",
    guideLighting: "确保充足光线",
    guideClarity: "手纹清晰可见",
    guideStability: "保持相机稳定",
    
    analyzing: "手相分析中...",
    analyzingDescription: "AI正在精密分析您的手相纹路",
    imageProcessing: "图像处理",
    lineDetection: "手纹识别",
    fortuneInterpretation: "运势解读",
    completed: "已完成",
    inProgress: "进行中...",
    waiting: "等待中",
    
    resultsTitle: "手相分析结果",
    resultsDescription: "AI分析的您的手相运势结果",
    
    loveTitle: "感情线 (爱情)",
    moneyTitle: "事业线 (财富)",
    healthTitle: "生命线 (健康)",
    fortuneScore: "运势评分",
    
    detailedAnalysis: "详细分析结果",
    mainFeatures: "主要特征",
    advice: "建议",
    analyzeAgain: "重新分析",
    
    footerDescription: "AI技术与传统手相学的完美结合。提供准确可靠的手相分析服务。",
    services: "服务",
    palmAnalysis: "手相分析",
    fortune: "运势查看",
    premium: "高级版",
    support: "支持",
    help: "帮助",
    contact: "联系我们",
    privacy: "隐私政策",
    footerCopyright: "© 2024 掌相大师. 用心打造神秘洞察.",
    
    analysisComplete: "分析完成！",
    analysisCompleteDesc: "手相分析已成功完成。",
    analysisFailed: "分析失败",
    analysisFailedDesc: "手相分析过程中发生错误，请重试。",
    
    imageOnly: "只能上传图片文件。",
    fileTooLarge: "文件太大，请选择5MB以下的文件。",
    readingNotFound: "未找到手相分析结果。"
  },
  
  ja: {
    appName: "手相リーダー",
    freeTrial: "無料体験",
    
    heroTitle: "手相で知る",
    heroSubtitle: "あなたの運命",
    heroDescription: "AI技術による正確な手相鑑定。写真一枚で恋愛、金運、健康運を確認できます。",
    
    uploadTitle: "手のひら写真をアップロード",
    uploadDescription: "手のひらを開いて鮮明に撮影してください",
    selectPhoto: "写真を選択",
    selectAnotherPhoto: "別の写真を選択",
    dragHere: "またはここにファイルをドラッグ",
    uploadComplete: "アップロード完了",
    
    guideTitle: "撮影ガイド",
    guidePalm: "手のひらを完全に開く",
    guideLighting: "十分な照明を確保",
    guideClarity: "手相が鮮明に見えるように",
    guideStability: "ブレないように安定して",
    
    analyzing: "手相分析中...",
    analyzingDescription: "AIがあなたの手相を精密分析しています",
    imageProcessing: "画像処理",
    lineDetection: "手相線検出",
    fortuneInterpretation: "運勢解釈",
    completed: "完了",
    inProgress: "進行中...",
    waiting: "待機中",
    
    resultsTitle: "手相分析結果",
    resultsDescription: "AIが分析したあなたの手相運勢です",
    
    loveTitle: "感情線 (恋愛)",
    moneyTitle: "財運線 (金運)",  
    healthTitle: "生命線 (健康)",
    fortuneScore: "運勢スコア",
    
    detailedAnalysis: "詳細分析結果",
    mainFeatures: "主な特徴",
    advice: "アドバイス",
    analyzeAgain: "再分析する",
    
    footerDescription: "AI技術と伝統的手相術の融合。正確で信頼できる手相分析サービスを提供します。",
    services: "サービス",
    palmAnalysis: "手相分析",
    fortune: "運勢鑑定",
    premium: "プレミアム",
    support: "サポート",
    help: "ヘルプ",
    contact: "お問い合わせ",
    privacy: "プライバシーポリシー",
    footerCopyright: "© 2024 手相リーダー. 神秘的な洞察のために❤️で作成.",
    
    analysisComplete: "分析完了！",
    analysisCompleteDesc: "手相分析が正常に完了しました。",
    analysisFailed: "分析失敗",
    analysisFailedDesc: "手相分析中にエラーが発生しました。再試行してください。",
    
    imageOnly: "画像ファイルのみアップロード可能です。",
    fileTooLarge: "ファイルサイズが大きすぎます。5MB以下のファイルを選択してください。",
    readingNotFound: "手相分析結果が見つかりません。"
  },
  
  es: {
    appName: "Lector de Palmas",
    freeTrial: "Prueba Gratuita",
    
    heroTitle: "Descubre tu Destino",
    heroSubtitle: "a través de la Quiromancia",
    heroDescription: "Lectura de palmas precisa impulsada por tecnología AI. Descubre revelaciones sobre amor, riqueza y salud con solo una foto.",
    
    uploadTitle: "Subir Foto de la Palma",
    uploadDescription: "Por favor toma una foto clara de tu palma abierta",
    selectPhoto: "Seleccionar Foto",
    selectAnotherPhoto: "Seleccionar Otra Foto",
    dragHere: "O arrastra archivos aquí",
    uploadComplete: "Subida Completa",
    
    guideTitle: "Guía de Foto",
    guidePalm: "Abre completamente tu palma",
    guideLighting: "Asegura buena iluminación",
    guideClarity: "Haz visibles las líneas de la palma",
    guideStability: "Mantén la cámara estable",
    
    analyzing: "Analizando Palma...",
    analyzingDescription: "La AI está analizando las líneas de tu palma con precisión",
    imageProcessing: "Procesamiento de Imagen",
    lineDetection: "Detección de Líneas",
    fortuneInterpretation: "Interpretación del Destino",
    completed: "Completado",
    inProgress: "En Progreso...",
    waiting: "Esperando",
    
    resultsTitle: "Resultados de Lectura de Palma",
    resultsDescription: "Tus resultados de lectura de palma analizados por AI",
    
    loveTitle: "Línea del Corazón (Amor)",
    moneyTitle: "Línea del Destino (Riqueza)",
    healthTitle: "Línea de la Vida (Salud)",
    fortuneScore: "Puntuación del Destino",
    
    detailedAnalysis: "Análisis Detallado",
    mainFeatures: "Características Principales",
    advice: "Consejo",
    analyzeAgain: "Analizar de Nuevo",
    
    footerDescription: "Donde la tecnología AI se encuentra con la quiromancia tradicional. Proporcionando servicios de lectura de palmas precisos y confiables.",
    services: "Servicios",
    palmAnalysis: "Análisis de Palma",
    fortune: "Lectura del Destino",
    premium: "Premium",
    support: "Soporte",
    help: "Ayuda",
    contact: "Contacto",
    privacy: "Política de Privacidad",
    footerCopyright: "© 2024 Lector de Palmas. Hecho con ❤️ para revelaciones místicas.",
    
    analysisComplete: "¡Análisis Completo!",
    analysisCompleteDesc: "El análisis de lectura de palma se completó exitosamente.",
    analysisFailed: "Análisis Fallido",
    analysisFailedDesc: "Ocurrió un error durante el análisis de la palma. Por favor intenta de nuevo.",
    
    imageOnly: "Solo se pueden subir archivos de imagen.",
    fileTooLarge: "El archivo es demasiado grande. Por favor selecciona un archivo menor a 5MB.",
    readingNotFound: "Resultados de lectura de palma no encontrados."
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('palm-reader-language');
    if (saved && Object.keys(translations).includes(saved)) {
      return saved as Language;
    }
    
    // Auto-detect language from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
  });

  const setLanguageAndSave = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('palm-reader-language', lang);
  };

  const t = translations[language];

  return { t, language, setLanguage: setLanguageAndSave };
};

export const LanguageContext = createContext<{
  t: Translation;
  language: Language;
  setLanguage: (lang: Language) => void;
} | null>(null);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};