"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createComment } from "@/utils/actions";
import toast from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "댓글 작성 중..." : "댓글 작성"}
    </button>
  );
};

const initialState = {
  message: null,
};

const CommentForm = ({ postId }) => {
  const [state, formAction] = useFormState(createComment, initialState);
  const formRef = useRef(null);
  const [content, setContent] = useState("");

  const handleSubmit = (formData) => {
    if (content.trim().length < 2) {
      toast.error("댓글은 최소 2글자 이상이어야 합니다");
      return;
    }
    return formAction(formData);
  };

  useEffect(() => {
    if (state.message === "success") {
      toast.success("댓글이 작성되었습니다");
      setContent("");
      if (formRef.current) {
        formRef.current.reset();
      }
    } else if (state.message === "error") {
      toast.error(state.error || "댓글 작성 중 오류가 발생했습니다");
    } else if (state.message === "unauthenticated") {
      toast.error("로그인이 필요합니다");
    }
  }, [state]);

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />

      <div>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 작성해주세요..."
          className="textarea textarea-bordered w-full h-24"
          required
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
};

export default CommentForm;
