import Link from "next/link";
import { getPost } from "@/utils/actions";
import { formatDistanceToNow } from "@/utils/date-formatter";
import DeleteButton from "@/components/blog/DeleteButton";
import { currentUser } from "@clerk/nextjs/server";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

export const dynamic = "force-dynamic";

const PostPage = async ({ params }) => {
  const post = await getPost(params.id);
  const user = await currentUser();

  const isAdmin =
    user?.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress === process.env.ADMIN_EMAIL;

  if (!post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">게시글을 찾을 수 없습니다</h2>
        <Link href="/blog" className="btn btn-accent mt-4">
          블로그로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="btn btn-ghost">
          ← 블로그로 돌아가기
        </Link>
      </div>

      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {formatDistanceToNow(new Date(post.createdAt))}
          </time>
          {post.updatedAt > post.createdAt && (
            <>
              <span>•</span>
              <span className="italic">
                수정됨: {formatDistanceToNow(new Date(post.updatedAt))}
              </span>
            </>
          )}
        </div>

        <div className="bg-white border border-base-200 rounded-lg p-6 shadow-sm mb-8">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="flex gap-2 mt-8">
          {isAdmin ? (
            <>
              <Link
                href={`/blog/${post.id}/edit`}
                className="btn btn-outline btn-sm"
              >
                수정
              </Link>
              <DeleteButton postId={post.id} />
            </>
          ) : null}
        </div>
      </article>
    </div>
  );
};

export default PostPage;
