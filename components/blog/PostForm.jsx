"use client";
import { createPost } from "@/utils/actions";
import { useFormStatus, useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const SubmitBtn = () => {
    const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary join-item"
      disabled={pending}
    >
      {pending ? "please wait..." : "create task"}
    </button>
  );
};

const initialState = {
  message: null,
};

const PostForm = () => {
    const [state, formAction] = useFormState(createPost, initialState);
    const router = useRouter();

    useEffect(() => {
    if (state.message === "error") {
      toast.error("글 작성 중 오류가 발생했습니다");
      return;
    }
    if (state.message) {
        toast.success("글이 성공적으로 작성되었습니다");
        router.push("/blog");
    }
  }, [state]);
    
  return (
    <form action={formAction}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="input input-bordered w-full"
          placeholder="제목을 입력하세요"
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
          className="textarea textarea-bordered w-full min-h-[300px]"
          placeholder="내용을 입력하세요"
        />
      </div>
      
      <SubmitBtn />
    </form>
  );
};

export default PostForm;