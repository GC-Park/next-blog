import Link from "next/link";
import { getAllPosts } from "@/utils/actions";
import { formatDistanceToNow } from "@/utils/date-formatter";

export const dynamic = "force-dynamic";

function extractTextFromMarkdown(markdown) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s*(.*?)$/gm, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .trim();
}

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-12 mb-10 bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">GC-PARK BLOG</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto px-4">
          박근철의 개발 이야기와 프로젝트 소개
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/blog" className="btn btn-accent">
            블로그 둘러보기
          </Link>
          <Link href="/tasks" className="btn btn-outline text-white hover:bg-white hover:text-blue-600">
            할 일 관리
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">최근 게시물</h2>
          <Link href="/blog" className="text-primary hover:underline">
            모든 글 보기
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-10 bg-base-200 rounded-lg">
            <h3 className="text-xl font-medium">아직 게시글이 없습니다.</h3>
            <p className="mt-2 text-gray-600">블로그에 첫 게시글을 작성해보세요!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {recentPosts.map((post) => {
              const plainText = extractTextFromMarkdown(post.content);

              return (
                <article
                  key={post.id}
                  className="border border-base-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition">
                      {post.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.createdAt}>
                      {formatDistanceToNow(new Date(post.createdAt))}
                    </time>
                  </div>

                  <p className="line-clamp-2 text-gray-600 mb-3">
                    {plainText.substring(0, 150)}
                    {plainText.length > 150 ? "..." : ""}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:underline"
                  >
                    자세히 보기
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">블로그 소개</h2>
          <p className="mb-4">
            이 블로그는 개발 과정에서 배운 내용, 프로젝트 경험, 그리고 기술 관련 생각들을 공유하는 공간입니다.
            Next.js, React, 그리고 다양한 웹 기술에 관한 글을 작성하고 있습니다.
          </p>
          <Link href="/blog" className="btn btn-sm btn-primary">
            블로그 방문하기
          </Link>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">할 일 관리 앱</h2>
          <p className="mb-4">
            이 웹사이트에는 할 일 관리 기능이 포함되어 있습니다. 달력 인터페이스를 통해 날짜별로 할 일을 관리하고 완료 상태를 추적할 수 있습니다.
          </p>
          <Link href="/tasks" className="btn btn-sm btn-primary">
            할 일 관리 시작하기
          </Link>
        </div>
      </section>

      <section className="bg-base-200 rounded-lg p-8 text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">더 궁금한 점이 있으신가요?</h2>
        <p className="mb-6 max-w-lg mx-auto">
          블로그 내용에 관한 질문이나 협업 제안, 또는 그냥 인사를 나누고 싶으시다면 언제든지 연락주세요.
        </p>
        <Link href="/contact" className="btn btn-accent">
          연락하기
        </Link>
      </section>
    </div>
  );
}