import { type User, type InsertUser, type PalmReading, type InsertPalmReading, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPalmReading(reading: InsertPalmReading): Promise<PalmReading>;
  getPalmReading(id: string): Promise<PalmReading | undefined>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private palmReadings: Map<string, PalmReading>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.palmReadings = new Map();
    this.blogPosts = new Map();
    
    // Add sample blog posts
    this.addSampleBlogPosts();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPalmReading(insertReading: InsertPalmReading): Promise<PalmReading> {
    const id = randomUUID();
    const reading: PalmReading = { 
      ...insertReading, 
      id, 
      birthDate: insertReading.birthDate || null,
      createdAt: new Date() 
    };
    this.palmReadings.set(id, reading);
    return reading;
  }

  async getPalmReading(id: string): Promise<PalmReading | undefined> {
    return this.palmReadings.get(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = { 
      ...insertBlogPost,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  private addSampleBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "손금으로 보는 2024년 운세 트렌드",
        slug: "palm-reading-2024-trends",
        content: `2024년, 손금술의 새로운 트렌드가 주목받고 있습니다. 전통적인 손금풀이에 현대적 해석이 더해지면서 더욱 정확하고 실용적인 운세 분석이 가능해졌습니다.

특히 올해는 다음과 같은 손금 특징들이 중요한 의미를 갖습니다:

**생명선 (Life Line)**
생명선의 깊이와 길이는 여전히 중요하지만, 2024년에는 생명선 위의 작은 가지선들이 더욱 주목받고 있습니다. 이러한 가지선들은 새로운 기회와 변화의 시기를 나타냅니다.

**감정선 (Heart Line)**
감정선의 끝부분이 어디로 향하는지가 2024년 사랑운을 좌우합니다. 검지손가락 쪽으로 향하는 감정선은 올해 새로운 만남의 기회가 많음을 의미합니다.

**지능선 (Head Line)**
지능선과 생명선의 거리가 멀수록 독립적이고 진취적인 성향을 나타내며, 2024년에는 이러한 특징을 가진 분들에게 사업운이 특히 좋을 것으로 예상됩니다.

전문가들은 손금을 볼 때 단순히 선의 모양만 보는 것이 아니라, 손의 전체적인 형태, 손가락의 길이, 손바닥의 색깔 등을 종합적으로 분석해야 한다고 강조합니다.`,
        excerpt: "2024년 손금술의 새로운 트렌드와 주목해야 할 손금 특징들을 전문가가 상세히 분석해드립니다.",
        imageUrl: null,
        category: "palmistry",
        published: 1,
        createdAt: new Date(2024, 0, 15),
        updatedAt: new Date(2024, 0, 15)
      },
      {
        id: randomUUID(),
        title: "사주풀이의 기본 원리와 활용법",
        slug: "sajupooli-basic-principles",
        content: `사주풀이는 한국 전통 점술의 핵심으로, 태어난 년, 월, 일, 시의 간지를 바탕으로 개인의 운명을 분석하는 방법입니다.

**사주의 구성 요소**

사주는 네 개의 기둥(四柱)으로 구성됩니다:
- 년주(年柱): 조상과 부모의 영향
- 월주(月柱): 형제자매와 직업운
- 일주(日柱): 본인과 배우자의 관계
- 시주(時柱): 자녀와 말년운

**십간십지와 오행**

십간(甲乙丙丁戊己庚辛壬癸)과 십이지(子丑寅卯辰巳午未申酉戌亥)의 조합으로 60개의 간지가 만들어집니다. 각각은 오행(木火土金水)의 성질을 가지고 있어 서로 상생하거나 상극하는 관계를 형성합니다.

**실생활 활용법**

1. **직업 선택**: 일간(日干)의 성질을 파악하여 적성에 맞는 직업을 찾을 수 있습니다.
2. **인간관계**: 상대방과의 사주 합을 보아 궁합을 확인할 수 있습니다.
3. **시기 선택**: 대운과 세운을 분석하여 중요한 일을 추진할 최적의 시기를 정할 수 있습니다.

사주풀이는 단순한 운명론이 아닙니다. 개인의 성향과 잠재력을 이해하고, 더 나은 선택을 할 수 있도록 도와주는 지혜의 도구입니다.`,
        excerpt: "사주풀이의 기본 개념부터 실생활 활용법까지, 초보자도 쉽게 이해할 수 있도록 설명합니다.",
        imageUrl: null,
        category: "fortune",
        published: 1,
        createdAt: new Date(2024, 0, 10),
        updatedAt: new Date(2024, 0, 10)
      },
      {
        id: randomUUID(),
        title: "신년 운세 높이는 5가지 실천법",
        slug: "new-year-fortune-tips",
        content: `새해를 맞아 운세를 높이고 싶으신가요? 간단하지만 효과적인 5가지 방법을 소개해드립니다.

**1. 정화와 정리**
새해 첫 달에는 집안 곳곳을 깨끗이 정리하세요. 특히 현관과 침실은 더욱 신경써서 정리해야 합니다. 묵은 물건들을 정리하면 새로운 기운이 들어올 공간이 만들어집니다.

**2. 긍정적인 말과 생각**
말에는 강력한 힘이 있습니다. "올해는 좋은 일만 생길 것이다", "나는 행복하다"와 같은 긍정적인 말을 자주 하세요. 부정적인 말은 부정적인 현실을 만들어냅니다.

**3. 감사 일기 쓰기**
매일 밤 잠들기 전, 그날 감사했던 일 세 가지를 적어보세요. 작은 것이라도 좋습니다. 감사하는 마음은 더 많은 감사할 일들을 불러옵니다.

**4. 건강한 생활습관**
규칙적인 수면, 균형 잡힌 식사, 적절한 운동은 기본입니다. 몸이 건강해야 좋은 기운을 받아들일 수 있습니다.

**5. 베풀기와 나눔**
작은 것이라도 다른 사람을 위해 베풀어보세요. 봉사활동, 기부, 혹은 주변 사람들에게 작은 친절을 베푸는 것만으로도 좋은 운을 불러올 수 있습니다.

이러한 실천법들은 단순해 보이지만, 꾸준히 실천하면 분명히 좋은 변화를 경험하실 수 있을 것입니다.`,
        excerpt: "새해 운세를 높이고 좋은 기운을 불러올 수 있는 간단하지만 효과적인 실천법들을 소개합니다.",
        imageUrl: null,
        category: "tips",
        published: 1,
        createdAt: new Date(2024, 0, 1),
        updatedAt: new Date(2024, 0, 1)
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }
}

export const storage = new MemStorage();
