"use client";

import { useState, useEffect } from "react";
import { deletePost } from "@/utils/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteButton = ({ postId }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (deleteStatus === "success") {
      toast.success("글이 성공적으로 삭제되었습니다");
      router.push("/blog");
    }

    if (deleteStatus === "unauthorized") {
      toast.error("삭제 권한이 없습니다");
    }

    if (deleteStatus === "error") {
      toast.error("글 삭제 중 오류가 발생했습니다");
    }
  }, [deleteStatus, router]);

  const handleDelete = async () => {
    setDeleteStatus(null);

    const formData = new FormData();
    formData.append("id", postId);

    const result = await deletePost(formData);

    if (result.message === "success") {
      setDeleteStatus("success");
    } else if (result.message === "unauthorized") {
      setDeleteStatus("unauthorized");
    } else {
      setDeleteStatus("error");
    }
  };

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
      <button
        onClick={handleDelete}
        className="btn btn-error btn-sm"
        disabled={deleteStatus === "pending"}
      >
        삭제
      </button>
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
