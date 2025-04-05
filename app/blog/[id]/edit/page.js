import Link from "next/link";
import { getPost } from "@/utils/actions";
import EditPostForm from "@/components/blog/EditPostForm";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const EditPostPage = async ({ params }) => {
  const user = await currentUser();

  const isAdmin =
    user?.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/blog");
  }

  const post = await getPost(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href={`/blog/${post.id}`} className="btn btn-ghost">
          ← 글로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">게시글 수정</h1>

      <EditPostForm
        postId={post.id}
        initialData={{
          title: post.title,
          content: post.content,
          author: post.author,
        }}
      />
    </div>
  );
};

export default EditPostPage;
