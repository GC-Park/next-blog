"use client";
import { createPost } from "@/utils/actions";
import { useFormStatus, useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MarkdownRenderer from "./MarkdownRenderer";

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
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (formData) => {
    formData.set("content", content);
    return formAction(formData);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

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
    <form action={handleSubmit}>
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

      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="content" className="block text-sm font-medium">
            내용 (마크다운 지원)
          </label>
          <button
            type="button"
            className="btn btn-xs btn-ghost"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "미리보기 숨기기" : "미리보기 표시"}
          </button>
        </div>

        <div
          className={`${
            showPreview ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "block"
          }`}
        >
          {/* 편집 영역 */}
          <div className={`${showPreview ? "h-96" : "h-96"}`}>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="textarea textarea-bordered w-full h-full font-mono"
              placeholder="마크다운 형식으로 내용을 작성하세요..."
            />
          </div>

          {/* 미리보기 영역 */}
          {showPreview && (
            <div className="border border-base-300 rounded-lg p-4 bg-white h-96 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                미리보기
              </h3>
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-gray-400 italic">
                  내용을 입력하면 미리보기가 표시됩니다
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 마크다운 도움말 */}
      <div className="mb-6 p-4 bg-base-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">마크다운 문법 도움말</h3>
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            더 자세한 가이드
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="font-bold"># 제목</span> - 제목 (H1)
          </div>
          <div>
            <span className="font-bold">## 부제목</span> - 부제목 (H2)
          </div>
          <div>
            <span className="font-bold">**굵게**</span> - <strong>굵게</strong>
          </div>
          <div>
            <span className="font-bold">*기울임*</span> - <em>기울임</em>
          </div>
          <div>
            <span className="font-bold">![alt](이미지URL)</span> - 이미지
          </div>
          <div>
            <span className="font-bold">- 항목</span> - 불렛 리스트
          </div>
          <div>
            <span className="font-bold">1. 항목</span> - 숫자 리스트
          </div>
          <div>
            <span className="font-bold">```코드```</span> - 코드 블록
          </div>
          <div>
            <span className="font-bold"> 인용문</span> - 인용문
          </div>
          <div>
            <span className="font-bold">--- </span> - 구분선
          </div>
          <div>
            <span className="font-bold">`인라인 코드`</span> -{" "}
            <code>인라인 코드</code>
          </div>
        </div>
      </div>

      <SubmitBtn />
    </form>
  );
};

export default PostForm;
