import Link from "next/link";
import { getPost } from "@/utils/actions";
import PostForm from "@/components/blog/PostForm";
import { notFound } from "next/navigation";

const EditPostPage = async ({ params }) => {
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
      
      <PostForm 
        postId={post.id}
        initialData={{
          title: post.title,
          content: post.content,
          author: post.author
        }}
        isEditing={true}
      />
    </div>
  );
};

export default EditPostPage;