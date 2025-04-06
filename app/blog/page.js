import Link from "next/link";
import { getAllPosts } from "@/utils/actions";
import { formatDistanceToNow } from "@/utils/date-formatter";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

function extractTextFromMarkdown(markdown) {
  // 이미지, 링크, 코드 블록, HTML 태그 등을 제거합니다
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 제거
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // 링크를 링크 텍스트로 변환
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/`([^`]+)`/g, "$1") // 인라인 코드 제거
    .replace(/<[^>]*>/g, "") // HTML 태그 제거
    .replace(/\*\*([^*]+)\*\*/g, "$1") // 볼드 마크다운 제거
    .replace(/\*([^*]+)\*/g, "$1") // 이탤릭 마크다운 제거
    .replace(/#{1,6}\s*(.*?)$/gm, "$1") // 헤딩 마크다운 제거
    .replace(/^\s*[-*+]\s+/gm, "") // 리스트 마크다운 제거
    .replace(/^\s*\d+\.\s+/gm, "") // 숫자 리스트 마크다운 제거
    .replace(/\n{2,}/g, " ") // 여러 줄바꿈을 공백으로 변환
    .trim();
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const user = await currentUser();

  const isAdmin =
    user?.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress === process.env.ADMIN_EMAIL;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">블로그</h1>

        {isAdmin ? (
          <Link href="/blog/new" className="btn btn-primary">
            새 글 작성
          </Link>
        ) : (
          <Link href="/sign-in" className="btn btn-outline btn-primary">
            관리자 로그인
          </Link>
        )}
      </div>

      {/* 글 목록 렌더링 */}
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">아직 게시글이 없습니다.</h2>
          <p className="mt-2 text-gray-600">첫 게시글을 작성해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => {
            const plainText = extractTextFromMarkdown(post.content);

            return (
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
                  {plainText.substring(0, 200)}
                  {plainText.length > 200 ? "..." : ""}
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
    </div>
  );
}
