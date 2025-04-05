"use client";

import { updatePost } from "@/utils/actions";
import { useFormStatus, useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary join-item"
      disabled={pending}
    >
      {pending ? "수정 중..." : "수정하기"}
    </button>
  );
};

const initialState = {
  message: null,
};

const EditPostForm = ({ postId, initialData }) => {
  const [state, formAction] = useFormState(updatePost, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message === "error") {
      toast.error("글 수정 중 오류가 발생했습니다");
      return;
    }
    if (state.message === "success") {
      toast.success("글이 성공적으로 수정되었습니다");
      router.push(`/blog/${postId}`);
    }
  }, [state, router, postId]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={postId} />

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData.title}
          className="input input-bordered w-full"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium mb-1">
          작성자
        </label>
        <input
          type="text"
          id="author"
          name="author"
          defaultValue={initialData.author}
          className="input input-bordered w-full"
          placeholder="작성자 이름을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={initialData.content}
          className="textarea textarea-bordered w-full min-h-[300px]"
          placeholder="내용을 입력하세요"
          required
        />
      </div>

      <div className="flex gap-2">
        <SubmitBtn postId={postId} />
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => router.push(`/blog/${postId}`)}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
