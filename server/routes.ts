import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import { analyzePalmImage } from "./palmAnalysis"; // 기존 analyzePalmImage 그대로 사용
import type { PagesFunction } from "@cloudflare/workers-types";

// R2 버킷 이름은 환경 변수로 설정했다고 가정
const R2_BUCKET = (globalThis as any).R2_BUCKET;

// --------------------
// Palm Reading
// --------------------
export const onRequestPostPalmReading: PagesFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('palmImage') as File;
    const language = formData.get('language')?.toString() || 'ko';
    const birthDate = formData.get('birthDate')?.toString();

    if (!file) {
      return new Response(JSON.stringify({ message: 'No image file provided' }), { status: 400 });
    }

    // R2 업로드
    const arrayBuffer = await file.arrayBuffer();
    await R2_BUCKET.put(`uploads/${file.name}`, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    const analysisResult = await analyzePalmImage(`uploads/${file.name}`, language, birthDate);

    // DB에 저장
    const palmReading = await storage.createPalmReading({
      imageUrl: `https://${R2_BUCKET.name}.r2.cloudflarestorage.com/uploads/${file.name}`,
      birthDate,
      ...analysisResult,
    });

    return new Response(JSON.stringify(palmReading), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Analysis failed. Please try again.' }), { status: 500 });
  }
};

// Get palm reading by ID
export const onRequestGetPalmReading: PagesFunction = async ({ params }) => {
  try {
    const reading = await storage.getPalmReading(params.id);
    if (!reading) {
      return new Response(JSON.stringify({ message: '손금 분석 결과를 찾을 수 없습니다.' }), { status: 404 });
    }
    return new Response(JSON.stringify(reading), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve reading' }), { status: 500 });
  }
};

// --------------------
// Blog Posts
// --------------------

// Get all blog posts
export const onRequestGetBlogPosts: PagesFunction = async () => {
  try {
    const posts = await storage.getBlogPosts();
    return new Response(JSON.stringify(posts), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve blog posts' }), { status: 500 });
  }
};

// Get blog post by slug
export const onRequestGetBlogPostBySlug: PagesFunction = async ({ params }) => {
  try {
    const post = await storage.getBlogPostBySlug(params.slug);
    if (!post) return new Response(JSON.stringify({ message: 'Blog post not found' }), { status: 404 });
    return new Response(JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve blog post' }), { status: 500 });
  }
};

// Create blog post
export const onRequestPostBlogPost: PagesFunction = async ({ request }) => {
  try {
    const data = await request.json();
    const validatedData = insertBlogPostSchema.parse(data);
    const post = await storage.createBlogPost(validatedData);
    return new Response(JSON.stringify(post), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to create blog post' }), { status: 500 });
  }
};

// Delete blog post
export const onRequestDeleteBlogPost: PagesFunction = async ({ params }) => {
  try {
    const success = await storage.deleteBlogPost(params.id);
    if (!success) return new Response(JSON.stringify({ message: 'Blog post not found' }), { status: 404 });
    return new Response(JSON.stringify({ message: 'Blog post deleted successfully' }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to delete blog post' }), { status: 500 });
  }
};
