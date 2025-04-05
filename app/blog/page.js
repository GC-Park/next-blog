// app/blog/page.js - 블로그 메인 페이지
import Link from "next/link";
import { getAllPosts } from "@/utils/actions";
import { formatDistanceToNow } from "@/utils/date-formatter";

export const dynamic = "force-dynamic";

const BlogPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">블로그</h1>
        <Link href="/blog/new" className="btn btn-primary">
          새 글 작성
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">아직 게시글이 없습니다.</h2>
          <p className="mt-2 text-gray-600">첫 게시글을 작성해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="border border-base-300 rounded-lg shadow-sm p-6"
            >
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-primary transition">
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.createdAt}>
                  {formatDistanceToNow(new Date(post.createdAt))}
                </time>
              </div>
              
              <p className="line-clamp-3 text-gray-600 mb-4">
                {post.content.substring(0, 200)}
                {post.content.length > 200 ? '...' : ''}
              </p>
              
              <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
                자세히 보기
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;