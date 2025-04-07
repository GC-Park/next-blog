"use client";

import { createTaskCustom } from "@/utils/actions";
import { useRef, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import toast from "react-hot-toast";

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

  useEffect(() => {
    if (state.message === "error") {
      toast.error("there was an error");
      return;
    }
    if (state.message) {
      toast.success("task created....");
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state]);

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
