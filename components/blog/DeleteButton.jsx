"use client";

import { useState } from "react";
import { deletePost } from "@/utils/actions";
import { useFormStatus } from "react-dom";

const DeleteFormButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      className="btn btn-error btn-sm"
      disabled={pending}
    >
      {pending ? "삭제 중..." : "삭제"}
    </button>
  );
};

const DeleteButton = ({ postId }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="btn btn-outline btn-error btn-sm"
      >
        삭제
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-error">정말 삭제하시겠습니까?</span>
      <form action={deletePost}>
        <input type="hidden" name="id" value={postId} />
        <DeleteFormButton />
      </form>
      <button
        onClick={() => setShowConfirm(false)}
        className="btn btn-ghost btn-sm"
      >
        취소
      </button>
    </div>
  );
};

export default DeleteButton;