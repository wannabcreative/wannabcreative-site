import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPalmReadingSchema } from "@shared/schema";
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

      // Mock palm reading analysis
      const analysisResult = await analyzePalmImage(req.file.path);
      
      const palmReading = await storage.createPalmReading({
        imageUrl: `/uploads/${req.file.filename}`,
        loveScore: analysisResult.loveScore,
        moneyScore: analysisResult.moneyScore,
        healthScore: analysisResult.healthScore,
        loveReading: analysisResult.loveReading,
        moneyReading: analysisResult.moneyReading,
        healthReading: analysisResult.healthReading,
        features: analysisResult.features,
        advice: analysisResult.advice,
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

  const httpServer = createServer(app);
  return httpServer;
}

// Mock palm analysis function
async function analyzePalmImage(imagePath: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate random but realistic scores
  const loveScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const moneyScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const healthScore = Math.floor(Math.random() * 25) + 75; // 75-100

  const loveReadings = [
    "깊고 안정적인 감정선을 가지고 있습니다. 진실한 사랑을 만날 가능성이 높으며, 장기적인 관계에서 행복을 찾을 것입니다.",
    "감정이 풍부하고 로맨틱한 성향을 보입니다. 열정적인 사랑을 경험하게 될 것이며, 상대방에게 깊은 인상을 남길 것입니다.",
    "신중하고 진지한 사랑 스타일을 가지고 있습니다. 시간을 두고 천천히 발전하는 관계에서 진정한 행복을 찾을 것입니다."
  ];

  const moneyReadings = [
    "꾸준한 노력으로 재물을 축적하는 타입입니다. 투자보다는 저축을 통해 안정적인 부를 쌓을 가능성이 높습니다.",
    "사업이나 투자에 재능이 있습니다. 큰 위험보다는 안정적인 수익을 추구하는 것이 좋겠습니다.",
    "재정 관리 능력이 뛰어납니다. 계획적인 소비와 투자로 꾸준히 재산을 늘려갈 것입니다."
  ];

  const healthReadings = [
    "매우 강한 생명력을 보여줍니다. 건강한 생활습관을 유지한다면 장수하며 활기찬 삶을 살 것입니다.",
    "전반적으로 건강한 편이지만 스트레스 관리가 중요합니다. 충분한 휴식과 운동을 권합니다.",
    "체력이 좋고 회복력이 빠른 편입니다. 정기적인 건강검진으로 더욱 건강한 삶을 유지하세요."
  ];

  const features = [
    "감정이 풍부하고 예술적 감각이 뛰어남",
    "논리적 사고력과 분석능력이 우수함",
    "리더십이 강하고 추진력이 뛰어남",
    "직감이 뛰어나고 판단력이 정확함",
    "창의적이고 독창적인 아이디어가 풍부함"
  ];

  const adviceList = [
    "인내심을 기르면 더 큰 성공을 얻을 수 있음",
    "건강 관리에 더욱 신경쓰는 것이 좋음",
    "새로운 도전을 두려워하지 말고 적극적으로 임하세요",
    "인간관계에서 소통을 더욱 중요시하세요",
    "꾸준한 노력이 큰 결실을 맺을 것입니다"
  ];

  return {
    loveScore,
    moneyScore,
    healthScore,
    loveReading: loveReadings[Math.floor(Math.random() * loveReadings.length)],
    moneyReading: moneyReadings[Math.floor(Math.random() * moneyReadings.length)],
    healthReading: healthReadings[Math.floor(Math.random() * healthReadings.length)],
    features: features.slice(0, 3),
    advice: adviceList.slice(0, 3)
  };
}
