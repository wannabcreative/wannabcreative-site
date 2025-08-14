import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPalmReadingSchema, insertBlogPostSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Upload palm image and analyze
  app.post('/api/palm-reading', upload.single('palmImage'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      // Get language and birth date from request body
      const language = req.body.language || 'ko';
      const birthDate = req.body.birthDate;

      // Mock palm reading analysis with language support
      const analysisResult = await analyzePalmImage(req.file.path, language, birthDate);
      
      const palmReading = await storage.createPalmReading({
        imageUrl: `/uploads/${req.file.filename}`,
        birthDate: birthDate,
        loveScore: analysisResult.loveScore,
        moneyScore: analysisResult.moneyScore,
        healthScore: analysisResult.healthScore,
        loveReading: analysisResult.loveReading,
        moneyReading: analysisResult.moneyReading,
        healthReading: analysisResult.healthReading,
        features: analysisResult.features,
        advice: analysisResult.advice,
        todayFortune: analysisResult.todayFortune,
        newYearFortune: analysisResult.newYearFortune,
        mbtiPrediction: analysisResult.mbtiPrediction,
      });

      res.json(palmReading);
    } catch (error) {
      console.error('Palm reading analysis error:', error);
      res.status(500).json({ message: 'Analysis failed. Please try again.' });
    }
  });

  // Get palm reading by ID
  app.get('/api/palm-reading/:id', async (req, res) => {
    try {
      const reading = await storage.getPalmReading(req.params.id);
      if (!reading) {
        return res.status(404).json({ message: '손금 분석 결과를 찾을 수 없습니다.' });
      }
      res.json(reading);
    } catch (error) {
      console.error('Get palm reading error:', error);
      res.status(500).json({ message: 'Failed to retrieve reading' });
    }
  });

  // Blog post routes
  // Get all blog posts
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error('Get blog posts error:', error);
      res.status(500).json({ message: 'Failed to retrieve blog posts' });
    }
  });

  // Get blog post by slug
  app.get('/api/blog-posts/:slug', async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json(blogPost);
    } catch (error) {
      console.error('Get blog post error:', error);
      res.status(500).json({ message: 'Failed to retrieve blog post' });
    }
  });

  // Create blog post (for admin use)
  app.post('/api/blog-posts', express.json(), async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validatedData);
      res.status(201).json(blogPost);
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  });

  // Delete blog post
  app.delete('/api/blog-posts/:id', async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Delete blog post error:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Mock palm analysis function with multilingual support
async function analyzePalmImage(imagePath: string, language: string = 'ko', birthDate?: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate random but realistic scores
  const loveScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const moneyScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const healthScore = Math.floor(Math.random() * 25) + 75; // 75-100

  const readings = {
    ko: {
      love: [
        "깊고 안정적인 감정선을 가지고 있습니다. 진실한 사랑을 만날 가능성이 높으며, 장기적인 관계에서 행복을 찾을 것입니다.",
        "감정이 풍부하고 로맨틱한 성향을 보입니다. 열정적인 사랑을 경험하게 될 것이며, 상대방에게 깊은 인상을 남길 것입니다.",
        "신중하고 진지한 사랑 스타일을 가지고 있습니다. 시간을 두고 천천히 발전하는 관계에서 진정한 행복을 찾을 것입니다."
      ],
      money: [
        "꾸준한 노력으로 재물을 축적하는 타입입니다. 투자보다는 저축을 통해 안정적인 부를 쌓을 가능성이 높습니다.",
        "사업이나 투자에 재능이 있습니다. 큰 위험보다는 안정적인 수익을 추구하는 것이 좋겠습니다.",
        "재정 관리 능력이 뛰어납니다. 계획적인 소비와 투자로 꾸준히 재산을 늘려갈 것입니다."
      ],
      health: [
        "매우 강한 생명력을 보여줍니다. 건강한 생활습관을 유지한다면 장수하며 활기찬 삶을 살 것입니다.",
        "전반적으로 건강한 편이지만 스트레스 관리가 중요합니다. 충분한 휴식과 운동을 권합니다.",
        "체력이 좋고 회복력이 빠른 편입니다. 정기적인 건강검진으로 더욱 건강한 삶을 유지하세요."
      ],
      features: [
        "감정이 풍부하고 예술적 감각이 뛰어남",
        "논리적 사고력과 분석능력이 우수함",
        "리더십이 강하고 추진력이 뛰어남",
        "직감이 뛰어나고 판단력이 정확함",
        "창의적이고 독창적인 아이디어가 풍부함"
      ],
      advice: [
        "인내심을 기르면 더 큰 성공을 얻을 수 있음",
        "건강 관리에 더욱 신경쓰는 것이 좋음",
        "새로운 도전을 두려워하지 말고 적극적으로 임하세요",
        "인간관계에서 소통을 더욱 중요시하세요",
        "꾸준한 노력이 큰 결실을 맺을 것입니다"
      ]
    },
    en: {
      love: [
        "You have a deep and stable heart line. You're likely to meet true love and find happiness in long-term relationships.",
        "You show rich emotions and romantic tendencies. You'll experience passionate love and leave a deep impression on your partner.",
        "You have a cautious and serious approach to love. You'll find true happiness in relationships that develop slowly over time."
      ],
      money: [
        "You're the type to accumulate wealth through steady effort. You're more likely to build stable wealth through savings rather than investments.",
        "You have talent in business or investment. It would be better to pursue stable profits rather than big risks.",
        "You have excellent financial management skills. You'll steadily increase your wealth through planned spending and investment."
      ],
      health: [
        "You show very strong vitality. If you maintain healthy lifestyle habits, you'll live a long and energetic life.",
        "You're generally healthy, but stress management is important. Sufficient rest and exercise are recommended.",
        "You have good physical strength and quick recovery. Maintain a healthier life through regular health checkups."
      ],
      features: [
        "Rich emotions and excellent artistic sense",
        "Outstanding logical thinking and analytical abilities",
        "Strong leadership and excellent drive",
        "Excellent intuition and accurate judgment",
        "Creative and original ideas are abundant"
      ],
      advice: [
        "Cultivating patience can lead to greater success",
        "It's good to pay more attention to health management",
        "Don't be afraid of new challenges and approach them actively",
        "Value communication more in human relationships",
        "Steady effort will bear great fruit"
      ]
    },
    zh: {
      love: [
        "您拥有深厚稳定的感情线。很可能遇到真爱，在长期关系中找到幸福。",
        "您表现出丰富的情感和浪漫倾向。将经历激情的爱情，给对方留下深刻印象。",
        "您对爱情持谨慎认真的态度。在慢慢发展的关系中会找到真正的幸福。"
      ],
      money: [
        "您是通过稳定努力积累财富的类型。通过储蓄而非投资更可能建立稳定财富。",
        "您在商业或投资方面有天赋。追求稳定收益而非巨大风险会更好。",
        "您拥有出色的财务管理能力。通过计划性消费和投资稳步增加财富。"
      ],
      health: [
        "您展现出非常强的生命力。保持健康的生活习惯，将长寿且充满活力。",
        "您总体健康，但压力管理很重要。建议充分休息和运动。",
        "您体力好，恢复快。通过定期健康检查维持更健康的生活。"
      ],
      features: [
        "情感丰富，艺术感出色",
        "逻辑思维和分析能力突出",
        "领导力强，推动力出色",
        "直觉出色，判断准确",
        "创意和原创想法丰富"
      ],
      advice: [
        "培养耐心可获得更大成功",
        "更加注意健康管理比较好",
        "不要害怕新挑战，积极应对",
        "在人际关系中更重视沟通",
        "持续努力将结出大果实"
      ]
    },
    ja: {
      love: [
        "深く安定した感情線をお持ちです。真実の愛に出会う可能性が高く、長期的な関係で幸せを見つけるでしょう。",
        "豊かな感情とロマンチックな傾向を示しています。情熱的な愛を経験し、相手に深い印象を与えるでしょう。",
        "慎重で真剣な愛のスタイルをお持ちです。時間をかけてゆっくり発展する関係で真の幸せを見つけるでしょう。"
      ],
      money: [
        "着実な努力で財を築くタイプです。投資よりも貯蓄を通じて安定した富を築く可能性が高いです。",
        "事業や投資に才能があります。大きなリスクよりも安定した収益を追求するのが良いでしょう。",
        "財務管理能力に優れています。計画的な消費と投資で着実に財産を増やしていくでしょう。"
      ],
      health: [
        "非常に強い生命力を示しています。健康的な生活習慣を維持すれば長寿で活力ある人生を送るでしょう。",
        "全体的に健康ですがストレス管理が重要です。十分な休息と運動をお勧めします。",
        "体力が良く回復力が早い方です。定期的な健康診断でより健康的な生活を維持してください。"
      ],
      features: [
        "感情豊かで芸術的センスに優れる",
        "論理的思考力と分析能力が優秀",
        "リーダーシップが強く推進力に優れる",
        "直感に優れ判断力が正確",
        "創造的で独創的なアイデアが豊富"
      ],
      advice: [
        "忍耐力を養えばより大きな成功を得られる",
        "健康管理により注意を払うのが良い",
        "新しい挑戦を恐れず積極的に臨んでください",
        "人間関係でコミュニケーションをより重視してください",
        "着実な努力が大きな実を結ぶでしょう"
      ]
    },
    es: {
      love: [
        "Tienes una línea del corazón profunda y estable. Es probable que encuentres el amor verdadero y la felicidad en relaciones a largo plazo.",
        "Muestras emociones ricas y tendencias románticas. Experimentarás amor apasionado y dejarás una impresión profunda en tu pareja.",
        "Tienes un estilo de amor cauteloso y serio. Encontrarás la verdadera felicidad en relaciones que se desarrollen lentamente con el tiempo."
      ],
      money: [
        "Eres del tipo que acumula riqueza a través del esfuerzo constante. Es más probable que construyas riqueza estable a través del ahorro que de las inversiones.",
        "Tienes talento en los negocios o las inversiones. Sería mejor buscar ganancias estables en lugar de grandes riesgos.",
        "Tienes excelentes habilidades de gestión financiera. Aumentarás constantemente tu riqueza a través del gasto planificado y la inversión."
      ],
      health: [
        "Muestras una vitalidad muy fuerte. Si mantienes hábitos de vida saludables, vivirás una vida larga y enérgica.",
        "Generalmente estás saludable, pero el manejo del estrés es importante. Se recomiendan descanso suficiente y ejercicio.",
        "Tienes buena fuerza física y recuperación rápida. Mantén una vida más saludable a través de chequeos médicos regulares."
      ],
      features: [
        "Emociones ricas y excelente sentido artístico",
        "Pensamiento lógico sobresaliente y habilidades analíticas",
        "Liderazgo fuerte y excelente impulso",
        "Intuición excelente y juicio preciso",
        "Las ideas creativas y originales son abundantes"
      ],
      advice: [
        "Cultivar la paciencia puede llevar a un mayor éxito",
        "Es bueno prestar más atención al manejo de la salud",
        "No tengas miedo de nuevos desafíos y enfréntelos activamente",
        "Valora más la comunicación en las relaciones humanas",
        "El esfuerzo constante dará grandes frutos"
      ]
    }
  };

  const currentReadings = readings[language as keyof typeof readings] || readings.ko;

  // Generate birthday-based fortunes if birth date is provided
  let todayFortune = "";
  let newYearFortune = "";
  let mbtiPrediction = "";

  if (birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    const zodiacSigns = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
    const birthYear = birth.getFullYear();
    const zodiacSign = zodiacSigns[(birthYear - 1900) % 12];
    
    const fortuneTemplates = {
      ko: {
        today: [
          `오늘은 ${zodiacSign}띠인 당신에게 특별한 기회가 찾아올 것입니다. 직감을 믿고 행동하세요.`,
          `${zodiacSign}띠의 운세가 상승 중입니다. 새로운 만남이나 좋은 소식을 기대해보세요.`,
          `오늘은 조심스럽게 행동하는 것이 좋겠습니다. ${zodiacSign}띠는 신중함이 행운을 가져다 줍니다.`
        ],
        newYear: [
          `${today.getFullYear()}년 ${zodiacSign}띠는 큰 변화와 성장의 해가 될 것입니다. 새로운 도전을 두려워하지 마세요.`,
          `올해는 ${zodiacSign}띠에게 재운이 특히 좋은 해입니다. 투자나 사업에 관심을 가져보세요.`,
          `${zodiacSign}띠의 ${today.getFullYear()}년은 인간관계에서 많은 발전이 있을 것입니다. 소중한 인연을 만나게 됩니다.`
        ],
        mbti: [
          `당신의 손금을 보니 ENFP 성향이 강합니다. 창의적이고 열정적인 에너지가 느껴집니다.`,
          `ISFJ의 특성이 보입니다. 다른 사람을 배려하는 따뜻한 마음과 책임감이 돋보입니다.`,
          `INTJ 성향이 나타납니다. 논리적 사고와 체계적인 계획 수립 능력이 뛰어납니다.`,
          `ESFP의 특징이 강하게 드러납니다. 사교적이고 즐거운 에너지로 주변을 밝게 만듭니다.`
        ]
      },
      en: {
        today: [
          `Today brings special opportunities for you as a ${zodiacSign} sign. Trust your instincts and take action.`,
          `Fortune is rising for the ${zodiacSign} sign. Look forward to new encounters or good news.`,
          `It would be good to act carefully today. Caution brings luck to the ${zodiacSign} sign.`
        ],
        newYear: [
          `${today.getFullYear()} will be a year of great change and growth for the ${zodiacSign} sign. Don't fear new challenges.`,
          `This year brings especially good financial luck for the ${zodiacSign} sign. Consider investments or business opportunities.`,
          `${today.getFullYear()} will bring many developments in relationships for the ${zodiacSign} sign. You'll meet precious connections.`
        ],
        mbti: [
          `Looking at your palm, I see strong ENFP tendencies. Creative and passionate energy is felt.`,
          `ISFJ characteristics are visible. Your warm heart and sense of responsibility in caring for others stands out.`,
          `INTJ tendencies appear. Your logical thinking and systematic planning abilities are excellent.`,
          `ESFP traits are strongly revealed. You brighten your surroundings with sociable and joyful energy.`
        ]
      }
    };

    const currentTemplates = fortuneTemplates[language as keyof typeof fortuneTemplates] || fortuneTemplates.ko;
    todayFortune = currentTemplates.today[Math.floor(Math.random() * currentTemplates.today.length)];
    newYearFortune = currentTemplates.newYear[Math.floor(Math.random() * currentTemplates.newYear.length)];
    mbtiPrediction = currentTemplates.mbti[Math.floor(Math.random() * currentTemplates.mbti.length)];
  } else {
    // Default messages when no birth date is provided
    todayFortune = language === 'en' ? "Please provide your birth date for personalized daily fortune." : "개인 맞춤 오늘의 운세를 위해 생년월일을 입력해주세요.";
    newYearFortune = language === 'en' ? "Please provide your birth date for new year fortune reading." : "신년 운세 분석을 위해 생년월일을 입력해주세요.";
    mbtiPrediction = language === 'en' ? "Please provide your birth date for MBTI prediction." : "MBTI 예측을 위해 생년월일을 입력해주세요.";
  }

  return {
    loveScore,
    moneyScore,
    healthScore,
    loveReading: currentReadings.love[Math.floor(Math.random() * currentReadings.love.length)],
    moneyReading: currentReadings.money[Math.floor(Math.random() * currentReadings.money.length)],
    healthReading: currentReadings.health[Math.floor(Math.random() * currentReadings.health.length)],
    features: currentReadings.features.slice(0, 3),
    advice: currentReadings.advice.slice(0, 3),
    todayFortune,
    newYearFortune,
    mbtiPrediction
  };
}
