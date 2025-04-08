"use client";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { SignInButton, useAuth } from "@clerk/nextjs";

const CommentSection = ({ comments, postId }) => {
  const { isSignedIn } = useAuth();

  return (
    <div className="my-10 bg-white border border-base-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          댓글{" "}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({comments.length})
          </span>
        </h2>

        <div className="mb-8">
          <CommentList comments={comments} postId={postId} />
        </div>

        <div className="border-t border-base-200 pt-6">
          {isSignedIn ? (
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">
                댓글 작성
              </h3>
              <CommentForm postId={postId} />
            </div>
          ) : (
            <div className="bg-base-200 p-4 rounded-lg text-center">
              <p className="mb-3 text-gray-700">
                댓글을 작성하려면 로그인이 필요합니다.
              </p>
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-sm">로그인하기</button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
