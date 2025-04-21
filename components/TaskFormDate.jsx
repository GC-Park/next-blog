"use client";

import { createTaskCustom } from "@/utils/actions";
import { useRef, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn join-item btn-primary"
      disabled={pending}
    >
      {pending ? "추가 중..." : "추가"}
    </button>
  );
};

const initialState = {
  message: null,
};

const TaskFormDate = ({ selectedDate }) => {
  const formRef = useRef(null);
  const [state, formAction] = useFormState(createTaskCustom, initialState);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (state.message === "error") {
      toast.error("there was an error");
      return;
    }
    if (state.message === "unauthorized") {
      toast.error("관리자 권한이 필요합니다");
      return;
    }
    if (state.message) {
      toast.success("task created....");
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state]);

    if (!isLoaded) {
    return <div className="loading loading-spinner loading-md" />;
  }

  if (!isSignedIn) {
    return (
      <div className="alert alert-info">
        <div>
          <span>할 일을 추가하려면 관리자로 로그인해주세요.</span>
          <Link href="/sign-in" className="btn btn-sm btn-primary ml-2">
            로그인
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="date" value={selectedDate} />
      <div className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder="할 일을 입력하세요"
          type="text"
          name="content"
          required
        />
        <SubmitButton />
      </div>
    </form>
  );
};

export default TaskFormDate;
