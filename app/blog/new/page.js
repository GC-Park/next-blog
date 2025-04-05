// app/blog/new/page.js - 새 게시글 작성 페이지
import Link from "next/link";
import PostForm from "@/components/blog/PostForm";

const NewPostPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="btn btn-ghost">
          ← 돌아가기
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>
      
      <PostForm />
    </div>
  );
};

export default NewPostPage;