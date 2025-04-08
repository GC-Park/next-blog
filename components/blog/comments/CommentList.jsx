"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { SignInButton, useAuth } from "@clerk/nextjs";

const CommentList = ({ comments, postId }) => {
  const [sortedComments, setSortedComments] = useState([]);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const sorted = [...comments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedComments(sorted);
  }, [comments]);

  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>

        {!isSignedIn && (
          <div className="mt-4">
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-sm">
                로그인하고 댓글 작성하기
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sortedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
