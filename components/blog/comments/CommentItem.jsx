"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "@/utils/date-formatter";
import { useFormState } from "react-dom";
import { updateComment, deleteComment } from "@/utils/actions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const initialState = {
  message: null,
};

const CommentItem = ({ comment, postId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateState, updateAction] = useFormState(updateComment, initialState);
  const { userId } = useAuth();
  const textareaRef = useRef(null);

  const isAuthor = userId === comment.authorId;
  const createdAt = new Date(comment.createdAt);
  const updatedAt = new Date(comment.updatedAt);
  const wasEdited = updatedAt > createdAt;

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();

      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  useEffect(() => {
    if (updateState.message === "success") {
      toast.success("댓글이 수정되었습니다");
      setIsEditing(false);
    } else if (
      updateState.message === "error" ||
      updateState.message === "unauthorized"
    ) {
      toast.error(updateState.error || "댓글 수정 중 오류가 발생했습니다");
    }
  }, [updateState]);

  const handleSubmit = (formData) => {
    if (content.trim().length < 2) {
      toast.error("댓글은 최소 2글자 이상이어야 합니다");
      return;
    }
    formData.set("content", content);
    return updateAction(formData);
  };

  const handleDeleteComment = async () => {
    const formData = new FormData();
    formData.append("id", comment.id);
    formData.append("postId", postId);

    const result = await deleteComment(formData);

    if (result.message === "success") {
      toast.success("댓글이 삭제되었습니다");
    } else if (
      result.message === "error" ||
      result.message === "unauthorized"
    ) {
      toast.error(result.error || "댓글 삭제 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="border-b border-base-300 py-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-medium">{comment.authorName}</span>
          <span className="text-sm text-gray-500 ml-2">
            {formatDistanceToNow(createdAt)}
            {wasEdited && <span className="ml-1 italic">(수정됨)</span>}
          </span>
        </div>

        {isAuthor && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-ghost btn-xs"
            >
              수정
            </button>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-ghost btn-xs text-error"
              >
                삭제
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={handleDeleteComment}
                  className="btn btn-error btn-xs"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-ghost btn-xs"
                >
                  취소
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={comment.id} />
          <input type="hidden" name="postId" value={postId} />

          <textarea
            ref={textareaRef}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full mb-2"
            rows={3}
          />

          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-primary btn-sm">
              저장
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setContent(comment.content);
              }}
              className="btn btn-ghost btn-sm"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
      )}
    </div>
  );
};

export default CommentItem;
